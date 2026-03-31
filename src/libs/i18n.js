import { createContext, createSignal, useContext, createResource } from 'solid-js';
import { createStore } from 'solid-js/store';

/** 替换模板中的占位符 */
export function template(str, data, regex = /\{\{(.+?)\}\}/g) {
  return Array.from(str.matchAll(regex)).reduce((acc, match) => {
    return acc.replace(match[0], data[match[1]]);
  }, str);
}

/** 安全获取对象深层数据 */
export function deepReadObject(obj, path, defaultValue) {
  const value = path
    .trim()
    .split('.')
    .reduce((a, b) => (a ? a[b] : undefined), obj);
   
  return value !== undefined ? value : defaultValue;
}

/** 在服务端加载翻译数据 */
export async function fetchLocaleData(lang) {
  // 利用 Node 导入 JSON 文件（SSR 下有效）
  try {
    const data = await import(`~/i18n/locales/${lang}.json`);
    return data.default;
  } catch (error) {
    console.error(`加载翻译文件失败: ${lang}`, error);
    return {};
  }
}

/** 创建 I18nContext，同时允许传入初始翻译数据（SSR 下已加载） */
export function createI18nContext(lang, initialTranslations = {}) {
  const [locale, setLocale] = createSignal(lang);
  const [translations, setTranslations] = createStore(initialTranslations);
   
  // 客户端如果后续切换语言仍然可使用异步加载
  const [translationResource] = createResource(locale, async (lang) => {
    const data = await fetchLocaleData(lang);
    setTranslations(prev => ({...prev, [lang]: data}));
    return data;
  });
   
  const translate = (key, params) => {
    const currentLocale = locale();
    const localeData = translations[currentLocale] || translationResource();
    const val = deepReadObject(localeData, key);
    if (typeof val === 'function') return val(params);
    if (typeof val === 'string') return template(val, params || {});
    return val;
  };
   
  const actions = {
    add(lang, table) {
      setTranslations(prev => ({
        ...prev,
        [lang]: { ...(prev[lang] || {}), ...table }
      }));
    },
    locale(_lang) {
      if (_lang) {
        setLocale(_lang);
      }
      return locale();
    },
    dict: (lang) => translations[lang],
    clearCache: (lang) => {
      setTranslations(prev => {
        const newTranslations = { ...prev };
        delete newTranslations[lang];
        return newTranslations;
      });
    }
  };
   
  return [translate, actions];
}

export const I18nContext = createContext();

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n: 未找到 I18nContext');
  }
  return context;
}