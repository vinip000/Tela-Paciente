// Camada fina de acesso ao localStorage.
// Quando houver API real, basta substituir as funções de cada repositório
// que importam estes helpers — os componentes não mudam.

export function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }
  const raw = window.localStorage.getItem(key);
  if (!raw) {
    return fallback;
  }
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(key, JSON.stringify(value));
}

// IDs fixos para o usuário demo de cada perfil.
// Permitem associar atendimentos / notificações / doações ao perfil logado
// sem precisar de tabela de usuários real.
export const DEMO_PATIENT_ID = "demo-paciente-1";
export const DEMO_PATIENT_NAME = "Maria da Silva";

export const DEMO_DONOR_ID = "demo-doador-1";
export const DEMO_DONOR_NAME = "João Doador";

export const DEMO_VOLUNTEER_ID = "demo-voluntaria-1";
export const DEMO_VOLUNTEER_NAME = "Ana Voluntária";
