import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useI18n } from '../i18n/I18nProvider'

/**
 * ديالوج عائم موحّد — تُبنى عليه كل النوافذ في التطبيق.
 * يظهر في منتصف الشاشة مع خلفية ضبابية، ويُغلق بالنقر خارجه أو بمفتاح Escape.
 */
export default function Dialog({ open, onClose, title, subtitle, icon: Icon, children }) {
  const { t } = useI18n()

  useEffect(() => {
    if (!open) return

    const onKeyDown = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKeyDown)

    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <div key="dialog" className="absolute inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink-950/80 backdrop-blur-md"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              transition: { type: 'spring', stiffness: 420, damping: 34 },
            }}
            /*
              الخروج بحركة tween محدّدة المدة وليس spring:
              الـ spring يتقارب من غير ما "ينتهي" رسميًا، فلا يزيل AnimatePresence
              العنصر من الصفحة، فتبقى طبقة شفافة تبتلع كل اللمسات.
            */
            exit={{ opacity: 0, scale: 0.97, y: 8, transition: { duration: 0.18 } }}
            className="relative flex max-h-[82%] w-full max-w-sm flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-ink-800 to-ink-900 shadow-elite"
          >
            {/* خط ذهبي علوي */}
            <div aria-hidden className="absolute inset-x-10 top-0 h-px bg-gold-line" />

            <header className="flex shrink-0 items-start gap-3 p-5 pb-4">
              {Icon && (
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gold-500/30 bg-gold-500/[0.08]">
                  <Icon className="h-4 w-4 text-gold-500" strokeWidth={1.9} />
                </span>
              )}

              <div className="min-w-0 flex-1">
                <h2 className="text-base font-bold text-steel-100">{title}</h2>
                {subtitle && (
                  <p className="mt-0.5 text-[11px] text-steel-400">{subtitle}</p>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label={t('close')}
                className="shrink-0 rounded-lg p-1.5 text-steel-400 active:bg-white/5"
              >
                <X className="h-4 w-4" strokeWidth={2} />
              </button>
            </header>

            {/* المحتوى القابل للتمرير */}
            <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-5">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
