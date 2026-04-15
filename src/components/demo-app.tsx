"use client";

import type { FormEvent } from "react";
import { startTransition, useDeferredValue, useState } from "react";
import Link from "next/link";

import {
  AlertItem,
  EmailStepCard,
  StatCard
} from "@/components/dashboard-primitives";
import { EMPTY_LEAD_FORM, FIELD_OPTIONS, SALES_REP } from "@/lib/config";
import { cn, formatDateTime } from "@/lib/format";
import { DashboardSnapshot, Lead, LeadInput, LeadTemperature } from "@/lib/types";

type FormField = keyof LeadInput;
type TemperatureFilter = "All" | LeadTemperature;

async function readJson<T>(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  const body = (await response.json()) as unknown;

  if (
    !response.ok &&
    typeof body === "object" &&
    body !== null &&
    "error" in body &&
    typeof body.error === "string"
  ) {
    throw new Error(body.error);
  }

  return body as T;
}
function LeadRow({
  lead,
  selected,
  onSelect
}: {
  lead: Lead;
  selected: boolean;
  onSelect: (leadId: string) => void;
}) {
  return (
    <button
      type="button"
      className={cn("lead-row", selected && "lead-row-active")}
      onClick={() => onSelect(lead.id)}
    >
      <div className="stack-row lead-row-top">
        <div>
          <strong>
            {lead.first_name} {lead.last_name}
          </strong>
          <p>
            {lead.vehicle_interest} | {lead.inquiry_type}
          </p>
        </div>
        <span className={cn("badge", `temperature-${lead.temperature.toLowerCase()}`)}>
          {lead.temperature}
        </span>
      </div>
      <div className="stack-row">
        <span className="meta">{lead.status}</span>
        <span className="meta">Score {lead.score}</span>
      </div>
    </button>
  );
}

