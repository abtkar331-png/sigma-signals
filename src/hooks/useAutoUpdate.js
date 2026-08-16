import { useEffect, useRef } from 'react'
import { asset } from '../lib/asset'

const CHECK_INTERVAL_MS = 120000

/**
 * تحديث ذاتي للتطبيق.
 *
 * ملف ‎version.json‎ يُكتب مع كل نشر ويحمل بصمة البناء، والتطبيق يقارنها
 * ببصمته المحقونة وقت بنائه. عند الاختلاف يُعاد التحميل — فلا يحتاج
 * المستخدم لمسح ذاكرة تيليجرام بعد كل إصدار.
 *
 * توقيت إعادة التحميل مقصود: تحدث والصفحة مخفيّة، أو لحظة عودة المستخدم
 * إليها. إعادة التحميل تحت يده وهو يقرأ إشارة تُفقده مكانه بلا سبب.
 */
export function useAutoUpdate() {
  const pending = useRef(false)

  useEffect(() => {
    let cancelled = false

    const check = async () => {
      try {
        // الاستعلام العشوائي يتخطّى ذاكرة الشبكة الوسيطة فيصل الملف طازجًا
        const res = await fetch(`${asset('/version.json')}?t=${Date.now()}`, {
          cache: 'no-store',
        })
        if (!res.ok) return

        const { build } = await res.json()
        if (cancelled || !build || build === __BUILD_ID__) return

        pending.current = true
        if (document.visibilityState === 'hidden') location.reload()
      } catch {
        // الشبكة متقطّعة — المحاولة التالية تكفي
      }
    }

    const onVisibilityChange = () => {
      if (document.visibilityState !== 'visible') return
      if (pending.current) location.reload()
      else check()
    }

    check()
    const timer = setInterval(check, CHECK_INTERVAL_MS)
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      cancelled = true
      clearInterval(timer)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [])
}
