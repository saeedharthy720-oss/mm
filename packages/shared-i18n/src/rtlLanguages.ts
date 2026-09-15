export const RTL_LANGUAGES = ["ar"] as const;

export function isRtlLanguage(language: string): boolean {
  return (RTL_LANGUAGES as readonly string[]).includes(language);
}
