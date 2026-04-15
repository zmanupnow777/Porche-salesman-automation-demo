import { NextResponse } from "next/server";

import { advanceLead } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await advanceLead(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to advance timeline.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
