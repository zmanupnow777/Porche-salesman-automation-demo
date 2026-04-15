import { NextResponse } from "next/server";

import { resetDemoStore } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function POST() {
  await resetDemoStore();
  return NextResponse.json({ ok: true });
}
