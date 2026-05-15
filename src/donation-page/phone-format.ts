// Máscara progressiva de telefone brasileiro: (DDD) número.
// Aceita fixo (10 dígitos) e celular (11 dígitos).

export function formatPhoneBR(input: string): string {
  const digits = input.replace(/\D/g, "").slice(0, 11);

  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;

  const ddd = digits.slice(0, 2);
  const rest = digits.slice(2);

  if (rest.length <= 4) {
    return `(${ddd}) ${rest}`;
  }

  if (digits.length <= 10) {
    // Fixo: (47) 3368-1234
    return `(${ddd}) ${rest.slice(0, 4)}-${rest.slice(4)}`;
  }

  // Celular: (47) 99999-1234
  return `(${ddd}) ${rest.slice(0, 5)}-${rest.slice(5)}`;
}
