import { Bell, Check, CheckCheck, Megaphone, CalendarClock, ClipboardList, Info } from "lucide-react";

import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import type { AppNotification, NotificationType } from "../../domain/types";
import {
  formatDateTimeBR,
  notificationTypeBadgeClass,
  notificationTypeLabel,
} from "./patient-utils";

interface PatientNotificationsProps {
  notifications: AppNotification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
}

const typeIcon: Record<NotificationType, typeof Bell> = {
  atendimento: ClipboardList,
  campanha: Megaphone,
  lembrete: CalendarClock,
  geral: Info,
};

export function PatientNotifications({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
}: PatientNotificationsProps) {
  const unreadCount = notifications.filter((item) => !item.read).length;
  const sorted = [...notifications].sort((a, b) =>
    b.date.localeCompare(a.date),
  );

  return (
    <section className="rounded-3xl border border-pink-100 bg-white p-6 shadow-sm shadow-pink-100/40">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-100">
            <Bell className="h-5 w-5 text-pink-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[var(--primary)]">
              Notificações
            </h2>
            <p className="text-sm text-[var(--muted-foreground)]">
              {unreadCount > 0
                ? `Você tem ${unreadCount} ${unreadCount === 1 ? "nova mensagem" : "novas mensagens"}.`
                : "Nenhuma nova mensagem."}
            </p>
          </div>
        </div>
        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={onMarkAllAsRead}
            className="rounded-full border-pink-200 text-pink-700 hover:bg-pink-50"
          >
            <CheckCheck size={14} />
            Marcar todas como lidas
          </Button>
        )}
      </div>

      {sorted.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-pink-100 bg-pink-50/40 p-6 text-center text-sm text-[var(--muted-foreground)]">
          Você ainda não tem notificações.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {sorted.map((notification) => {
            const Icon = typeIcon[notification.type];
            return (
              <li
                key={notification.id}
                className={`rounded-2xl border p-4 transition-colors ${
                  notification.read
                    ? "border-pink-100 bg-white"
                    : "border-pink-200 bg-pink-50/60"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                      notification.read ? "bg-gray-100 text-gray-500" : "bg-pink-100 text-pink-600"
                    }`}
                  >
                    <Icon size={16} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold text-[var(--foreground)]">
                        {notification.title}
                      </p>
                      <Badge
                        variant="outline"
                        className={notificationTypeBadgeClass[notification.type]}
                      >
                        {notificationTypeLabel[notification.type]}
                      </Badge>
                      {!notification.read && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-pink-100 px-2 py-0.5 text-[11px] font-semibold text-pink-700">
                          Nova
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                      {notification.message}
                    </p>
                    <p className="mt-2 text-xs text-[var(--muted-foreground)]">
                      {formatDateTimeBR(notification.date)}
                    </p>
                  </div>
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onMarkAsRead(notification.id)}
                      className="shrink-0 rounded-full text-pink-700 hover:bg-pink-100"
                      aria-label="Marcar como lida"
                    >
                      <Check size={14} />
                    </Button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
