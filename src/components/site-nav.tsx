"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/format";

const NAV_ITEMS = [
  { href: "/", label: "Your Pitch" },
  { href: "/tracker", label: "Your CRM" },
  { href: "/automation", label: "Your Automation" }
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="page-shell nav-shell">
        <Link href="/" className="brand-lockup">
          <span className="brand-title">Steffan Semurath Demo</span>
          <span className="brand-subtitle">Steffan, this is your Porsche Centre Trinidad follow-up demo</span>
        </Link>
        <nav className="nav-links" aria-label="Primary">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn("nav-link", active && "nav-link-active")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
