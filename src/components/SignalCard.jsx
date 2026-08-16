import { ArrowUpRight, ArrowDownRight, Clock, Timer } from 'lucide-react'
import { useI18n } from '../i18n/I18nProvider'

/**
 * بطاقة صفقة واحدة — بتخطيطين مختلفين لأن المعروض مختلف:
 *
 *   البثّ  → خطّة دخول: الزوج، الاتجاه، وقت الدخول، المدّة.
 *   السجل → نتيجة منتهية: الزوج، السوق، الاتجاه، رابحة/خاسرة، المؤشّر.
 */
const STATE_STYLES = {
  up: { frame: 'border-win/35 bg-win/10 text-win', pair: 'text-steel-100' },
  down: { frame: 'border-loss/40 bg-white/[0.03] text-steel-300', pair: 'text-steel-100' },
  win: { frame: 'border-win/35 bg-win/10 text-win', pair: 'text-steel-100' },
  loss: { frame: 'border-white/[0.06] bg-white/[0.02] text-steel-500', pair: 'text-steel-400' },
}

/** خانة معلومة واحدة في بطاقة البث: عنوان صغير فوق القيمة */
function InfoCell({ icon: Icon, label, value, tone = 'text-steel-100' }) {
  return (
    <div className="flex flex-1 items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 py-1.5">
      <Icon className="h-3.5 w-3.5 shrink-0 text-gold-500/80" strokeWidth={2} />
      <div className="min-w-0">
        <p className="text-[9px] leading-none text-steel-500">{label}</p>
        <p className={`mt-1 truncate font-mono text-[13px] font-bold leading-none ${tone}`}>
          {value}
        </p>
      </div>
    </div>
  )
}

export default function SignalCard({ trade, timeZone }) {
  const { t, tIndicator } = useI18n()

  const isUp = trade.direction === 'buy' || trade.direction === 'call'
  const DirectionIcon = isUp ? ArrowUpRight : ArrowDownRight

  const isLive = !trade.outcome
  const key = trade.outcome ?? (isUp ? 'up' : 'down')
  const state = STATE_STYLES[key]

  /*
    وقت الدخول بتوقيت الدولة التي اختارها المستخدم.
    أرقام لاتينية دائمًا (en-GB) — الأرقام العربية الهندية تُقرأ ببطء
    في سياق تداول محكوم بالدقيقة.
  */
  const entryTime = trade.entry_at
    ? new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        ...(timeZone ? { timeZone } : {}),
      }).format(new Date(trade.entry_at))
    : null

  /* ===== بطاقة البثّ ===== */
  if (isLive) {
    return (
      <div className="glass-card px-3.5 py-3">
        {/* الزوج والاتجاه */}
        <div className="mb-2.5 flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${state.frame}`}
            >
              <DirectionIcon className="h-4 w-4" strokeWidth={2.2} />
            </span>
            <p
              className={`truncate font-mono text-[15px] font-bold tracking-wide ${state.pair}`}
            >
              {trade.pair}
            </p>
          </div>

          <span
            className={`shrink-0 whitespace-nowrap rounded-lg border px-3 py-1 text-[11px] font-bold ${state.frame}`}
          >
            {t(key)}
          </span>
        </div>

        {/* وقت الدخول والمدّة — كل واحد بعنوانه فلا يختلط أحدهما بالآخر */}
        <div className="flex items-stretch gap-2">
          <InfoCell
            icon={Clock}
            label={t('entryLabel')}
            value={entryTime ?? '—'}
            tone="text-gold-400"
          />
          <InfoCell
            icon={Timer}
            label={t('durationLabel')}
            value={trade.duration_min ? `${trade.duration_min} ${t('minutesShort')}` : '—'}
          />
        </div>
      </div>
    )
  }

  /* ===== بطاقة السجل ===== */
  return (
    <div className="glass-card flex items-center justify-between gap-3 px-3.5 py-3">
      <div className="flex min-w-0 items-center gap-3">
        {/*
          أيقونة الاتجاه تتبع الاتجاه لا النتيجة: أخضر للصعود ورمادي للهبوط.
          ربطها بالنتيجة كان يجعل صفقة بيع رابحة تظهر بسهم هابط أخضر،
          فيقرأ السهم على أنه صعود. النتيجة تبقى في الشارة وحدها.
        */}
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${
            STATE_STYLES[isUp ? 'up' : 'down'].frame
          }`}
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
