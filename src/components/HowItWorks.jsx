import { motion } from 'framer-motion'
import { Database, LineChart, Filter, Send } from 'lucide-react'
import { useI18n } from '../i18n/I18nProvider'

const STEPS = [
  { icon: Database, title: 'step1Title', text: 'step1Text' },
  { icon: LineChart, title: 'step2Title', text: 'step2Text' },
  { icon: Filter, title: 'step3Title', text: 'step3Text' },
  { icon: Send, title: 'step4Title', text: 'step4Text' },
]

/** مربّع تعريفي: كيف يحلّل النظام السوق ويستخرج الصفقات */
export default function HowItWorks() {
  const { t } = useI18n()

  return (
    <section className="px-4">
      <div className="relative overflow-hidden rounded-2xl border border-gold-500/20 bg-gradient-to-bl from-ink-800/90 to-ink-900/90 p-5">
        {/* هالة ذهبية خافتة */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-12 -top-12 h-32 w-32 rounded-full bg-gold-500/[0.08] blur-2xl"
        />

        <header className="relative mb-5">
          <p className="mb-1 text-[10px] font-semibold tracking-[0.2em] text-gold-500">
            {t('howItWorksEyebrow')}
          </p>
          <h2 className="text-base font-bold text-steel-100">
            {t('howItWorksTitle')}
          </h2>
        </header>

        {/* الخطوات على خط زمني رأسي */}
        <ol className="relative space-y-4">
          {/* الخط الواصل بين الخطوات — يتبع اتجاه الصفحة */}
          <span
            aria-hidden
            className="absolute bottom-4 top-4 w-px bg-gradient-to-b from-gold-500/35 via-gold-500/20 to-transparent ltr:left-[15px] rtl:right-[15px]"
          />

          {STEPS.map((step, i) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, x: 14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex gap-3.5"
            >
              <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold-500/30 bg-ink-900">
                <step.icon className="h-3.5 w-3.5 text-gold-500" strokeWidth={1.9} />
              </span>

              <div className="min-w-0 pt-0.5">
                <p className="mb-1 text-[13px] font-bold text-steel-100">
                  {t(step.title)}
                </p>
                <p className="text-[11px] leading-relaxed text-steel-400">
                  {t(step.text)}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>

        <p className="relative mt-5 border-t border-white/[0.06] pt-4 text-[10px] leading-relaxed text-steel-400/80">
          {t('howItWorksNote')}
        </p>
      </div>
    </section>
  )
}
