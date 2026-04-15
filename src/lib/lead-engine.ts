import { randomUUID } from "crypto";

import { EMAIL_SEQUENCE, FIELD_OPTIONS, SALES_REP } from "@/lib/config";
import {
  Alert,
  AlertSeverity,
  EmailStep,
  Lead,
  LeadInput,
  LeadStatus,
  LeadTemperature
} from "@/lib/types";

const MODEL_TAGS: Record<string, string> = {
  "Porsche Macan": "Macan Interest",
  "Porsche Cayenne": "Cayenne Interest",
  "Porsche 911 Carrera S": "911 Interest",
  "Porsche 718 Cayman": "718 Interest",
  "Porsche Taycan": "Taycan Interest"
};

function buildLookup(values: string[]) {
  return new Map(values.map((value) => [normalize(value), value]));
}

const LOOKUPS = {
  vehicle_interest: buildLookup(FIELD_OPTIONS.vehicle_interest),
  inquiry_type: buildLookup(FIELD_OPTIONS.inquiry_type),
  preferred_contact_method: buildLookup(FIELD_OPTIONS.preferred_contact_method),
  timeline_to_purchase: buildLookup(FIELD_OPTIONS.timeline_to_purchase),
  budget_range: buildLookup(FIELD_OPTIONS.budget_range),
  trade_in_interest: buildLookup(FIELD_OPTIONS.trade_in_interest),
  test_drive_interest: buildLookup(FIELD_OPTIONS.test_drive_interest),
  lead_source: buildLookup(FIELD_OPTIONS.lead_source)
};

function normalize(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function buildEvent(leadId: string, kind: Lead["activity_log"][number]["kind"], message: string, timestamp: string) {
  return {
    id: randomUUID(),
    lead_id: leadId,
    kind,
    message,
    timestamp
  };
}

function buildAlert(
  leadId: string,
  severity: AlertSeverity,
  title: string,
  message: string,
  createdAt: string
): Alert {
  return {
    id: randomUUID(),
    lead_id: leadId,
    severity,
    title,
    message,
    created_at: createdAt,
    resolved: false
  };
}

function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60_000).toISOString();
}

function personalize(template: string, lead: LeadInput) {
  return template
    .replaceAll("{{first_name}}", lead.first_name)
    .replaceAll("{{last_name}}", lead.last_name)
    .replaceAll("{{vehicle_interest}}", lead.vehicle_interest)
    .replaceAll("{{inquiry_type}}", lead.inquiry_type)
    .replaceAll("{{timeline_to_purchase}}", lead.timeline_to_purchase)
    .replaceAll("{{sales_rep_name}}", SALES_REP.sales_rep_name)
    .replaceAll("{{dealership_name}}", SALES_REP.dealership_name)
    .replaceAll("{{phone_number}}", SALES_REP.phone_number)
    .replaceAll("{{email}}", SALES_REP.email)
    .replaceAll("{{location}}", SALES_REP.location);
}

function branchSentence(lead: LeadInput) {
  if (lead.inquiry_type === "book a test drive" || lead.test_drive_interest === "yes") {
    return "If a test drive is the next step, simply reply with your preferred day and time and I will coordinate it personally.";
  }

  if (lead.inquiry_type === "financing inquiry") {
    return "If useful, I can also walk you through financing options in a clear and direct way.";
  }

  if (lead.inquiry_type === "trade-in inquiry" || lead.trade_in_interest === "yes") {
    return "If you are considering a trade-in, feel free to share your current vehicle details and I can help guide the conversation.";
  }

  return "You are welcome to reply with any questions around pricing, availability, or next steps.";
}

function vehicleSentence(lead: LeadInput) {
  if (lead.vehicle_interest === "Porsche Taycan") {
    return "The Taycan continues to stand out for its electric performance and refined presence.";
  }

  if (lead.vehicle_interest === "Porsche 911 Carrera S") {
    return "The 911 Carrera S remains an iconic expression of Porsche performance and heritage.";
  }

  return `The ${lead.vehicle_interest} remains one of the most compelling ways to experience the Porsche range.`;
}

