const locales: Record<string, string> = {};

function loadLocale(language: string) {
 
};

function getLocalizedText(key: string): string {
  return locales[key] || key;
};

export { loadLocale, getLocalizedText };