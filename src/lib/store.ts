import { promises as fs } from "fs";
import path from "path";

import {
  advanceLeadTimeline,
  alertsForLeadCreation,
  alertsForReply,
  createLeadRecord,
  createSeedStore,
  markLeadReplied,
  normalizeLeadInput,
  validateLeadInput
} from "@/lib/lead-engine";
import { DashboardSnapshot, LeadInput, StoreData } from "@/lib/types";

const STORE_PATH = path.join(process.cwd(), "data", "store.json");

async function ensureStoreDirectory() {
  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
}

async function readStoreFile() {
  await ensureStoreDirectory();

  try {
    return await fs.readFile(STORE_PATH, "utf8");
  } catch {
    return "";
  }
}

async function writeStore(data: StoreData) {
  await ensureStoreDirectory();
  await fs.writeFile(STORE_PATH, JSON.stringify(data, null, 2), "utf8");
}

async function ensureSeededStore() {
  const raw = await readStoreFile();

  if (!raw.trim()) {
    const seeded = createSeedStore();
    await writeStore(seeded);
    return seeded;
  }

  try {
    const parsed = JSON.parse(raw) as StoreData;

    if (!Array.isArray(parsed.leads) || !Array.isArray(parsed.alerts) || parsed.leads.length === 0) {
      const seeded = createSeedStore();
      await writeStore(seeded);
      return seeded;
    }

    return parsed;
  } catch {
    const seeded = createSeedStore();
    await writeStore(seeded);
    return seeded;
  }
}

async function updateStore(mutator: (data: StoreData) => StoreData | Promise<StoreData>) {
  const current = await ensureSeededStore();
  const updated = await mutator(current);
  await writeStore(updated);
  return updated;
}

function buildDashboard(data: StoreData): DashboardSnapshot {
  const vehicleMap = new Map<string, number>();

  for (const lead of data.leads) {
    vehicleMap.set(lead.vehicle_interest, (vehicleMap.get(lead.vehicle_interest) ?? 0) + 1);
  }

  return {
    leads: [...data.leads].sort((a, b) => b.updated_at.localeCompare(a.updated_at)),
    alerts: [...data.alerts]
      .filter((alert) => !alert.resolved)
      .sort((a, b) => b.created_at.localeCompare(a.created_at))
      .slice(0, 8),
    stats: [
      { label: "Total Leads", value: data.leads.length, accent: "silver" },
      {
        label: "New Leads",
        value: data.leads.filter((lead) => lead.status === "New Lead").length,
        accent: "gold"
      },
      {
        label: "Hot Leads",
        value: data.leads.filter((lead) => lead.temperature === "Hot").length,
        accent: "crimson"
      },
      {
        label: "Pending Follow-Ups",
        value: data.leads.filter((lead) => lead.automation_state === "active").length,
        accent: "slate"
      },
      {
        label: "Responded",
        value: data.leads.filter((lead) => lead.reply_status === "Responded").length,
        accent: "gold"
      }
    ],
    vehicles: Array.from(vehicleMap.entries())
      .map(([vehicle, count]) => ({ vehicle, count }))
      .sort((a, b) => b.count - a.count),
    recent_activity: data.leads
      .flatMap((lead) => lead.activity_log)
      .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
      .slice(0, 8)
  };
}

export async function getDashboardSnapshot() {
  const store = await ensureSeededStore();
  return buildDashboard(store);
}

export async function createLead(input: LeadInput) {
  const normalized = normalizeLeadInput(input);
  const validation = validateLeadInput(normalized);

  if (!validation.valid) {
    throw new Error(validation.errors.join(" "));
  }

  const createdLead = createLeadRecord(normalized);

  await updateStore((data) => ({
    leads: [createdLead, ...data.leads],
    alerts: [...alertsForLeadCreation(createdLead), ...data.alerts]
  }));

  return createdLead;
}

export async function advanceLead(id: string) {
  let changed = false;

  await updateStore((data) => {
    const leads = data.leads.map((lead) => {
      if (lead.id !== id) {
        return lead;
      }

      changed = true;
      return advanceLeadTimeline(lead);
    });

    return { ...data, leads };
  });

  if (!changed) {
    throw new Error("Lead not found.");
  }
}

export async function markLeadAsReplied(id: string) {
  let replyLeadId = "";
  let replyLeadUpdatedAt = "";
  let replyLeadName = "";
  let alerts = [] as StoreData["alerts"];

  await updateStore((data) => {
    const leads = data.leads.map((lead) => {
      if (lead.id !== id) {
        return lead;
      }

      const repliedLead = markLeadReplied(lead);
      replyLeadId = repliedLead.id;
      replyLeadUpdatedAt = repliedLead.updated_at;
      replyLeadName = repliedLead.first_name;
      alerts = alertsForReply(repliedLead, repliedLead.updated_at);
      return repliedLead;
    });

    return {
      leads,
      alerts: [...alerts, ...data.alerts]
    };
  });

  if (!replyLeadId || !replyLeadUpdatedAt || !replyLeadName) {
    throw new Error("Lead not found.");
  }
}

export async function resetDemoStore() {
  const seeded = createSeedStore();
  await writeStore(seeded);
}
