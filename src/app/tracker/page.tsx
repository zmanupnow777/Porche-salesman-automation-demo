import { DemoApp } from "@/components/demo-app";
import { getDashboardSnapshot } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function TrackerPage() {
  const initialDashboard = await getDashboardSnapshot();

  return <DemoApp initialDashboard={initialDashboard} />;
}
