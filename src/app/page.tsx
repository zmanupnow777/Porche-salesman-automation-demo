import { PitchHome } from "@/components/pitch-home";
import { getDashboardSnapshot } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function Page() {
  const snapshot = await getDashboardSnapshot();

  return <PitchHome snapshot={snapshot} />;
}
