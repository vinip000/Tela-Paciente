import { useEffect, useMemo, useState } from "react";
import { CalendarCheck, Clock, Bell } from "lucide-react";

import {
  loadAppointments,
  loadNotifications,
  saveNotifications,
} from "../../domain/patient-data";
import { DEMO_PATIENT_ID } from "../../domain/storage";
import type { Appointment, AppNotification } from "../../domain/types";
import { PatientNotifications } from "./patient-notifications";
import { PatientAppointmentsTimeline } from "./patient-appointments-timeline";
import { formatDateBR } from "./patient-utils";

export function PatientDashboard() {
  const [appointments] = useState<Appointment[]>(() =>
    loadAppointments().filter((apt) => apt.patientId === DEMO_PATIENT_ID),
  );
  const [notifications, setNotifications] = useState<AppNotification[]>(() =>
    loadNotifications().filter(
      (n) => n.recipientRole === "paciente" && (!n.recipientId || n.recipientId === DEMO_PATIENT_ID),
    ),
  );

  // Mantém o storage em sincronia. Como o array já contém só os items do paciente,
  // mesclamos com os de outros perfis no save (defensivo).
  useEffect(() => {
    const all = loadNotifications().filter(
      (n) => !(n.recipientRole === "paciente" && (!n.recipientId || n.recipientId === DEMO_PATIENT_ID)),
    );
    saveNotifications([...all, ...notifications]);
  }, [notifications]);

  const completedCount = useMemo(
    () => appointments.filter((a) => a.status === "concluido").length,
    [appointments],
  );
  const nextAppointment = useMemo(() => {
    const upcoming = appointments
      .filter((a) => a.status === "agendado" || a.status === "em_andamento")
      .sort((a, b) => a.date.localeCompare(b.date));
    return upcoming[0];
  }, [appointments]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  function handleMarkAsRead(id: string) {
    setNotifications((current) =>
      current.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  }

  function handleMarkAllAsRead() {
    setNotifications((current) => current.map((n) => ({ ...n, read: true })));
  }

  return (
    <div className="mt-6 space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryCard
          icon={<CalendarCheck className="h-5 w-5 text-pink-600" />}
          label="Atendimentos concluídos"
          value={completedCount.toString()}
          hint={`${appointments.length} no total`}
        />
        <SummaryCard
          icon={<Clock className="h-5 w-5 text-blue-600" />}
          iconBg="bg-blue-100"
          label="Próximo atendimento"
          value={nextAppointment ? formatDateBR(nextAppointment.date) : "—"}
          hint={
            nextAppointment
              ? `${nextAppointment.time ?? ""} · ${nextAppointment.volunteerName}`.trim()
              : "Sem agendamentos futuros"
          }
        />
        <SummaryCard
          icon={<Bell className="h-5 w-5 text-purple-600" />}
          iconBg="bg-purple-100"
          label="Notificações não lidas"
          value={unreadCount.toString()}
          hint={`${notifications.length} no total`}
        />
      </div>

      <PatientNotifications
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
      />

      <PatientAppointmentsTimeline appointments={appointments} />
    </div>
  );
}

interface SummaryCardProps {
  icon: React.ReactNode;
  iconBg?: string;
  label: string;
  value: string;
  hint?: string;
}

function SummaryCard({
  icon,
  iconBg = "bg-pink-100",
  label,
  value,
  hint,
}: SummaryCardProps) {
  return (
    <div className="rounded-2xl border border-pink-100 bg-white p-5 shadow-sm shadow-pink-100/40">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium text-[var(--foreground)]">
          {label}
        </span>
        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${iconBg}`}>
          {icon}
        </div>
      </div>
      <p className="text-2xl font-semibold text-[var(--primary)]">{value}</p>
      {hint && (
        <p className="mt-1 text-xs text-[var(--muted-foreground)]">{hint}</p>
      )}
    </div>
  );
}
