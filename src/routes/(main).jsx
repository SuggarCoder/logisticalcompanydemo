import { detectBrowserLanguage, DEFAULT_LANGUAGE } from '~/i18n';
import { createResource, Show } from "solid-js";
import { I18nContext, createI18nContext } from '~/libs/i18n';
import Nav from '~/components/Nav';
import Footer from '~/components/Footer';
import { SmoothScrollbar } from "~/components/SmoothScrollbar";

async function fetchTranslations() {
    // Detect browser language on the client side
    const lang = typeof window !== 'undefined' 
    ? detectBrowserLanguage() 
    : DEFAULT_LANGUAGE;

    try {
        const translations = await import(`~/i18n/locales/${lang}.json`)
          .then(m => m.default);
        
        return { lang, translations };
      } catch (error) {
        console.error('Failed to load translations', error);
        const fallbackTranslations = await import(`~/i18n/locales/${DEFAULT_LANGUAGE}.json`)
          .then(m => m.default);
        
        return { lang: DEFAULT_LANGUAGE, translations: fallbackTranslations };
      }
}

export default function MainPage(props) {
  const [data] = createResource(fetchTranslations);

  return (
    <Show when={data()} fallback={<div>Loading translations...</div>}>
      {data => {
        const [translate, actions] = createI18nContext(
          data().lang,
          { [data().lang]: data().translations }
        );
        return (
          <I18nContext.Provider value={[translate, actions]}>
            <SmoothScrollbar>
              {/* <Nav /> */}
                {props.children}
              <Footer />
            </SmoothScrollbar>
          </I18nContext.Provider>
        );
      }}
    </Show>
  );
}