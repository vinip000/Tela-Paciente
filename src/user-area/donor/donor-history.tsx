import { useMemo, useState } from "react";
import { History, DollarSign, Package, Filter } from "lucide-react";

import { Badge } from "../../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import type { Donation, DonationKind, DonationStatus } from "../../domain/types";
import {
  deliveryMethodLabel,
  donationItemLabel,
  donationKindLabel,
  donationStatusBadgeClass,
  donationStatusLabel,
  formatCurrencyBRL,
  formatDateTimeBR,
} from "./donor-utils";

interface DonorHistoryProps {
  donations: Donation[];
}

type KindFilter = "all" | DonationKind;
type StatusFilter = "all" | DonationStatus;

export function DonorHistory({ donations }: DonorHistoryProps) {
  const [kindFilter, setKindFilter] = useState<KindFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const filtered = useMemo(() => {
    return [...donations]
      .filter((d) => kindFilter === "all" || d.kind === kindFilter)
      .filter((d) => statusFilter === "all" || d.status === statusFilter)
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [donations, kindFilter, statusFilter]);

  return (
    <section className="rounded-3xl border border-pink-100 bg-white p-6 shadow-sm shadow-pink-100/40">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-100">
            <History className="h-5 w-5 text-pink-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[var(--primary)]">
              Histórico de doações
            </h2>
            <p className="text-sm text-[var(--muted-foreground)]">
              {donations.length} {donations.length === 1 ? "doação registrada" : "doações registradas"}.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Filter size={14} className="text-[var(--muted-foreground)]" />
          <Select
            value={kindFilter}
            onValueChange={(value) => setKindFilter(value as KindFilter)}
          >
            <SelectTrigger className="w-36 rounded-full border-pink-200 bg-[var(--input-background)] text-sm">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os tipos</SelectItem>
              <SelectItem value="financeira">Financeira</SelectItem>
              <SelectItem value="material">Material</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value as StatusFilter)}
          >
            <SelectTrigger className="w-36 rounded-full border-pink-200 bg-[var(--input-background)] text-sm">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="pendente">Pendente</SelectItem>
              <SelectItem value="confirmada">Confirmada</SelectItem>
              <SelectItem value="cancelada">Cancelada</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-pink-100 bg-pink-50/40 p-6 text-center text-sm text-[var(--muted-foreground)]">
          Nenhuma doação encontrada com os filtros atuais.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {filtered.map((donation) => (
            <li
              key={donation.id}
              className="rounded-2xl border border-pink-100 bg-pink-50/30 p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <div
                    className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                      donation.kind === "financeira"
                        ? "bg-green-100 text-green-700"
                        : "bg-purple-100 text-purple-700"
                    }`}
                  >
                    {donation.kind === "financeira" ? (
                      <DollarSign size={16} />
                    ) : (
                      <Package size={16} />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold text-[var(--foreground)]">
                        {donationKindLabel[donation.kind]}
                      </span>
                      <Badge
                        variant="outline"
                        className={donationStatusBadgeClass[donation.status]}
                      >
                        {donationStatusLabel[donation.status]}
                      </Badge>
                      {donation.campaign && (
                        <span className="rounded-full bg-pink-100 px-2 py-0.5 text-[11px] font-medium text-pink-700">
                          {donation.campaign}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                      {renderDonationDetail(donation)}
                    </p>
                    {donation.notes && (
                      <p className="mt-1 text-xs italic text-[var(--muted-foreground)]">
                        {donation.notes}
                      </p>
                    )}
                    <p className="mt-2 text-xs text-[var(--muted-foreground)]">
                      {formatDateTimeBR(donation.date)}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function renderDonationDetail(donation: Donation): string {
  if (donation.kind === "financeira") {
    if (donation.amount && donation.amount > 0) {
      return formatCurrencyBRL(donation.amount);
    }
    return "Valor a confirmar";
  }
  const parts: string[] = [];
  if (donation.itemType) {
    parts.push(donationItemLabel[donation.itemType]);
  }
  if (donation.quantity) {
    parts.push(donation.quantity);
  }
  if (donation.deliveryMethod) {
    parts.push(deliveryMethodLabel[donation.deliveryMethod]);
  }
  if (donation.description) {
    parts.push(donation.description);
  }
  return parts.join(" · ") || "Material doado";
}