export function DemoApp({ initialDashboard }: { initialDashboard: DashboardSnapshot }) {
  const [dashboard, setDashboard] = useState(initialDashboard);
  const [selectedLeadId, setSelectedLeadId] = useState(initialDashboard.leads[0]?.id ?? null);
  const [form, setForm] = useState<LeadInput>(EMPTY_LEAD_FORM);
  const [search, setSearch] = useState("");
  const [temperatureFilter, setTemperatureFilter] = useState<TemperatureFilter>("All");
  const [busyAction, setBusyAction] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const deferredSearch = useDeferredValue(search);
  const selectedLead =
    dashboard.leads.find((lead) => lead.id === selectedLeadId) ?? dashboard.leads[0] ?? null;

  const filteredLeads = dashboard.leads.filter((lead) => {
    const matchesSearch =
      !deferredSearch ||
      `${lead.first_name} ${lead.last_name} ${lead.vehicle_interest} ${lead.inquiry_type}`
        .toLowerCase()
        .includes(deferredSearch.toLowerCase());

    const matchesTemperature =
      temperatureFilter === "All" || lead.temperature === temperatureFilter;

    return matchesSearch && matchesTemperature;
  });

  async function refreshDashboard(preferredLeadId?: string) {
    const snapshot = await readJson<DashboardSnapshot>("/api/leads", {
      cache: "no-store"
    });

    startTransition(() => {
      setDashboard(snapshot);
      setSelectedLeadId((current) => {
        const target = preferredLeadId ?? current;
        return snapshot.leads.some((lead) => lead.id === target)
          ? target ?? snapshot.leads[0]?.id ?? null
          : snapshot.leads[0]?.id ?? null;
      });
    });
  }

  async function runAction(actionKey: string, action: () => Promise<void>) {
    setBusyAction(actionKey);
    setError(null);

    try {
      await action();
    } catch (actionError) {
      setError(actionError instanceof Error ? actionError.message : "Something went wrong.");
    } finally {
      setBusyAction(null);
    }
  }

  function updateForm(field: FormField, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value
    }));
  }

  async function handleLeadSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await runAction("create", async () => {
      const payload = await readJson<{ lead: Lead }>("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      setMessage(`The lead for ${payload.lead.first_name} ${payload.lead.last_name} has been created.`);
      setForm(EMPTY_LEAD_FORM);
      await refreshDashboard(payload.lead.id);
    });
  }

  async function handleAdvanceLead(leadId: string) {
    await runAction(`advance-${leadId}`, async () => {
      await readJson<{ ok: true }>(`/api/leads/${leadId}/advance`, {
        method: "POST"
      });

      setMessage("The automation has been advanced to the next demo step.");
      await refreshDashboard(leadId);
    });
  }

  async function handleReplyLead(leadId: string) {
    await runAction(`reply-${leadId}`, async () => {
      await readJson<{ ok: true }>(`/api/leads/${leadId}/reply`, {
        method: "POST"
      });

      setMessage("The lead has been marked as replied and the automation has stopped.");
      await refreshDashboard(leadId);
    });
  }

  async function handleReset() {
    await runAction("reset", async () => {
      await readJson<{ ok: true }>("/api/demo/reset", {
        method: "POST"
      });

      setMessage("The demo data has been restored.");
      await refreshDashboard();
    });
  }

  return (
    <main className="page-shell">
      <section className="hero-panel">
        <div>
          <span className="eyebrow">CRM walkthrough</span>
          <h1>A mobile-ready Porsche lead tracker tailored to your workflow.</h1>
          <p className="hero-copy">
            This live page is where the pitch becomes tangible: your new Porsche Centre Trinidad
            inquiries can be captured, scored, tagged, nurtured, and escalated for your personal
            follow-up without implying any live dealership or Porsche system access.
          </p>
          <div className="hero-meta">
            <span>{SALES_REP.sales_rep_name}</span>
            <span>Porsche Brand Ambassador</span>
            <span>{SALES_REP.dealership_name}</span>
            <span>{SALES_REP.location}</span>
          </div>
          <div className="action-row">
            <Link href="/" className="ghost-button">
              Back to the Overview
            </Link>
            <Link href="/automation" className="ghost-button">
              Open the Automation View
            </Link>
          </div>
        </div>
        <div className="hero-actions">
          <button
            type="button"
            className="ghost-button"
            onClick={handleReset}
            disabled={busyAction === "reset"}
          >
            {busyAction === "reset" ? "Resetting..." : "Restore Demo Seeds"}
          </button>
          <div className="hero-note">
            <span className="eyebrow">Walkthrough</span>
            <p>
              On mobile or desktop, you can advance a lead, mark a reply, or add a fresh inquiry to
              show how your system handles premium follow-up from capture through manual handoff.
            </p>
          </div>
        </div>
      </section>

      {message ? <div className="flash-banner flash-success">{message}</div> : null}
      {error ? <div className="flash-banner flash-error">{error}</div> : null}

      <section className="stats-grid">
        {dashboard.stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>

      <section className="top-grid">
        <article className="panel">
          <div className="panel-header">
            <div>
              <span className="eyebrow">Lead Intake</span>
              <h2>Create a fresh inquiry.</h2>
            </div>
            <p className="panel-copy">
              Required fields are validated and normalized before the automation sequence begins.
            </p>
          </div>

          <form className="lead-form" onSubmit={handleLeadSubmit}>
            <div className="form-grid">
              <label>
                First name
                <input
                  value={form.first_name}
                  onChange={(event) => updateForm("first_name", event.target.value)}
                />
              </label>
              <label>
                Last name
                <input
                  value={form.last_name}
                  onChange={(event) => updateForm("last_name", event.target.value)}
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => updateForm("email", event.target.value)}
                />
              </label>
              <label>
                Phone
                <input
                  value={form.phone}
                  onChange={(event) => updateForm("phone", event.target.value)}
                />
              </label>
              {(
                [
                  "vehicle_interest",
                  "inquiry_type",
                  "preferred_contact_method",
                  "timeline_to_purchase",
                  "budget_range",
                  "trade_in_interest",
                  "test_drive_interest",
                  "lead_source"
                ] as const
              ).map((field) => (
                <label key={field}>
                  {field.replaceAll("_", " ")}
                  <select
                    value={form[field]}
                    onChange={(event) => updateForm(field, event.target.value)}
                  >
                    {FIELD_OPTIONS[field].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              ))}
            </div>
            <label>
              Notes
              <textarea
                rows={4}
                value={form.notes}
                onChange={(event) => updateForm("notes", event.target.value)}
              />
            </label>
            <button type="submit" className="primary-button" disabled={busyAction === "create"}>
              {busyAction === "create"
                ? "Creating lead..."
                : "Create the Lead and Trigger Email 1"}
            </button>
          </form>
        </article>

        <article className="panel">
          <div className="panel-header">
            <div>
              <span className="eyebrow">Rep Alerts</span>
              <h2>In-app notification surface.</h2>
            </div>
            <p className="panel-copy">
              Hot leads, financing questions, test-drive intent, and replies stay visible inside
              the dashboard.
            </p>
          </div>
          <div className="alert-list">
            {dashboard.alerts.map((alert) => (
              <AlertItem key={alert.id} {...alert} />
            ))}
          </div>
        </article>
      </section>

      <section className="bottom-grid">
        <article className="panel">
          <div className="panel-header">
            <div>
              <span className="eyebrow">Lead Tracker</span>
              <h2>Filterable CRM view.</h2>
            </div>
          </div>

          <div className="toolbar">
            <input
              placeholder="Search leads, model, or inquiry"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <div className="pill-group">
              {(["All", "Hot", "Warm", "Cold"] as TemperatureFilter[]).map((option) => (
                <button
                  key={option}
                  type="button"
                  className={cn("pill", option === temperatureFilter && "pill-active")}
                  onClick={() => setTemperatureFilter(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="lead-list">
            {filteredLeads.map((lead) => (
              <LeadRow
                key={lead.id}
                lead={lead}
                selected={lead.id === selectedLead?.id}
                onSelect={(leadId) => setSelectedLeadId(leadId)}
              />
            ))}
          </div>

          <div className="vehicle-breakdown">
            <span className="eyebrow">Vehicle interest mix</span>
            {dashboard.vehicles.map((item) => (
              <div key={item.vehicle} className="vehicle-bar">
                <div className="stack-row">
                  <span>{item.vehicle}</span>
                  <span>{item.count}</span>
                </div>
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{ width: `${(item.count / Math.max(dashboard.leads.length, 1)) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="panel detail-panel">
          {selectedLead ? (
            <>
              <div className="panel-header">
                <div>
                  <span className="eyebrow">Lead Detail</span>
                  <h2>
                    {selectedLead.first_name} {selectedLead.last_name}
                  </h2>
                </div>
                <div className="stack-row">
                  <span className={cn("badge", `temperature-${selectedLead.temperature.toLowerCase()}`)}>
                    {selectedLead.temperature}
                  </span>
                  <span className="badge badge-outline">{selectedLead.status}</span>
                </div>
              </div>

              <div className="detail-grid">
                <div className="detail-card">
                  <span className="eyebrow">Profile</span>
                  <p>{selectedLead.vehicle_interest}</p>
                  <p>{selectedLead.inquiry_type}</p>
                  <p>{selectedLead.email}</p>
                  <p>{selectedLead.phone}</p>
                </div>
                <div className="detail-card">
                  <span className="eyebrow">Automation</span>
                  <p>Score: {selectedLead.score}/100</p>
                  <p>Last email: {selectedLead.last_email_sent ?? "None"}</p>
                  <p>Next step: {formatDateTime(selectedLead.next_email_at)}</p>
                  <p>Reply status: {selectedLead.reply_status}</p>
                </div>
              </div>

              <div className="tag-list">
                {selectedLead.tags.map((tag) => (
                  <span key={tag} className="badge badge-outline">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="action-row">
                <button
                  type="button"
                  className="primary-button"
                  onClick={() => handleAdvanceLead(selectedLead.id)}
                  disabled={
                    busyAction === `advance-${selectedLead.id}` ||
                    selectedLead.automation_state !== "active"
                  }
                >
                  {busyAction === `advance-${selectedLead.id}`
                    ? "Advancing..."
                    : "Advance Timeline"}
                </button>
                <button
                  type="button"
                  className="ghost-button"
                  onClick={() => handleReplyLead(selectedLead.id)}
                  disabled={
                    busyAction === `reply-${selectedLead.id}` ||
                    selectedLead.reply_status === "Responded"
                  }
                >
                  {busyAction === `reply-${selectedLead.id}`
                    ? "Stopping automation..."
                    : "Mark as Replied"}
                </button>
              </div>

              <div className="timeline-grid">
                {selectedLead.email_steps.map((step) => (
                  <EmailStepCard key={step.key} step={step} />
                ))}
              </div>

              <div className="activity-section">
                <div className="panel-header">
                  <div>
                    <span className="eyebrow">Recent Activity</span>
                    <h3>Lead timeline.</h3>
                  </div>
                </div>
                <div className="activity-list">
                  {selectedLead.activity_log.slice(0, 8).map((event) => (
                    <article key={event.id} className="activity-item">
                      <div className="stack-row">
                        <strong>{event.message}</strong>
                        <span className="meta">{formatDateTime(event.timestamp)}</span>
                      </div>
                      <span className="meta">{event.kind.replaceAll("_", " ")}</span>
                    </article>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="empty-state">
              <span className="eyebrow">No lead selected</span>
              <p>Create or restore demo data to begin the walkthrough.</p>
            </div>
          )}
        </article>
      </section>
    </main>
  );
}
