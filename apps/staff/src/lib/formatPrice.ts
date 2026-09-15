export function formatPrice(value: string | number, currency = "OMR"): string {
  return `${Number(value).toFixed(3)} ${currency}`;
}
