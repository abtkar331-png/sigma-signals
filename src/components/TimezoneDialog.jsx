import { useMemo, useState } from 'react'
import { Clock, Search, Check } from 'lucide-react'
import Dialog from './Dialog'
import { useI18n } from '../i18n/I18nProvider'
import { COUNTRIES, flagOf, flagSrc, offsetOf, timeIn } from '../data/countries'

/** علم الدولة صورة، ويعود إلى رمز Emoji إن تعذّر تحميلها */
function Flag({ code }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span className="flex h-7 w-9 shrink-0 items-center justify-center rounded-md border border-white/[0.07] bg-white/[0.03] font-mono text-[10px] font-bold leading-none text-steel-300">
        {flagOf(code)}
      </span>
    )
  }

  return (
    <img
      src={flagSrc(code)}
      alt=""
      loading="lazy"
      draggable="false"
      onError={() => setFailed(true)}
      className="h-7 w-9 shrink-0 rounded-md border border-white/[0.07] object-cover"
    />
  )
}

/**
 * نافذة «اختيار التوقيت» — يختار المستخدم دولته فتُضبط المنطقة الزمنية عليها.
 * أسماء الدول والبحث بالإنجليزية، والمحفوظ في الحساب هو رمز الدولة فقط.
 */
export default function TimezoneDialog({ open, onClose, selectedCode, onSelect }) {
  const { t } = useI18n()
  const [query, setQuery] = useState('')

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()

    // البحث بالاسم أو برمز الدولة — كلاهما بالإنجليزية
    const matches = q
      ? COUNTRIES.filter(
          (c) => c.name.toLowerCase().includes(q) || c.code.toLowerCase() === q
        )
      : COUNTRIES

    // الدولة المختارة تتصدّر القائمة دائمًا فيراها المستخدم بلا بحث أو تمرير
    const chosen = matches.find((c) => c.code === selectedCode)
    if (!chosen) return matches

    return [chosen, ...matches.filter((c) => c.code !== selectedCode)]
  }, [query, selectedCode])

  const handleSelect = (code) => {
    onSelect?.(code)
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={t('chooseTimezone')}
      subtitle={t('chooseTimezoneSubtitle')}
      icon={Clock}
    >
      {/* البحث — بالإنجليزية لأن كل الأسماء إنجليزية */}
      <div className="relative mb-3">
        <Search
          className="pointer-events-none absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-steel-500 ltr:left-3.5 rtl:right-3.5"
          strokeWidth={2}
        />
        <input
          type="text"
          dir="ltr"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('searchCountry')}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck="false"
          className="w-full rounded-xl border border-white/10 bg-ink-900/70 py-3 pl-9 pr-3.5 text-start text-[12px] text-steel-100 outline-none transition-colors placeholder:text-steel-500 focus:border-gold-500/50"
        />
      </div>

      {/*
        قائمة طويلة (أكثر من مئتي دولة): بلا حركة لكل صفّ وبلا ظلال،
        لأن تحريك مئتي عنصر معًا يُثقل الجهاز ويوقف التمرير.
      */}
      <div className="space-y-2" style={{ contain: 'content' }}>
        {visible.map((c) => {
          const isSelected = selectedCode === c.code

          return (
            <button
              key={c.code}
              type="button"
              aria-pressed={isSelected}
              onClick={() => handleSelect(c.code)}
              className={[
                'flex w-full items-center gap-3 rounded-xl border px-3.5 py-2.5 text-start transition-colors active:scale-[0.99]',
                isSelected
                  ? 'border-gold-500/50 bg-gold-500/[0.09]'
                  : 'border-white/[0.06] bg-white/[0.02]',
              ].join(' ')}
            >
              <Flag code={c.code} />

              <div className="min-w-0 flex-1" dir="ltr">
                <p
                  className={`truncate text-start text-[13px] font-semibold ${
                    isSelected ? 'text-gold-400' : 'text-steel-100'
                  }`}
                >
                  {c.name}
                </p>
                <p className="mt-0.5 text-start font-mono text-[10px] text-steel-500">
                  {offsetOf(c.zone)} · {timeIn(c.zone)}
                </p>
              </div>

              <span
                className={[
                  'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors',
                  isSelected
                    ? 'border-gold-500 bg-gold-500/90'
                    : 'border-white/15 bg-transparent',
                ].join(' ')}
              >
                {isSelected && <Check className="h-3 w-3 text-ink-950" strokeWidth={3} />}
              </span>
            </button>
          )
        })}
      </div>

      {visible.length === 0 && (
        <p className="py-8 text-center text-[11px] text-steel-400">
          {t('noCountryFound')}
        </p>
      )}

      {visible.length > 0 && (
        <p className="mt-4 text-center font-mono text-[10px] text-steel-500">
          {visible.length} {t('countriesCount')}
        </p>
      )}
    </Dialog>
  )
}
