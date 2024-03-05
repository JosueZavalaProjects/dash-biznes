/**
 * Format number to $XX,XXX.XX
 */
export function formatCurrency(
  number: number,
  maximumFractionDigits = 2
): string {
  if (!number && number !== 0) return "";

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits,
    style: "currency",
    currency: "USD",
  }).format(number);
}
