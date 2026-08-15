import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { History } from 'lucide-react'
import Dialog from './Dialog'
import SignalCard from './SignalCard'
import { MARKETS } from '../data/mockData'
import { useI18n } from '../i18n/I18nProvider'

const TAB_IDS = [MARKETS.FOREX, MARKETS.BINARY]

/** ديالوج النتائج مقسّمًا حسب السوق — يعرض نفس الصفقات المعروضة في الصفحة */
export default function ResultsDialog({ open, onClose, trades }) {
  const { t } = useI18n()
  const [tab, setTab] = useState(MARKETS.FOREX)

  const filtered = useMemo(
    () => trades.filter((trade) => trade.market === tab),
    [trades, tab]
  )

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={t('resultsTitle')}
      subtitle={t('resultsSubtitle')}
      icon={History}
    >
      {/* التبويبات مع مؤشّر منزلق */}
      <div className="mb-3 flex gap-1 rounded-xl border border-white/[0.06] bg-ink-900/60 p-1">
        {TAB_IDS.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className="relative flex-1 rounded-lg py-2 text-[11px] font-semibold"
          >
            {tab === id && (
              <motion.span
                layoutId="results-tab"
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                className="absolute inset-0 rounded-lg border border-gold-500/35 bg-gold-500/[0.12]"
              />
            )}
            <span
              className={`relative z-10 ${
                tab === id ? 'text-gold-400' : 'text-steel-400'
              }`}
            >
              {t(id)}
            </span>
          </button>
        ))}
      </div>

      <div className="space-y-2.5">
        {filtered.map((trade, i) => (
          <motion.div
            key={trade.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, delay: Math.min(i, 6) * 0.04 }}
          >
            <SignalCard trade={trade} />
          </motion.div>
        ))}
      </div>

      <p className="mt-4 text-center text-[10px] leading-relaxed text-steel-400/70">
        {t('demoDataNote')}
      </p>
    </Dialog>
  )
}
