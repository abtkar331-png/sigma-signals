import { ArrowUpRight, ArrowDownRight, Clock, Timer } from 'lucide-react'
import { useI18n } from '../i18n/I18nProvider'

/**
 * بطاقة صفقة واحدة — تُستخدم في البث المباشر وفي سجل النتائج.
 *
 * البثّ يعرض خطّة الدخول: الزوج، وقت الدخول، الاتجاه، والمدّة.
 * السجل يعرض النتيجة: رابحة أو خاسرة مع المؤشّر الذي أعطى الإشارة.
 */
const STATE_STYLES = {
  up: {
    frame: 'border-win/35 bg-win/10 text-win',
    pair: 'text-steel-100',
  },
  down: {
    frame: 'border-loss/40 bg-white/[0.03] text-steel-300',
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

export default function SignalCard({ trade, timeZone }) {
  const { t, tIndicator } = useI18n()

  const isUp = trade.direction === 'buy' || trade.direction === 'call'
  const DirectionIcon = isUp ? ArrowUpRight : ArrowDownRight

  // الصفقة المقفولة تُعرض بنتيجتها، والحيّة باتجاهها
  const key = trade.outcome ?? (isUp ? 'up' : 'down')
  const state = STATE_STYLES[key]
  const isLive = !trade.outcome

  /*
    وقت الدخول بتوقيت الدولة التي اختارها المستخدم.
    التنسيق بأرقام لاتينية دائمًا (en-GB) لأن الأرقام العربية الهندية
    تُقرأ بصعوبة في سياق تداول سريع.
  */
  const entryTime = trade.entry_at
    ? new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        ...(timeZone ? { timeZone } : {}),
      }).format(new Date(trade.entry_at))
    : null

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

          <p className="mt-0.5 flex items-center gap-1.5 truncate text-[11px] text-steel-400">
            {/* bdi يعزل الاسم اللاتيني فلا يقلب ترتيب السطر في الاتجاه RTL */}
            <bdi className="font-mono tracking-wide">{t(trade.market)}</bdi>

            {isLive && entryTime && (
              <>
                <span aria-hidden>·</span>
                <Clock className="h-3 w-3 shrink-0" strokeWidth={2} />
                <bdi className="font-mono tracking-wide">{entryTime}</bdi>
              </>
            )}

            {!isLive && (
              <>
                <span aria-hidden>·</span>
                {t(trade.direction)}
              </>
            )}
          </p>
        </div>
      </div>

      {/* جهة النهاية: الاتجاه أو النتيجة، وتحته المدّة أو المؤشّر */}
      <div className="flex shrink-0 flex-col items-end gap-1">
        <span
          className={`whitespace-nowrap rounded-lg border px-2.5 py-1 text-[10px] font-semibold ${state.frame}`}
        >
          {t(key)}
        </span>

        {isLive && trade.duration_min ? (
          <span className="flex items-center gap-1 whitespace-nowrap text-[9px] text-steel-500">
            <Timer className="h-2.5 w-2.5" strokeWidth={2} />
            <bdi className="font-mono">{trade.duration_min}</bdi>
            {t('minutesShort')}
          </span>
        ) : (
          <span className="whitespace-nowrap text-[9px] text-steel-500">
            {tIndicator(trade.indicator)}
          </span>
        )}
      </div>
    </div>
  )
}
