// Repositório de pacientes cadastradas.
// Seed inicial vindo da antiga lista mockada da área da voluntária.
// A primeira paciente compartilha o ID demo da paciente logada,
// então o histórico editado pela voluntária aparece na área da paciente.

import {
  DEMO_PATIENT_ID,
  DEMO_PATIENT_NAME,
  loadFromStorage,
  saveToStorage,
} from "./storage";
import type { Patient } from "./types";

const PATIENTS_KEY = "cf:patients";

const seedPatients: Patient[] = [
  {
    id: DEMO_PATIENT_ID,
    name: DEMO_PATIENT_NAME,
    registrationDate: "2025-10-10",
    status: "pendente",
    priority: "alta",
    symptoms: "Nódulo detectado, necessita avaliação urgente",
  },
  {
    id: "pat-2",
    name: "Ana Souza",
    registrationDate: "2025-10-08",
    status: "encaminhado",
    priority: "media",
    symptoms: "Consulta de acompanhamento pós-cirurgia",
  },
  {
    id: "pat-3",
    name: "Carla Santos",
    registrationDate: "2025-10-05",
    status: "concluido",
    priority: "baixa",
    symptoms: "Exames de rotina - Resultados normais",
  },
  {
    id: "pat-4",
    name: "Beatriz Lima",
    registrationDate: "2025-10-12",
    status: "pendente",
    priority: "media",
    symptoms: "Primeira consulta - histórico familiar",
  },
];

export function loadPatients(): Patient[] {
  return loadFromStorage<Patient[]>(PATIENTS_KEY, seedPatients);
}

export function savePatients(items: Patient[]): void {
  saveToStorage(PATIENTS_KEY, items);
}
