import { AutomationOverview } from "@/components/automation-overview";
import { getDashboardSnapshot } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function AutomationPage() {
  const snapshot = await getDashboardSnapshot();

  return <AutomationOverview snapshot={snapshot} />;
}
