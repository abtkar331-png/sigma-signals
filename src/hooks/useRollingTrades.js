import { useEffect, useState } from 'react'
import {
  createInitialTrades,
  generateTrade,
  RESULTS_SIZE,
  TARGET_WINS,
} from '../data/mockData'

/**
 * وضع احتياطي فقط: قائمة صفقات محلية متجدّدة تعمل حين لا تكون
 * متغيّرات Supabase مضبوطة، حتى يظل التطبيق قابلًا للتشغيل أثناء التطوير.
 * عند تفعيل Supabase تصبح البيانات من قاعدة البيانات وتتوقّف هذه المؤقّتات.
 *
 * @param {number} intervalMs الفترة بين كل صفقة والتي تليها
 * @param {boolean} enabled هل يعمل الوضع الاحتياطي؟
 */
export function useRollingTrades(intervalMs, enabled) {
  const [trades, setTrades] = useState(() => (enabled ? createInitialTrades() : []))

  useEffect(() => {
    if (!enabled) return

    const timer = setInterval(() => {
      setTrades((prev) => {
        const kept = prev.slice(0, RESULTS_SIZE - 1) // حذف الأقدم
        const wins = kept.filter((t) => t.outcome === 'win').length
        const outcome = wins < TARGET_WINS ? 'win' : 'loss'

        return [generateTrade(outcome), ...kept]
      })
    }, intervalMs)

    return () => clearInterval(timer)
  }, [intervalMs, enabled])

  return trades
}
