import type { Donation } from "../../domain/types";
import { DonorHistory } from "./donor-history";
import { DonorStats } from "./donor-stats";

interface DonorDashboardProps {
  donations: Donation[];
  onDonate: () => void;
}

export function DonorDashboard({ donations, onDonate }: DonorDashboardProps) {
  return (
    <div className="space-y-10">
      <DonorStats donations={donations} onDonate={onDonate} />
      <DonorHistory donations={donations} />
    </div>
  );
}
