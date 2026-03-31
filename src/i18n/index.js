export const SUPPORTED_LANGUAGES = ['en', 'cn', 'ru'];
export const DEFAULT_LANGUAGE = 'en';

export function isValidLanguage(lang) {
  return SUPPORTED_LANGUAGES.includes(lang);
}

export function detectBrowserLanguage() {
  // Get browser language, considering both navigator.language and navigator.languages
  const browserLang = typeof navigator !== 'undefined' 
    ? (navigator.language || navigator.languages[0]).split('-')[0].toLowerCase()
    : DEFAULT_LANGUAGE;

  // Map browser language to supported languages
  const languageMap = {
    'en': 'en',
    'zh': 'cn',  
    'ru': 'ru'
  };

  return languageMap[browserLang] || DEFAULT_LANGUAGE;
}