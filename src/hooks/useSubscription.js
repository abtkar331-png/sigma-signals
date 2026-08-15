import { useEffect, useState } from 'react'

const TICK_MS = 30000

/**
 * هل الاشتراك فعّال الآن؟
 *
 * لا نكتفي بقيمة العمود في قاعدة البيانات: مهمّة الإنهاء الدورية تعمل كل
 * دقيقة، فقد تمرّ ثوانٍ بين لحظة الانتهاء الفعلية وتحديث العمود. المقارنة
 * بتاريخ الانتهاء هنا تجعل التمويه يعود في اللحظة الصحيحة تمامًا.
 */
export function useSubscription(profile) {
  const [, tick] = useState(0)

  // إعادة التقييم دوريًا حتى ينتهي الاشتراك أمام المستخدم دون إعادة تحميل
  useEffect(() => {
    const timer = setInterval(() => tick((n) => n + 1), TICK_MS)
    return () => clearInterval(timer)
  }, [])

  if (!profile) return { isSubscribed: false, expiresAt: null }

  const expiresAt = profile.subscription_expires
    ? new Date(profile.subscription_expires)
    : null

  const isSubscribed =
    profile.subscription === 'active' && (!expiresAt || expiresAt > new Date())

  return { isSubscribed, expiresAt }
}
