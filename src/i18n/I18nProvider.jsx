import { createContext, useCallback, useContext, useEffect, useMemo } from 'react'
import { translations, LANGUAGES, INDICATOR_EN } from './translations'

const I18nContext = createContext(null)

/**
 * مزوّد اللغة.
 * اللغة نفسها محفوظة في قاعدة البيانات مع حساب المستخدم،
 * فيجدها كما تركها على أي جهاز يفتح منه التطبيق.
 */
export function I18nProvider({ language = 'ar', onChangeLanguage, children }) {
  const lang = translations[language] ? language : 'ar'

  // ضبط اتجاه الصفحة ولغتها عند كل تغيير
  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = LANGUAGES[lang].dir
  }, [lang])

  const t = useCallback(
    (key) => translations[lang][key] ?? translations.ar[key] ?? key,
    [lang]
  )

  /** اسم المؤشّر الفني بلغة الواجهة */
  const tIndicator = useCallback(
    (name) => (lang === 'en' ? (INDICATOR_EN[name] ?? name) : name),
    [lang]
  )

  const value = useMemo(
    () => ({ lang, dir: LANGUAGES[lang].dir, t, tIndicator, setLanguage: onChangeLanguage }),
    [lang, t, tIndicator, onChangeLanguage]
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n يجب أن يُستخدم داخل I18nProvider')
  return ctx
}
