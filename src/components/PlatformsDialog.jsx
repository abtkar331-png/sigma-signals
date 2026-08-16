import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { LayoutList, Search, Check, Loader2 } from 'lucide-react'
import Dialog from './Dialog'
import { useI18n } from '../i18n/I18nProvider'
import { CONTACT_URL } from '../config'
import { asset } from '../lib/asset'

const FILTERS = ['all', 'forex', 'binary', 'crypto']

const FILTER_KEY = {
  all: 'allMarkets',
  forex: 'forex',
  binary: 'binary',
  crypto: 'crypto',
}

/** شعار المنصة مع رجوع تلقائي للرمز النصّي إن لم يوجد ملف */
function PlatformLogo({ platform }) {
  const [failed, setFailed] = useState(false)

  if (failed || !platform.logo) {
    return (
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-gold-500/25 bg-gold-500/[0.07] font-mono text-[9px] font-bold text-gold-400">
        {platform.mark}
      </span>
    )
  }

  return (
    <img
      src={asset(platform.logo)}
      alt=""
      loading="lazy"
      draggable="false"
      onError={() => setFailed(true)}
      className="h-8 w-8 shrink-0 rounded-lg object-contain"
    />
  )
}

/**
 * نافذة «اختيار منصتك» — يختار المستخدم المنصة التي يتداول عليها مرّة واحدة،
 * فتُحفظ في حسابه وتظهر محدَّدة في كل مرّة يفتح فيها التطبيق.
 * القائمة كاملة من قاعدة البيانات، فتحديثها لا يحتاج إصدارًا جديدًا للتطبيق.
 */
export default function PlatformsDialog({
  open,
  onClose,
  platforms,
  status,
  selectedId,
  onSelect,
}) {
  const { t } = useI18n()
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()

    const matches = platforms.filter((p) => {
      const marketOk = filter === 'all' || p.market === filter
      const queryOk = !q || p.name.toLowerCase().includes(q)
      return marketOk && queryOk
    })

    // المنصة المختارة تتصدّر القائمة دائمًا فيراها المستخدم فور فتح النافذة
    const chosen = matches.find((p) => p.id === selectedId)
    if (!chosen) return matches

    return [chosen, ...matches.filter((p) => p.id !== selectedId)]
  }, [platforms, filter, query, selectedId])

  const handleSelect = (id) => {
    onSelect?.(id)
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={t('choosePlatform')}
      subtitle={t('choosePlatformSubtitle')}
      icon={LayoutList}
    >
      {/* البحث */}
      <div className="relative mb-3">
        <Search
          className="pointer-events-none absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-steel-500 ltr:left-3.5 rtl:right-3.5"
          strokeWidth={2}
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('searchPlatform')}
          autoComplete="off"
          spellCheck="false"
          className="w-full rounded-xl border border-white/10 bg-ink-900/70 py-3 text-[12px] text-steel-100 outline-none transition-colors placeholder:text-steel-500 focus:border-gold-500/50 ltr:pl-9 ltr:pr-3.5 rtl:pl-3.5 rtl:pr-9"
        />
      </div>

      {/* تصفية حسب السوق */}
      <div className="no-scrollbar -mx-1 mb-3 flex gap-1.5 overflow-x-auto px-1">
        {FILTERS.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setFilter(id)}
            className={[
              'shrink-0 rounded-full border px-3.5 py-1.5 text-[11px] font-semibold transition-colors active:scale-95',
              filter === id
                ? 'border-gold-500/45 bg-gold-500/[0.12] text-gold-400'
                : 'border-white/[0.07] bg-white/[0.03] text-steel-400',
            ].join(' ')}
          >
            {t(FILTER_KEY[id])}
          </button>
        ))}
      </div>

      {status === 'loading' && (
        <div className="flex justify-center py-8">
          <Loader2 className="h-5 w-5 animate-spin text-gold-500/70" strokeWidth={2} />
        </div>
      )}

      {/* القائمة — كل صفّ زر اختيار */}
      <div className="space-y-2">
        {visible.map((p, i) => {
          const isSelected = selectedId === p.id

          return (
            <motion.button
              key={p.id ?? p.name}
              type="button"
              aria-pressed={isSelected}
              onClick={() => handleSelect(p.id)}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, delay: Math.min(i, 8) * 0.025 }}
              className={[
                'flex w-full items-center gap-3 rounded-xl border px-3.5 py-2.5 text-start transition-colors active:scale-[0.99]',
                isSelected
                  ? 'border-gold-500/50 bg-gold-500/[0.09]'
                  : 'border-white/[0.06] bg-white/[0.02]',
              ].join(' ')}
            >
              <PlatformLogo platform={p} />

              <div className="min-w-0 flex-1">
                <p
                  className={`truncate text-[13px] font-semibold ${
                    isSelected ? 'text-gold-400' : 'text-steel-100'
                  }`}
                >
                  {p.name}
                </p>
                <p className="mt-0.5 text-[10px] text-steel-500">{t(p.market)}</p>
              </div>

              {/* دائرة الاختيار: تمتلئ بالذهبي عند تحديد المنصة */}
              <span
                className={[
                  'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors',
                  isSelected
                    ? 'border-gold-500 bg-gold-500/90'
                    : 'border-white/15 bg-transparent',
                ].join(' ')}
              >
                {isSelected && (
                  <Check className="h-3 w-3 text-ink-950" strokeWidth={3} />
                )}
              </span>
            </motion.button>
          )
        })}
      </div>

      {/* لا نتائج: نوجّه المستخدم للدعم بدل تركه في طريق مسدود */}
      {status !== 'loading' && visible.length === 0 && (
        <div className="py-8 text-center">
          <p className="mb-3 text-[11px] leading-relaxed text-steel-400">
            {t('noPlatformFound')}
          </p>
          <a
            href={CONTACT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg border border-gold-500/40 bg-gold-500/[0.1] px-4 py-2 text-[11px] font-semibold text-gold-400 active:scale-95"
          >
            {t('contactSupport')}
          </a>
        </div>
      )}

      {visible.length > 0 && (
        <p className="mt-4 text-center font-mono text-[10px] text-steel-500">
          {visible.length} {t('platformsCount')}
        </p>
      )}
    </Dialog>
  )
}