function buildEmailCopy(lead: LeadInput, key: EmailStep["key"]) {
  const templates = {
    email_1: {
      subject: "Thank you for your interest in Porsche Centre Trinidad",
      body: `Hello {{first_name}},

Thank you for your interest in the {{vehicle_interest}} at {{dealership_name}}.

${vehicleSentence(lead)}
${branchSentence(lead)}

Kind regards,
{{sales_rep_name}}
Porsche Brand Ambassador
{{dealership_name}}
{{phone_number}}
{{email}}`
    },
    email_2: {
      subject: "Just following up on your Porsche inquiry",
      body: `Hello {{first_name}},

I wanted to follow up on your interest in the {{vehicle_interest}}.

If you would like assistance with availability, pricing, or arranging a showroom visit, I would be glad to help whenever convenient.

Kind regards,
{{sales_rep_name}}`
    },
    email_3: {
      subject: "Here whenever the time is right",
      body: `Hello {{first_name}},

Just keeping the conversation open in case you are still considering the {{vehicle_interest}}.

Whenever the timing suits you, I would be happy to assist with the next step.

Best regards,
{{sales_rep_name}}`
    }
  };

  const selected = templates[key];
  return {
    subject: personalize(selected.subject, lead),
    preview: personalize(selected.body, lead)
  };
}

function buildEmailSteps(lead: LeadInput, createdAt: string): EmailStep[] {
  const created = new Date(createdAt);

  return EMAIL_SEQUENCE.map((sequence, index) => {
    const rendered = buildEmailCopy(lead, sequence.key);

    return {
      key: sequence.key,
      title: sequence.title,
      subject: rendered.subject,
      preview: rendered.preview,
      real_timing: sequence.realTiming,
      demo_timing: sequence.demoTiming,
      scheduled_at: addMinutes(created, sequence.delayMinutes),
      sent_at: index === 0 ? createdAt : null,
      status: index === 0 ? "sent" : index === 1 ? "scheduled" : "pending"
    };
  });
}

export function normalizeLeadInput(input: LeadInput): LeadInput {
  return {
    first_name: input.first_name.trim(),
    last_name: input.last_name.trim(),
    email: input.email.trim(),
    phone: input.phone.trim(),
    notes: input.notes.trim(),
    vehicle_interest:
      LOOKUPS.vehicle_interest.get(normalize(input.vehicle_interest)) ??
      FIELD_OPTIONS.vehicle_interest[0],
    inquiry_type:
      LOOKUPS.inquiry_type.get(normalize(input.inquiry_type)) ??
      FIELD_OPTIONS.inquiry_type[0],
    preferred_contact_method:
      LOOKUPS.preferred_contact_method.get(normalize(input.preferred_contact_method)) ??
      FIELD_OPTIONS.preferred_contact_method[0],
    timeline_to_purchase:
      LOOKUPS.timeline_to_purchase.get(normalize(input.timeline_to_purchase)) ??
      FIELD_OPTIONS.timeline_to_purchase[0],
    budget_range:
      LOOKUPS.budget_range.get(normalize(input.budget_range)) ??
      FIELD_OPTIONS.budget_range[0],
    trade_in_interest:
      LOOKUPS.trade_in_interest.get(normalize(input.trade_in_interest)) ??
      FIELD_OPTIONS.trade_in_interest[1],
    test_drive_interest:
      LOOKUPS.test_drive_interest.get(normalize(input.test_drive_interest)) ??
      FIELD_OPTIONS.test_drive_interest[1],
    lead_source:
      LOOKUPS.lead_source.get(normalize(input.lead_source)) ??
      FIELD_OPTIONS.lead_source[0]
  };
}

