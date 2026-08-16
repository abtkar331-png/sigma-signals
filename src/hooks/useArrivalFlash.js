import { useEffect, useRef, useState } from 'react'

/**
 * وميض قصير عند دخول عنصر جديد إلى القائمة.
 *
 * المقارنة على مجموعة المعرّفات كاملة لا على أوّلها: قائمة البثّ مرتّبة
 * بوقت الدخول، فقد تدخل إشارة جديدة في وسط القائمة أو آخرها، ومراقبة
 * العنصر الأول وحده كانت ستفوّتها.
 *
 * أول تعبئة لا تُعدّ وصولًا — وإلا ومض الإطار بمجرّد فتح التطبيق.
 *
 * @param idsKey معرّفات العناصر مفصولة بفواصل، فيبقى المُدخل ثابتًا بين
 *               عمليات الرسم ولا يُعاد تشغيل التأثير بلا داعٍ.
 */
export function useArrivalFlash(idsKey, duration = 1000) {
  const seen = useRef(null)
  const [flash, setFlash] = useState(false)

  useEffect(() => {
    if (!idsKey) return

    const ids = idsKey.split(',')

    if (seen.current === null) {
      seen.current = new Set(ids)
      return
    }

    const hasNew = ids.some((id) => !seen.current.has(id))
    seen.current = new Set(ids)

    if (!hasNew) return

    setFlash(true)
    const timer = setTimeout(() => setFlash(false), duration)
    return () => clearTimeout(timer)
  }, [idsKey, duration])

  return flash
}
