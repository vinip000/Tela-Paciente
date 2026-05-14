import type { Donation } from "../../domain/types";
import { DonorStats } from "./donor-stats";
import { DonorCampaigns } from "./donor-campaigns";
import { DonorHistory } from "./donor-history";

interface DonorDashboardProps {
  donations: Donation[];
}

export function DonorDashboard({ donations }: DonorDashboardProps) {
  return (
    <div className="mt-6 space-y-6">
      <DonorStats donations={donations} />

      <DonorCampaigns />

      <DonorHistory donations={donations} />
    </div>
  );
}
