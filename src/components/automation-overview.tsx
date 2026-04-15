import Link from "next/link";

import { AlertItem, EmailStepCard } from "@/components/dashboard-primitives";
import { SALES_REP } from "@/lib/config";
import { formatDateTime } from "@/lib/format";
import { DashboardSnapshot } from "@/lib/types";

export function AutomationOverview({ snapshot }: { snapshot: DashboardSnapshot }) {
  const featuredLead = snapshot.leads.find((lead) => lead.temperature === "Hot") ?? snapshot.leads[0];

  if (!featuredLead) {
    return (
      <main className="page-shell page-stack">
        <section className="panel empty-state">
          <span className="eyebrow">Automation page</span>
          <p>Steffan, no lead data is available yet. Reset your demo seeds and reload.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell page-stack">
      <section className="hero-panel">
        <div className="section-stack">
          <div>
            <span className="eyebrow">Automation view for Steffan Semurath</span>
            <h1>Steffan, every inquiry gets a premium next step without feeling over-automated.</h1>
          </div>
          <p className="hero-copy">
            Steffan, your sequence stays short, personal, and premium. It acknowledges the vehicle
            of interest, adapts by inquiry type, and hands the conversation back to you as soon as
            the lead replies.
          </p>
          <div className="hero-meta">
            <span>{SALES_REP.sales_rep_name}</span>
            <span>{featuredLead.vehicle_interest}</span>
            <span>Next scheduled step: {formatDateTime(featuredLead.next_email_at)}</span>
          </div>
          <div className="action-row">
            <Link href="/tracker" className="primary-button">
              Open Your Live CRM View
            </Link>
            <Link href="/" className="ghost-button">
              Back to your pitch overview
            </Link>
          </div>
        </div>

        <div className="hero-note">
          <span className="eyebrow">Branching summary</span>
          <div className="section-stack">
            <div className="story-card compact-card">
              <h3>Test drive</h3>
              <p>Steffan, your CTA shifts toward preferred day and time, then surfaces a fast rep alert.</p>
            </div>
            <div className="story-card compact-card">
              <h3>Financing</h3>
              <p>Steffan, your financing inquiries are acknowledged and treated as higher-intent sooner.</p>
            </div>
            <div className="story-card compact-card">
              <h3>Trade-in or reply</h3>
              <p>Steffan, the conversation moves to your manual follow-up instead of continued automated sends.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="split-grid">
        <article className="panel section-stack">
          <div className="panel-header">
            <div>
              <span className="eyebrow">Featured lead path</span>
              <h2>
                {featuredLead.first_name} {featuredLead.last_name}
              </h2>
            </div>
            <p className="panel-copy">
              Steffan, this example demonstrates the exact personalized copy and status progression
              visible in your CRM page.
            </p>
          </div>
          <div className="timeline-grid">
            {featuredLead.email_steps.map((step) => (
              <EmailStepCard key={step.key} step={step} />
            ))}
          </div>
        </article>

        <article className="panel section-stack">
          <div className="panel-header">
            <div>
              <span className="eyebrow">Manual handoff logic</span>
              <h2>Steffan, here is when you should step in.</h2>
            </div>
          </div>
          <div className="story-card compact-card">
            <h3>Reply-stop behavior</h3>
            <p>
              Steffan, the moment a lead replies, the remaining automation stops, the lead is
              tagged for your manual follow-up, and a rep alert is created.
            </p>
          </div>
          <div className="story-card compact-card">
            <h3>High-intent triggers</h3>
            <p>
              Steffan, hot temperature, financing questions, and test-drive interest remain visible
              in your in-app alerts feed without relying on external systems.
            </p>
          </div>
          <div className="story-card compact-card">
            <h3>Mobile-readiness</h3>
            <p>
              Steffan, the layout stacks into a single-column walkthrough so your pitch still reads
              cleanly on a phone during a live demo.
            </p>
          </div>
        </article>
      </section>

      <section className="top-grid">
        <article className="panel">
          <div className="panel-header">
            <div>
              <span className="eyebrow">Rep alerts</span>
              <h2>Steffan, this is what you see when a lead heats up.</h2>
            </div>
          </div>
          <div className="alert-list">
            {snapshot.alerts.slice(0, 4).map((alert) => (
              <AlertItem key={alert.id} {...alert} />
            ))}
          </div>
        </article>

        <article className="panel section-stack">
          <div className="panel-header">
            <div>
              <span className="eyebrow">What this proves for you</span>
              <h2>Steffan, this is what your automation page proves.</h2>
            </div>
          </div>
          <div className="story-card compact-card">
            <h3>1. Capture</h3>
            <p>Steffan, a new inquiry is instantly acknowledged with model-specific copy.</p>
          </div>
          <div className="story-card compact-card">
            <h3>2. Nurture</h3>
            <p>Steffan, your accelerated timeline proves the follow-up sequence is structured.</p>
          </div>
          <div className="story-card compact-card">
            <h3>3. Convert</h3>
            <p>Steffan, once a reply lands, the automation stops so you take over personally.</p>
          </div>
        </article>
      </section>
    </main>
  );
}
