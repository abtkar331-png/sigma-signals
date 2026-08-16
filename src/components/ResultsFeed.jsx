import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronDown } from 'lucide-react'
import SignalCard from './SignalCard'
import { useI18n } from '../i18n/I18nProvider'
import FeedState from './FeedState'
import { useArrivalFlash } from '../hooks/useArrivalFlash'

/**
 * سجل النتائج: عنوان بسيط في المنتصف، ثم حاوية بارتفاع ثابت
 * تُمرَّر داخليًا وتعرض الصفقات العشرين.
 */
export default function ResultsFeed({ trades, status, onRetry, onOpenResults }) {
  const { t } = useI18n()

  // وميض ذهبي على حواف الحاوية عند وصول صفقة جديدة
  const flash = useArrivalFlash(trades.map((t) => t.id).join(','))

  return (
    <section className="px-4">
      {/*
        عنوان في المنتصف بين سهمين يشيران للأسفل — إشارة بصرية إلى أن
        النتائج تبدأ من هنا. السهمان مخفيّان عن قارئات الشاشة لأنهما زخرفة.
      */}
      <header className="mb-2.5 flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] px-3.5 py-2.5">
        <ChevronDown
          aria-hidden
          className="h-4 w-4 shrink-0 text-gold-500/70"
          strokeWidth={2}
        />

        <div className="flex-1 text-center">
          <h2 className="text-base font-bold text-steel-100">
            {t('resultsTitle')}
          </h2>
          <p className="mt-1 text-[10px] text-steel-400">
            {t('resultsSubtitle')}
          </p>
        </div>

        <ChevronDown
          aria-hidden
          className="h-4 w-4 shrink-0 text-gold-500/70"
          strokeWidth={2}
        />
      </header>

      {/* الحاوية القابلة للتمرير */}
      <div
        className={[
          'relative rounded-2xl border bg-ink-900/40 p-2.5',
          'transition-[border-color,box-shadow] duration-500',
          flash
            ? 'border-gold-500/60 shadow-[0_0_18px_-2px_rgba(201,162,39,0.5)]'
            : 'border-white/[0.06] shadow-none',
        ].join(' ')}
      >
        {/*
          ارتفاع أقصر: القائمة تُمرَّر داخليًا وتحتوي العشرين صفقة كما هي،
          فالتقليص يوفّر مساحة الصفحة دون إخفاء أي نتيجة.
        */}
        <div className="no-scrollbar max-h-[14rem] space-y-2.5 overflow-y-auto overscroll-contain [contain:content]">
          {trades.length === 0 && <FeedState status={status} onRetry={onRetry} />}
          {/*
            popLayout ضروري مع خاصية layout: يُخرج البطاقة المنتهية من تدفّق
            الصفحة فور بدء اختفائها، فتُزال فعليًا وتبقى القائمة ٢٠ بطاقة بالضبط.
            بدونه تتعارض حركة الترتيب مع حركة الخروج فتبقى بطاقة إضافية عالقة.
          */}
          <AnimatePresence initial={false} mode="popLayout">
            {trades.map((trade) => (
              <motion.div
                key={trade.id}
                layout
                initial={{ opacity: 0, y: -18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <SignalCard trade={trade} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* تلاشي سفلي يوحي بوجود المزيد عند التمرير */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-2.5 bottom-2.5 h-10 rounded-b-xl bg-gradient-to-t from-ink-950 to-transparent"
        />
      </div>

      <button
        type="button"
        onClick={onOpenResults}
        className="mx-auto mt-3 flex items-center gap-0.5 text-[11px] text-steel-400 active:text-gold-400"
      >
        {t('viewByMarket')}
        <ChevronLeft className="h-3.5 w-3.5" strokeWidth={2} />
      </button>
    </section>
  )
}
