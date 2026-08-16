import { motion, AnimatePresence } from 'framer-motion'
import { Lock, DollarSign } from 'lucide-react'
import SignalCard from './SignalCard'
import { useI18n } from '../i18n/I18nProvider'
import FeedState from './FeedState'
import { CONTACT_URL } from '../config'
import { useArrivalFlash } from '../hooks/useArrivalFlash'


/** نقطة خضراء نابضة مع هالة خفيفة حولها */
function LiveDot() {
  return (
    <span className="relative flex h-2 w-2 shrink-0">
      <span className="absolute inset-0 rounded-full bg-live/40 blur-[3px]" />
      <span className="relative h-2 w-2 rounded-full bg-live animate-pulseSoft" />
    </span>
  )
}

/**
 * قسم الإشارات المباشرة — القائمة مموّهة حتى تفعيل الاشتراك.
 * الصفقات تأتي جاهزة من قاعدة البيانات، فيرى كل المستخدمين نفس الإشارات.
 */
export default function LiveSignals({
  signals,
  status,
  cycleKey,
  unlocked,
  onUnlock,
  timeZone,
}) {
  const { t } = useI18n()

  // وميض أخضر على حواف الإطار لحظة وصول إشارة جديدة
  const flash = useArrivalFlash(signals.map((s) => s.id).join(','))

  return (
    <section className="px-4">
      {/* شريط حالة البث — النص في المنتصف بين نقطتين نابضتين */}
      <div className="mb-2.5 flex items-center justify-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.03] px-3.5 py-2.5">
        <LiveDot />
        <span className="text-center text-[11px] font-semibold text-steel-200">
          {t('analyzing')}
        </span>
        <LiveDot />
      </div>

      {/*
        إطار خارجي بسماكة بكسل واحد يكشف شعاعًا ذهبيًا يدور خلفه.
        مدّة اللفة ٢٠ ثانية — نفس الفترة بين كل صفقة مقفولة والتي تليها —
        و‎cycleKey‎ يحمل معرّف أحدث صفقة مقفولة، فتُعاد الحركة من الصفر لحظة
        وصول صفقة جديدة، وبذلك تكتمل اللفة تمامًا مع ظهورها في السجل.
      */}
      <div className="relative overflow-hidden rounded-2xl p-px">
        <span
          key={cycleKey}
          aria-hidden
          /*
            العرض ٢٠٠٪ ضروري: المربّع الدوّار يجب أن يتجاوز قطر البطاقة
            وإلا انقطع الشعاع عند الأركان أثناء اللفّة.
            بلا will-change — حركات transform مركّبة أصلًا على GPU،
            وفرضه يُثبّت طبقة كبيرة تُعاد رسمتها بلا داعٍ.
          */
          className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[200%] animate-beam bg-[conic-gradient(from_0deg,transparent_0%,transparent_66%,rgba(201,162,39,0.25)_82%,rgba(201,162,39,0.7)_92%,#E0C36B_97%,#FFF3CF_99%,transparent_100%)]"
        />

        {/* المحتوى معتم بالكامل حتى لا يظهر الشعاع إلا عند الحافة */}
        <div
          className={[
            'relative overflow-hidden rounded-2xl border bg-ink-900 p-3',
            'transition-[border-color,box-shadow] duration-500',
            flash
              ? 'border-win/55 shadow-[0_0_18px_-2px_rgba(69,196,99,0.45)]'
              : 'border-white/[0.06] shadow-none',
          ].join(' ')}
        >
          {/* التمويه يُرفع فور تفعيل الاشتراك ويعود تلقائيًا عند انتهائه */}
          <div
            className={
              unlocked
                ? 'space-y-2.5'
                : 'space-y-2.5 blur-[7px] saturate-[0.85] select-none'
            }
            aria-hidden={!unlocked}
          >
            {/* popLayout — نفس السبب: إزالة البطاقة القديمة فعليًا من الصفحة */}
            {signals.length === 0 && <FeedState status={status} />}
            <AnimatePresence initial={false} mode="popLayout">
              {signals.map((signal) => (
                <motion.div
                  key={signal.id}
                  layout
                  initial={{ opacity: 0, y: -20, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <SignalCard trade={signal} timeZone={timeZone} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {!unlocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-ink-950/55 px-6 text-center">
            <div className="flex flex-col items-center">
              <span className="mb-3.5 flex h-11 w-11 items-center justify-center rounded-full border border-gold-500/30 bg-ink-900/80">
                <Lock className="h-4 w-4 text-gold-500" strokeWidth={1.8} />
              </span>

              <p className="mb-5 max-w-[15rem] text-xs leading-relaxed text-steel-300">
                {t('lockedNote')}
              </p>

              <button
                type="button"
                onClick={onUnlock}
                className="rounded-xl border border-gold-500/45 bg-gradient-to-b from-gold-500/20 to-gold-600/10 px-8 py-3 text-sm font-bold text-gold-400 shadow-gold active:scale-[0.97]"
              >
                {t('viewTrades')}
              </button>

              {/* مسار من لا يملك رمزًا: يفتح محادثة الدعم مباشرة */}
              <a
                href={CONTACT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] px-3.5 py-2 text-[11px] font-semibold text-steel-300 transition-colors active:scale-95 active:text-gold-400"
              >
                {/* الأيقونة بعد النص في ترتيب العناصر لتظهر يسارَه في الاتجاه RTL */}
                {t('getCode')}
                <DollarSign className="h-3 w-3 text-gold-500" strokeWidth={2.4} />
              </a>
            </div>
          </div>
          )}
        </div>
      </div>
    </section>
  )
}
