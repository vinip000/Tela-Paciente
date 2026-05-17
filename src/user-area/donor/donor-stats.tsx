import { DollarSign, Heart } from "lucide-react";

import type { Donation } from "../../domain/types";
import { formatCurrencyBRL } from "./donor-utils";
import { Button } from "../../ui/button";

interface DonorStatsProps {
  donations: Donation[];
  onDonate: () => void;
}

export function DonorStats({ donations, onDonate }: DonorStatsProps) {
  const total = donations.length;
  const financialTotal = donations
    .filter((d) => d.kind === "financeira")
    .reduce((sum, d) => sum + (d.amount ?? 0), 0);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <Card
        title="Total Doado"
        value={formatCurrencyBRL(financialTotal)}
        hint="Em doações financeiras"
        icon={<DollarSign className="h-5 w-5 text-green-600" />}
        iconBg="bg-green-100"
      />
      <Card
        title="Doações"
        value={total.toString()}
        hint="Total de contribuições"
        icon={<Heart className="h-5 w-5 text-pink-600" />}
      />
      <section className="flex min-h-[224px] flex-col rounded-2xl border border-pink-100 bg-white p-7 shadow-sm shadow-pink-100/50">
        <h2 className="mb-12 text-xl font-medium text-[var(--foreground)]">
          Nova Doação
        </h2>
        <div className="flex flex-1 items-center">
          <Button
            onClick={onDonate}
            className="h-11 w-full rounded-full bg-[var(--primary)] font-semibold text-white hover:bg-[var(--primary)]/90"
          >
            <Heart className="mr-2 h-4 w-4" />
            Doar Agora
          </Button>
        </div>
      </section>
    </div>
  );
}

interface CardProps {
  title: string;
  value: string;
  hint: string;
  icon: React.ReactNode;
  iconBg?: string;
}

function Card({ title, value, hint, icon, iconBg = "bg-pink-100" }: CardProps) {
  return (
    <section className="flex min-h-[224px] flex-col rounded-2xl border border-pink-100 bg-white p-7 shadow-sm shadow-pink-100/50">
      <div className="mb-8 flex items-start justify-between gap-4">
        <h2 className="text-xl font-medium text-[var(--foreground)]">
          {title}
        </h2>
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${iconBg}`}
        >
          {icon}
        </div>
      </div>
      <div className="mt-auto">
        <p
          className={`text-3xl font-medium ${
            title === "Total Doado" ? "text-green-600" : "text-[var(--primary)]"
          }`}
        >
          {value}
        </p>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">{hint}</p>
      </div>
    </section>
  );
}