export function validateLeadInput(input: LeadInput) {
  const requiredFields: Array<keyof LeadInput> = [
    "first_name",
    "last_name",
    "email",
    "phone",
    "vehicle_interest",
    "inquiry_type",
    "preferred_contact_method",
    "timeline_to_purchase",
    "budget_range",
    "trade_in_interest",
    "test_drive_interest",
    "lead_source"
  ];

  const missing = requiredFields.filter((field) => !input[field].trim());
  const errors: string[] = [];

  if (missing.length > 0) {
    errors.push(`Missing required fields: ${missing.join(", ")}`);
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())) {
    errors.push("Email must be valid.");
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

export function scoreLead(input: LeadInput) {
  let score = 10;

  switch (input.inquiry_type) {
    case "book a test drive":
      score += 35;
      break;
    case "financing inquiry":
      score += 28;
      break;
    case "trade-in inquiry":
      score += 20;
      break;
    case "pricing request":
      score += 18;
      break;
    case "availability request":
      score += 16;
      break;
    default:
      score += 4;
      break;
  }

  switch (input.timeline_to_purchase) {
    case "immediately":
      score += 25;
      break;
    case "within 1 month":
      score += 18;
      break;
    case "within 3 months":
      score += 10;
      break;
    default:
      break;
  }

  if (input.trade_in_interest === "yes") {
    score += 10;
  }

  if (input.test_drive_interest === "yes") {
    score += 22;
  }

  const cappedScore = Math.min(score, 100);
  const temperature: LeadTemperature =
    cappedScore >= 70 ? "Hot" : cappedScore >= 40 ? "Warm" : "Cold";

  return { score: cappedScore, temperature };
}

export function deriveTags(
  lead: Pick<
    Lead,
    | "vehicle_interest"
    | "inquiry_type"
    | "trade_in_interest"
    | "test_drive_interest"
    | "temperature"
    | "reply_status"
    | "status"
  >
) {
  const tags = new Set<string>(["New Lead", "Porsche Inquiry"]);

  const modelTag = MODEL_TAGS[lead.vehicle_interest];
  if (modelTag) {
    tags.add(modelTag);
  }

  if (lead.inquiry_type === "financing inquiry") {
    tags.add("Financing Inquiry");
  }

  if (lead.inquiry_type === "trade-in inquiry" || lead.trade_in_interest === "yes") {
    tags.add("Trade-In Lead");
  }

  if (lead.inquiry_type === "book a test drive" || lead.test_drive_interest === "yes") {
    tags.add("Test Drive Requested");
  }

  tags.add(`${lead.temperature} Lead`);

  if (lead.status === "No Response") {
    tags.add("No Response");
  }

  if (lead.reply_status === "Responded") {
    tags.add("Manual Follow-Up Needed");
  }

  return Array.from(tags);
}

export function createLeadRecord(input: LeadInput, createdAt = new Date().toISOString()) {
  const normalized = normalizeLeadInput(input);
  const { score, temperature } = scoreLead(normalized);
  const id = `lead_${randomUUID().slice(0, 8)}`;
  const emailSteps = buildEmailSteps(normalized, createdAt);
  const status: LeadStatus = "New Lead";

  const lead: Lead = {
    ...normalized,
    id,
    created_at: createdAt,
    updated_at: createdAt,
    score,
    temperature,
    tags: [],
    status,
    reply_status: "Awaiting Reply",
    automation_state: "active",
    last_email_sent: emailSteps[0].title,
    next_email_at: emailSteps[1].scheduled_at,
    email_steps: emailSteps,
    activity_log: []
  };

  lead.tags = deriveTags(lead);
  lead.activity_log = [
    buildEvent(id, "lead_created", "Lead created and entered into the demo tracker.", createdAt),
    buildEvent(id, "lead_scored", `Lead scored ${score}/100 and classified as ${temperature}.`, createdAt),
    buildEvent(id, "tags_applied", `Tags applied: ${lead.tags.join(", ")}.`, createdAt),
    buildEvent(
      id,
      "email_sent",
      `${emailSteps[0].title} sent with premium confirmation messaging.`,
      createdAt
    ),
    buildEvent(
      id,
      "email_scheduled",
      `${emailSteps[1].title} scheduled on the accelerated demo timeline.`,
      createdAt
    )
  ];

  return lead;
}

export function alertsForLeadCreation(lead: Lead, createdAt = lead.created_at) {
  const alerts: Alert[] = [];

  if (lead.temperature === "Hot") {
    alerts.push(
      buildAlert(
        lead.id,
        "critical",
        "Hot lead surfaced",
        `${lead.first_name} ${lead.last_name} needs fast personal outreach.`,
        createdAt
      )
    );
  }

  if (lead.inquiry_type === "financing inquiry") {
    alerts.push(
      buildAlert(
        lead.id,
        "high",
        "Financing inquiry submitted",
        `${lead.first_name} requested financing guidance for the ${lead.vehicle_interest}.`,
        createdAt
      )
    );
  }

  if (lead.inquiry_type === "book a test drive" || lead.test_drive_interest === "yes") {
    alerts.push(
      buildAlert(
        lead.id,
        "high",
        "Test drive interest flagged",
        `${lead.first_name} is ready to discuss a showroom visit or test drive.`,
        createdAt
      )
    );
  }

  return alerts;
}

export function advanceLeadTimeline(lead: Lead, advancedAt = new Date().toISOString()) {
  if (lead.reply_status === "Responded" || lead.automation_state !== "active") {
    return lead;
  }

  const nextScheduledIndex = lead.email_steps.findIndex((step) => step.status === "scheduled");
  if (nextScheduledIndex === -1) {
    return lead;
  }

  const emailSteps = lead.email_steps.map((step) => ({ ...step }));
  const currentStep = emailSteps[nextScheduledIndex];
  currentStep.status = "sent";
  currentStep.sent_at = advancedAt;

  const nextStep = emailSteps[nextScheduledIndex + 1];
  let status: LeadStatus = "Follow-Up Active";
  let automationState: Lead["automation_state"] = lead.automation_state;
  let nextEmailAt: string | null = null;

  if (nextStep) {
    nextStep.status = "scheduled";
    nextEmailAt = nextStep.scheduled_at;
  } else {
    status = "No Response";
    automationState = "complete";
  }

  const updatedLead: Lead = {
    ...lead,
    updated_at: advancedAt,
    status,
    automation_state: automationState,
    email_steps: emailSteps,
    last_email_sent: currentStep.title,
    next_email_at: nextEmailAt
  };

  updatedLead.tags = deriveTags(updatedLead);
  updatedLead.activity_log = [
    buildEvent(updatedLead.id, "email_sent", `${currentStep.title} sent on the accelerated timeline.`, advancedAt),
    ...lead.activity_log
  ];

  if (nextStep) {
    updatedLead.activity_log.unshift(
      buildEvent(
        updatedLead.id,
        "email_scheduled",
        `${nextStep.title} is now scheduled for the next demo checkpoint.`,
        advancedAt
      )
    );
  } else {
    updatedLead.activity_log.unshift(
      buildEvent(
        updatedLead.id,
        "tags_applied",
        "Lead marked as no response and shifted to nurture follow-up.",
        advancedAt
      )
    );
  }

  return updatedLead;
}

export function markLeadReplied(lead: Lead, repliedAt = new Date().toISOString()) {
  if (lead.reply_status === "Responded") {
    return lead;
  }

  const emailSteps: Lead["email_steps"] = lead.email_steps.map((step) => {
    const status: "sent" | "stopped" = step.status === "sent" ? "sent" : "stopped";

    return {
      ...step,
      status
    };
  });

  const updatedLead: Lead = {
    ...lead,
    updated_at: repliedAt,
    status: "Responded",
    reply_status: "Responded",
    automation_state: "stopped",
    email_steps: emailSteps,
    next_email_at: null
  };

  updatedLead.tags = deriveTags(updatedLead);
  updatedLead.activity_log = [
    buildEvent(updatedLead.id, "notification_triggered", "Sales rep alert created for manual follow-up.", repliedAt),
    buildEvent(updatedLead.id, "automation_stopped", "Automation stopped after the lead replied.", repliedAt),
    buildEvent(updatedLead.id, "lead_replied", "Lead replied and requested direct follow-up.", repliedAt),
    buildEvent(updatedLead.id, "tags_applied", `Tags updated: ${updatedLead.tags.join(", ")}.`, repliedAt),
    ...lead.activity_log
  ];

  return updatedLead;
}

export function alertsForReply(lead: Lead, createdAt = new Date().toISOString()) {
  return [
    buildAlert(
      lead.id,
      "high",
      "Lead replied",
      `${lead.first_name} replied. Manual follow-up is now the recommended next action.`,
      createdAt
    )
  ];
}

function createSeedLead(input: LeadInput, createdAt: string) {
  return createLeadRecord(input, createdAt);
}

export function createSeedStore(now = new Date()) {
  const time = now.getTime();

  const daniel = createSeedLead(
    {
      first_name: "Daniel",
      last_name: "Ali",
      email: "daniel.ali@example.com",
      phone: "+1 (868) 555-0101",
      vehicle_interest: "Porsche Macan",
      inquiry_type: "pricing request",
      preferred_contact_method: "email",
      timeline_to_purchase: "within 1 month",
      budget_range: "$80,000 - $120,000",
      trade_in_interest: "no",
      test_drive_interest: "yes",
      notes: "Interested in monthly payment guidance and weekend showroom visit.",
      lead_source: "Instagram DM"
    },
    new Date(time - 90 * 60_000).toISOString()
  );

  const alicia = advanceLeadTimeline(
    createSeedLead(
      {
        first_name: "Alicia",
        last_name: "Mohammed",
        email: "alicia.mohammed@example.com",
        phone: "+1 (868) 555-0102",
        vehicle_interest: "Porsche Taycan",
        inquiry_type: "financing inquiry",
        preferred_contact_method: "WhatsApp",
        timeline_to_purchase: "immediately",
        budget_range: "$120,000 - $180,000",
        trade_in_interest: "yes",
        test_drive_interest: "no",
        notes: "Wants a prompt comparison between Taycan trims and finance options.",
        lead_source: "Website Inquiry"
      },
      new Date(time - 6 * 60 * 60_000).toISOString()
    ),
    new Date(time - 5 * 60 * 60_000).toISOString()
  );

  const ryan = markLeadReplied(
    createSeedLead(
      {
        first_name: "Ryan",
        last_name: "James",
        email: "ryan.james@example.com",
        phone: "+1 (868) 555-0103",
        vehicle_interest: "Porsche 911 Carrera S",
        inquiry_type: "general question",
        preferred_contact_method: "phone",
        timeline_to_purchase: "just researching",
        budget_range: "$180,000+",
        trade_in_interest: "no",
        test_drive_interest: "no",
        notes: "Asked to be contacted directly by the rep before considering a visit.",
        lead_source: "Referral"
      },
      new Date(time - 28 * 60 * 60_000).toISOString()
    ),
    new Date(time - 26 * 60 * 60_000).toISOString()
  );

  const sophia = advanceLeadTimeline(
    advanceLeadTimeline(
      createSeedLead(
        {
          first_name: "Sophia",
          last_name: "Baptiste",
          email: "sophia.baptiste@example.com",
          phone: "+1 (868) 555-0104",
          vehicle_interest: "Porsche Cayenne",
          inquiry_type: "availability request",
          preferred_contact_method: "email",
          timeline_to_purchase: "within 3 months",
          budget_range: "$120,000 - $180,000",
          trade_in_interest: "no",
          test_drive_interest: "no",
          notes: "Requested preferred color and arrival timeline.",
          lead_source: "Showroom Walk-In"
        },
        new Date(time - 72 * 60 * 60_000).toISOString()
      ),
      new Date(time - 71 * 60 * 60_000).toISOString()
    ),
    new Date(time - 69 * 60 * 60_000).toISOString()
  );

  const leads = [daniel, alicia, ryan, sophia].sort((a, b) =>
    b.updated_at.localeCompare(a.updated_at)
  );

  const alerts = [
    ...alertsForLeadCreation(daniel),
    ...alertsForLeadCreation(alicia),
    ...alertsForLeadCreation(ryan),
    ...alertsForLeadCreation(sophia),
    ...alertsForReply(ryan, ryan.updated_at)
  ].sort((a, b) => b.created_at.localeCompare(a.created_at));

  return { leads, alerts };
}
