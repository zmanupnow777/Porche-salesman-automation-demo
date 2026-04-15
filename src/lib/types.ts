export type LeadTemperature = "Hot" | "Warm" | "Cold";
export type LeadStatus =
  | "New Lead"
  | "Follow-Up Active"
  | "Responded"
  | "No Response";
export type ReplyStatus = "Awaiting Reply" | "Responded";
export type AutomationState = "active" | "stopped" | "complete";
export type EmailStepKey = "email_1" | "email_2" | "email_3";
export type EmailStepStatus = "sent" | "scheduled" | "pending" | "stopped";
export type ActivityKind =
  | "lead_created"
  | "lead_scored"
  | "tags_applied"
  | "email_sent"
  | "email_scheduled"
  | "lead_replied"
  | "automation_stopped"
  | "notification_triggered";
export type AlertSeverity = "critical" | "high" | "medium";

export interface LeadInput {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  vehicle_interest: string;
  inquiry_type: string;
  preferred_contact_method: string;
  timeline_to_purchase: string;
  budget_range: string;
  trade_in_interest: string;
  test_drive_interest: string;
  notes: string;
  lead_source: string;
}

export interface EmailStep {
  key: EmailStepKey;
  title: string;
  subject: string;
  preview: string;
  real_timing: string;
  demo_timing: string;
  scheduled_at: string | null;
  sent_at: string | null;
  status: EmailStepStatus;
}

export interface ActivityEvent {
  id: string;
  lead_id: string;
  kind: ActivityKind;
  message: string;
  timestamp: string;
}

export interface Alert {
  id: string;
  lead_id: string;
  severity: AlertSeverity;
  title: string;
  message: string;
  created_at: string;
  resolved: boolean;
}

export interface Lead extends LeadInput {
  id: string;
  created_at: string;
  updated_at: string;
  score: number;
  temperature: LeadTemperature;
  tags: string[];
  status: LeadStatus;
  reply_status: ReplyStatus;
  automation_state: AutomationState;
  last_email_sent: string | null;
  next_email_at: string | null;
  email_steps: EmailStep[];
  activity_log: ActivityEvent[];
}

export interface StoreData {
  leads: Lead[];
  alerts: Alert[];
}

export interface DashboardStat {
  label: string;
  value: number;
  accent: "gold" | "silver" | "crimson" | "slate";
}

export interface VehicleBreakdown {
  vehicle: string;
  count: number;
}

export interface DashboardSnapshot {
  leads: Lead[];
  alerts: Alert[];
  stats: DashboardStat[];
  vehicles: VehicleBreakdown[];
  recent_activity: ActivityEvent[];
}
