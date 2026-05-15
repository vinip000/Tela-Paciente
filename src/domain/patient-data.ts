// Repositório de atendimentos e notificações.
// Dados mockados como semente, persistidos via localStorage.
// Para virar API: trocar load/save por chamadas HTTP.

import {
  DEMO_PATIENT_ID,
  DEMO_PATIENT_NAME,
  loadFromStorage,
  saveToStorage,
} from "./storage";
import type { Appointment, AppNotification } from "./types";

const APPOINTMENTS_KEY = "cf:appointments";
const NOTIFICATIONS_KEY = "cf:notifications";

const seedAppointments: Appointment[] = [
  {
    id: "apt-1",
    patientId: DEMO_PATIENT_ID,
    patientName: DEMO_PATIENT_NAME,
    date: "2026-04-22",
    time: "14:00",
    volunteerName: "Ana Voluntária",
    status: "concluido",
    observacoes:
      "Acolhimento inicial. Paciente recém-diagnosticada apresentou exames recentes e relatou dúvidas sobre o tratamento.",
    encaminhamento: "psicologia",
    encaminhamentoDetalhe:
      "Encaminhada ao grupo de apoio psicológico semanal.",
    createdAt: "2026-04-22T14:00:00.000Z",
    updatedAt: "2026-04-22T15:30:00.000Z",
  },
  {
    id: "apt-2",
    patientId: DEMO_PATIENT_ID,
    patientName: DEMO_PATIENT_NAME,
    date: "2026-05-02",
    time: "10:00",
    volunteerName: "Beatriz Voluntária",
    status: "concluido",
    observacoes:
      "Sessão de acompanhamento. Paciente relatou desconforto no ombro esquerdo. Demanda de fisioterapia identificada.",
    encaminhamento: "fisioterapia",
    encaminhamentoDetalhe: "Encaminhada para fisioterapia oncológica.",
    createdAt: "2026-05-02T10:00:00.000Z",
    updatedAt: "2026-05-02T11:00:00.000Z",
  },
  {
    id: "apt-3",
    patientId: DEMO_PATIENT_ID,
    patientName: DEMO_PATIENT_NAME,
    date: "2026-05-18",
    time: "09:30",
    volunteerName: "Ana Voluntária",
    status: "agendado",
    observacoes: "Próxima consulta de acompanhamento.",
    encaminhamento: null,
    createdAt: "2026-05-10T12:00:00.000Z",
    updatedAt: "2026-05-10T12:00:00.000Z",
  },
];

const seedNotifications: AppNotification[] = [
  {
    id: "nt-1",
    recipientRole: "paciente",
    recipientId: DEMO_PATIENT_ID,
    type: "lembrete",
    title: "Lembrete de consulta",
    message:
      "Sua próxima consulta está agendada para 18/05/2026 às 09:30 com Ana Voluntária.",
    date: "2026-05-12T08:00:00.000Z",
    read: false,
  },
  {
    id: "nt-2",
    recipientRole: "paciente",
    recipientId: DEMO_PATIENT_ID,
    type: "atendimento",
    title: "Encaminhamento atualizado",
    message:
      "Seu atendimento de 02/05 foi atualizado: encaminhamento para fisioterapia oncológica.",
    date: "2026-05-02T11:00:00.000Z",
    read: false,
  },
  {
    id: "nt-3",
    recipientRole: "paciente",
    recipientId: DEMO_PATIENT_ID,
    type: "campanha",
    title: "Campanha Outubro Rosa",
    message:
      "Inscrições abertas para o evento Outubro Rosa 2026. Convide pessoas próximas.",
    date: "2026-04-25T09:00:00.000Z",
    read: true,
  },
];

export function buildAppointmentId(): string {
  return `apt-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

export function loadAppointments(): Appointment[] {
  return loadFromStorage<Appointment[]>(APPOINTMENTS_KEY, seedAppointments);
}

export function saveAppointments(items: Appointment[]): void {
  saveToStorage(APPOINTMENTS_KEY, items);
}

export function loadNotifications(): AppNotification[] {
  return loadFromStorage<AppNotification[]>(
    NOTIFICATIONS_KEY,
    seedNotifications,
  );
}

export function saveNotifications(items: AppNotification[]): void {
  saveToStorage(NOTIFICATIONS_KEY, items);
}
