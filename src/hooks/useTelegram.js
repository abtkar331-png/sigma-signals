import { useEffect, useState } from 'react'

/**
 * ربط خفيف مع Telegram WebApp SDK.
 * يعمل التطبيق بشكل طبيعي في المتصفح العادي إذا لم يكن SDK متاحًا.
 */
export function useTelegram() {
  const [tg, setTg] = useState(null)

  useEffect(() => {
    const app = window?.Telegram?.WebApp
    if (!app) return

    app.ready()
    app.expand()

    // مطابقة ألوان واجهة تيليجرام مع هوية التطبيق
    try {
      app.setHeaderColor?.('#0A0A0A')
      app.setBackgroundColor?.('#030303')
    } catch {
      // بعض إصدارات تيليجرام لا تدعم هذه الدوال — نتجاهل الخطأ بأمان
    }

    setTg(app)
  }, [])

  /** اهتزاز خفيف عند التفاعل (إن كان مدعومًا) */
  const haptic = (style = 'light') => {
    try {
      tg?.HapticFeedback?.impactOccurred?.(style)
    } catch {
      /* غير مدعوم */
    }
  }

  return { tg, haptic, isTelegram: Boolean(tg) }
}
