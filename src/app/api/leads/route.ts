import { NextResponse } from "next/server";

import { createLead, getDashboardSnapshot } from "@/lib/store";
import { LeadInput } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET() {
  const snapshot = await getDashboardSnapshot();
  return NextResponse.json(snapshot);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LeadInput;
    const lead = await createLead(body);
    return NextResponse.json({ lead }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create lead.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
