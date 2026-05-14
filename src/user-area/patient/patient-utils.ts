import type {
  AppointmentReferral,
  AppointmentStatus,
  NotificationType,
} from "../../domain/types";

export const appointmentStatusLabel: Record<AppointmentStatus, string> = {
  agendado: "Agendado",
  em_andamento: "Em andamento",
  concluido: "Concluído",
  encaminhado: "Encaminhado",
  cancelado: "Cancelado",
};

export const appointmentStatusBadgeClass: Record<AppointmentStatus, string> = {
  agendado: "bg-blue-50 text-blue-700 border-blue-200",
  em_andamento: "bg-amber-50 text-amber-700 border-amber-200",
  concluido: "bg-green-50 text-green-700 border-green-200",
  encaminhado: "bg-purple-50 text-purple-700 border-purple-200",
  cancelado: "bg-gray-100 text-gray-600 border-gray-200",
};

export const referralLabel: Record<NonNullable<AppointmentReferral>, string> = {
  mastologista: "Mastologista",
  psicologia: "Psicologia",
  fisioterapia: "Fisioterapia",
  assistencia_social: "Assistência social",
  nutricao: "Nutrição",
  outro: "Outro",
};

export const notificationTypeLabel: Record<NotificationType, string> = {
  atendimento: "Atendimento",
  campanha: "Campanha",
  lembrete: "Lembrete",
  geral: "Geral",
};

export const notificationTypeBadgeClass: Record<NotificationType, string> = {
  atendimento: "bg-pink-50 text-pink-700 border-pink-200",
  campanha: "bg-purple-50 text-purple-700 border-purple-200",
  lembrete: "bg-blue-50 text-blue-700 border-blue-200",
  geral: "bg-gray-100 text-gray-700 border-gray-200",
};

export function formatDateBR(isoDate: string): string {
  // aceita "YYYY-MM-DD" ou ISO datetime
  const date = isoDate.length <= 10
    ? new Date(`${isoDate}T00:00:00`)
    : new Date(isoDate);
  if (Number.isNaN(date.getTime())) {
    return isoDate;
  }
  return new Intl.DateTimeFormat("pt-BR").format(date);
}

export function formatDateTimeBR(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return iso;
  }
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
}
