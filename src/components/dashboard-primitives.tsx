import { DashboardSnapshot, Lead } from "@/lib/types";
import { cn, formatDateTime } from "@/lib/format";

export function StatCard({ label, value, accent }: DashboardSnapshot["stats"][number]) {
  return (
    <article className={cn("stat-card", `accent-${accent}`)}>
      <span className="eyebrow">{label}</span>
      <strong>{value}</strong>
    </article>
  );
}

export function AlertItem({
  lead_id,
  severity,
  title,
  message,
  created_at
}: DashboardSnapshot["alerts"][number]) {
  return (
    <article className="alert-card">
      <div className="stack-row">
        <span className={cn("badge", `severity-${severity}`)}>{severity}</span>
        <span className="meta">{formatDateTime(created_at)}</span>
      </div>
      <h4>{title}</h4>
      <p>{message}</p>
      <span className="meta">Lead ID: {lead_id}</span>
    </article>
  );
}

export function EmailStepCard({ step }: { step: Lead["email_steps"][number] }) {
  return (
    <article className="timeline-card">
      <div className="stack-row">
        <h4>{step.title}</h4>
        <span className={cn("badge", `step-${step.status}`)}>{step.status}</span>
      </div>
      <p className="timeline-subject">{step.subject}</p>
      <p className="meta">
        {step.real_timing} | {step.demo_timing}
      </p>
      <p className="meta">
        Scheduled: {formatDateTime(step.scheduled_at)}
        <br />
        Sent: {step.sent_at ? formatDateTime(step.sent_at) : "Not sent"}
      </p>
      <pre>{step.preview}</pre>
    </article>
  );
}
