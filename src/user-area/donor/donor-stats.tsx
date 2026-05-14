import { Heart, DollarSign, Package } from "lucide-react";

import type { Donation } from "../../domain/types";
import { formatCurrencyBRL } from "./donor-utils";

interface DonorStatsProps {
  donations: Donation[];
}

export function DonorStats({ donations }: DonorStatsProps) {
  const total = donations.length;
  const financialTotal = donations
    .filter((d) => d.kind === "financeira")
    .reduce((sum, d) => sum + (d.amount ?? 0), 0);
  const materialCount = donations.filter((d) => d.kind === "material").length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card
        title="Doações realizadas"
        value={total.toString()}
        icon={<Heart className="h-5 w-5 text-pink-600" />}
      />
      <Card
        title="Total financeiro"
        value={formatCurrencyBRL(financialTotal)}
        icon={<DollarSign className="h-5 w-5 text-green-600" />}
        iconBg="bg-green-100"
      />
      <Card
        title="Doações materiais"
        value={materialCount.toString()}
        icon={<Package className="h-5 w-5 text-purple-600" />}
        iconBg="bg-purple-100"
      />
    </div>
  );
}

interface CardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  iconBg?: string;
}

function Card({ title, value, icon, iconBg = "bg-pink-100" }: CardProps) {
  return (
    <div className="rounded-2xl border border-pink-100 bg-white p-5 shadow-sm shadow-pink-100/40">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium text-[var(--foreground)]">
          {title}
        </span>
        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${iconBg}`}>
          {icon}
        </div>
      </div>
      <p className="text-2xl font-semibold text-[var(--primary)]">{value}</p>
    </div>
  );
}
