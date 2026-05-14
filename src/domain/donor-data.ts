// Repositório de doações.
// Seed inicial + persistência em localStorage.
// Trocar por API: substituir as funções load/save abaixo.

import {
  DEMO_DONOR_ID,
  DEMO_DONOR_NAME,
  loadFromStorage,
  saveToStorage,
} from "./storage";
import type { Donation } from "./types";

const DONATIONS_KEY = "cf:donations";

const seedDonations: Donation[] = [
  {
    id: "don-1",
    donorId: DEMO_DONOR_ID,
    donorName: DEMO_DONOR_NAME,
    kind: "financeira",
    date: "2026-03-10T10:00:00.000Z",
    status: "confirmada",
    amount: 50,
    campaign: "Outubro Rosa 2025",
    notes: "Doação via PIX.",
  },
  {
    id: "don-2",
    donorId: DEMO_DONOR_ID,
    donorName: DEMO_DONOR_NAME,
    kind: "material",
    date: "2026-03-02T14:30:00.000Z",
    status: "confirmada",
    itemType: "roupas",
    quantity: "5 peças",
    description: "Camisetas e blusas em bom estado.",
    deliveryMethod: "levar",
  },
  {
    id: "don-3",
    donorId: DEMO_DONOR_ID,
    donorName: DEMO_DONOR_NAME,
    kind: "financeira",
    date: "2026-04-15T09:15:00.000Z",
    status: "confirmada",
    amount: 100,
    campaign: "Campanha de Cabelos",
  },
  {
    id: "don-4",
    donorId: DEMO_DONOR_ID,
    donorName: DEMO_DONOR_NAME,
    kind: "material",
    date: "2026-05-05T11:00:00.000Z",
    status: "pendente",
    itemType: "higiene",
    quantity: "10 unidades",
    description: "Kits de higiene pessoal.",
    deliveryMethod: "retirada",
    notes: "Retirada agendada para o final do mês.",
  },
];

export function loadDonations(): Donation[] {
  return loadFromStorage<Donation[]>(DONATIONS_KEY, seedDonations);
}

export function saveDonations(items: Donation[]): void {
  saveToStorage(DONATIONS_KEY, items);
}

export function buildDonationId(): string {
  return `don-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}
