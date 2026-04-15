import type { Metadata } from "next";
import type { ReactNode } from "react";

import "@/app/globals.css";
import { SiteNav } from "@/components/site-nav";

export const metadata: Metadata = {
  title: "Steffan Semurath | Porsche Follow-Up Demo",
  description:
    "Tailored multi-page, mobile-ready Porsche follow-up automation demo for Porsche Centre Trinidad."
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteNav />
        {children}
      </body>
    </html>
  );
}
