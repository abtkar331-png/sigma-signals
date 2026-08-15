import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { useI18n } from '../i18n/I18nProvider'

/**
 * بطاقة صفقة واحدة — تُستخدم في البث المباشر وفي سجل النتائج.
 *
 * ثلاث حالات:
 *   جارية (لا نتيجة بعد) → ذهبي
 *   رابحة → أخضر
 *   خاسرة → رمادي مطفي
 */
const STATE_STYLES = {
  pending: {
    frame: 'border-gold-500/30 bg-gold-500/[0.08] text-gold-400',
    pair: 'text-steel-100',
  },
  win: {
    frame: 'border-win/35 bg-win/10 text-win',
    pair: 'text-steel-100',
  },
  loss: {
    frame: 'border-white/[0.06] bg-white/[0.02] text-steel-500',
    pair: 'text-steel-400',
  },
}

export default function SignalCard({ trade }) {
  const { t, tIndicator } = useI18n()

  const key = trade.outcome ?? 'pending'
  const state = STATE_STYLES[key]
  const isUp = trade.direction === 'buy' || trade.direction === 'call'
  const DirectionIcon = isUp ? ArrowUpRight : ArrowDownRight

  return (
    <div className="glass-card flex items-center justify-between gap-3 px-3.5 py-3">
      {/* جهة البداية: الاتجاه والزوج */}
      <div className="flex min-w-0 items-center gap-3">
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${state.frame}`}
        >
          <DirectionIcon className="h-4 w-4" strokeWidth={2.2} />
        </span>

        <div className="min-w-0">
          <p
            className={`truncate font-mono text-sm font-semibold tracking-wide ${state.pair}`}
          >
            {trade.pair}
          </p>
          <p className="mt-0.5 truncate text-[11px] text-steel-400">
            {/* bdi يعزل الاسم اللاتيني فلا يقلب ترتيب السطر في الاتجاه RTL */}
            <bdi className="font-mono tracking-wide">{t(trade.market)}</bdi>
            {' · '}
            {t(trade.direction)}
          </p>
        </div>
      </div>

      {/* جهة النهاية: الحالة والمؤشّر الذي أعطى الإشارة */}
      <div className="flex shrink-0 flex-col items-end gap-1">
        <span
          className={`whitespace-nowrap rounded-lg border px-2.5 py-1 text-[10px] font-semibold ${state.frame}`}
        >
          {t(key)}
        </span>

        <span className="whitespace-nowrap text-[9px] text-steel-500">
          {tIndicator(trade.indicator)}
        </span>
      </div>
    </div>
  )
}
