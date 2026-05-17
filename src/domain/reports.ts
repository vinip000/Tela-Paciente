// Helpers para gerar relatórios e exportar CSV.
// Pensados para serem reutilizados quando houver API: a lógica de agregação
// continua igual; só a fonte dos dados muda.

import type {
  Appointment,
  AppointmentStatus,
  Donation,
  DonationKind,
  DonationStatus,
} from "./types";

export interface DateRange {
  from?: string; // YYYY-MM-DD
  to?: string; // YYYY-MM-DD
}

function toIsoDay(input: string): string {
  return input.length <= 10 ? input : input.slice(0, 10);
}

export function isWithinRange(date: string, range: DateRange): boolean {
  const day = toIsoDay(date);
  if (range.from && day < range.from) return false;
  if (range.to && day > range.to) return false;
  return true;
}

export interface AppointmentsSummary {
  total: number;
  byStatus: Record<AppointmentStatus, number>;
  withReferral: number;
  uniquePatients: number;
}

export function summarizeAppointments(items: Appointment[]): AppointmentsSummary {
  const byStatus: Record<AppointmentStatus, number> = {
    agendado: 0,
    em_andamento: 0,
    concluido: 0,
    encaminhado: 0,
    cancelado: 0,
  };
  const patients = new Set<string>();
  let withReferral = 0;

  items.forEach((item) => {
    byStatus[item.status] += 1;
    patients.add(item.patientId);
    if (item.encaminhamento) withReferral += 1;
  });

  return {
    total: items.length,
    byStatus,
    withReferral,
    uniquePatients: patients.size,
  };
}

export interface DonationsSummary {
  total: number;
  byKind: Record<DonationKind, number>;
  byStatus: Record<DonationStatus, number>;
  totalAmount: number;
  uniqueDonors: number;
}

export function summarizeDonations(items: Donation[]): DonationsSummary {
  const byKind: Record<DonationKind, number> = { financeira: 0, material: 0 };
  const byStatus: Record<DonationStatus, number> = {
    pendente: 0,
    confirmada: 0,
    cancelada: 0,
  };
  const donors = new Set<string>();
  let totalAmount = 0;

  items.forEach((item) => {
    byKind[item.kind] += 1;
    byStatus[item.status] += 1;
    donors.add(item.donorId);
    if (item.kind === "financeira" && item.amount) {
      totalAmount += item.amount;
    }
  });

  return {
    total: items.length,
    byKind,
    byStatus,
    totalAmount,
    uniqueDonors: donors.size,
  };
}

// ── CSV ───────────────────────────────────────────────

export interface CsvColumn<T> {
  header: string;
  value: (row: T) => string | number | undefined | null;
}

function escapeCsvValue(raw: string | number | undefined | null): string {
  if (raw === null || raw === undefined) return "";
  const text = String(raw);
  if (/[",;\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

export function buildCsv<T>(rows: T[], columns: CsvColumn<T>[]): string {
  const header = columns.map((column) => escapeCsvValue(column.header)).join(";");
  const body = rows
    .map((row) =>
      columns.map((column) => escapeCsvValue(column.value(row))).join(";"),
    )
    .join("\n");
  return `${header}\n${body}`;
}

export function downloadCsv(filename: string, content: string): void {
  if (typeof window === "undefined") return;
  // BOM para abrir corretamente no Excel
  const blob = new Blob([`﻿${content}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
