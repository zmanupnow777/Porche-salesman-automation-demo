import Link from "next/link";

import { StatCard } from "@/components/dashboard-primitives";
import { SALES_REP } from "@/lib/config";
import { DashboardSnapshot } from "@/lib/types";

export function PitchHome({ snapshot }: { snapshot: DashboardSnapshot }) {
  const featuredLead = snapshot.leads.find((lead) => lead.temperature === "Hot") ?? snapshot.leads[0];

  return (
    <main className="page-shell page-stack">
      <section className="hero-panel home-hero">
        <div className="section-stack">
          <div>
            <span className="eyebrow">Tailored pitch for Steffan Semurath</span>
            <h1>A premium follow-up system designed around the way you sell Porsche.</h1>
          </div>
          <p className="hero-copy">
            Steffan, this demo is framed specifically for a Porsche Brand Ambassador at Porsche
            Centre Trinidad. It shows how Instagram, website, showroom, and referral inquiries can
            be captured, prioritized, and followed through with concise, premium messaging.
          </p>
          <div className="hero-meta">
            <span>{SALES_REP.sales_rep_name}</span>
            <span>Porsche Brand Ambassador</span>
            <span>{SALES_REP.dealership_name}</span>
          </div>
          <div className="action-row">
            <Link href="/tracker" className="primary-button">
              Open CRM Walkthrough
            </Link>
            <Link href="/automation" className="ghost-button">
              Review Automation Sequence
            </Link>
          </div>
        </div>

        <div className="hero-note">
          <span className="eyebrow">Positioning</span>
          <p>
            This remains a mock-only sample. It does not claim access to Porsche systems, live
            inboxes, CRM data, or dealership inventory tools.
          </p>
          <div className="story-card compact-card">
            <span className="eyebrow">Most persuasive live story</span>
            {featuredLead ? (
              <>
                <h3>
                  {featuredLead.first_name} {featuredLead.last_name}
                </h3>
                <p>
                  {featuredLead.vehicle_interest} inquiry with a {featuredLead.temperature.toLowerCase()}-
                  intent path, premium confirmation email, and alerting ready for personal follow-up.
                </p>
              </>
            ) : (
              <p>Seeded lead examples are available once the demo store is loaded.</p>
            )}
          </div>
        </div>
      </section>

      <section className="story-grid">
        <article className="story-card">
          <span className="eyebrow">Speed</span>
          <h3>Every lead gets an immediate, polished first response.</h3>
          <p>
            The first email acknowledges the exact vehicle inquiry and keeps momentum without
            sounding generic or sales-heavy.
          </p>
        </article>
        <article className="story-card">
          <span className="eyebrow">Prioritization</span>
          <h3>Hot leads surface quickly instead of sitting inside a mixed inbox.</h3>
          <p>
            Test-drive requests, financing intent, and short timelines automatically raise
            temperature and trigger in-app alerts.
          </p>
        </article>
        <article className="story-card">
          <span className="eyebrow">Brand fit</span>
          <h3>The tone stays aligned with Porsche and a concierge-style sales experience.</h3>
          <p>
            Messaging stays warm, restrained, and premium rather than feeling like low-end
            marketing automation.
          </p>
        </article>
      </section>

      <section className="panel section-stack">
        <div className="panel-header">
          <div>
            <span className="eyebrow">Demo Snapshot</span>
            <h2>What the seeded walkthrough already demonstrates</h2>
          </div>
          <p className="panel-copy">
            These numbers come from the live seeded data used across the CRM and automation pages.
          </p>
        </div>
        <div className="stats-grid">
          {snapshot.stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </section>

      <section className="walkthrough-grid">
        <article className="story-card">
          <span className="eyebrow">Page 1</span>
          <h3>Pitch</h3>
          <p>Lead with the tailored business case for Steffan and frame the problem clearly.</p>
          <Link href="/" className="text-link">
            You are here
          </Link>
        </article>
        <article className="story-card">
          <span className="eyebrow">Page 2</span>
          <h3>CRM Demo</h3>
          <p>
            Show intake, lead scoring, temperature filters, tags, alerts, and timeline controls in
            the live tracker.
          </p>
          <Link href="/tracker" className="text-link">
            Open the workspace
          </Link>
        </article>
        <article className="story-card">
          <span className="eyebrow">Page 3</span>
          <h3>Automation</h3>
          <p>
            Walk through the three-email cadence, branching logic, and reply-stop behavior on a
            dedicated page.
          </p>
          <Link href="/automation" className="text-link">
            See the sequence
          </Link>
        </article>
      </section>
    </main>
  );
}
