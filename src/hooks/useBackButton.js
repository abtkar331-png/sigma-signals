import { useEffect } from 'react'

/**
 * ربط زر الرجوع الأصلي في تيليجرام بإغلاق النافذة المفتوحة.
 *
 * بدون هذا الربط يخرج المستخدم من التطبيق بالكامل عند الضغط على «رجوع»
 * وهو يقصد إغلاق النافذة فقط — وهو أكثر سلوك يبدو مكسورًا في Mini Apps.
 *
 * @param {object|null} tg كائن Telegram.WebApp
 * @param {boolean} visible هل توجد نافذة مفتوحة الآن؟
 * @param {() => void} onBack ما يُنفَّذ عند الضغط
 */
export function useBackButton(tg, visible, onBack) {
  useEffect(() => {
    const button = tg?.BackButton
    if (!button) return

    if (!visible) {
      button.hide?.()
      return
    }

    button.show?.()
    button.onClick?.(onBack)

    return () => {
      button.offClick?.(onBack)
      button.hide?.()
    }
  }, [tg, visible, onBack])
}
