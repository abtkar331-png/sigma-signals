import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { KeyRound, Loader2, CheckCircle2 } from 'lucide-react'
import { CONTACT_URL } from '../config'
import { useI18n } from '../i18n/I18nProvider'

/** ترجمة سبب الرفض القادم من قاعدة البيانات */
const REASON_KEY = {
  not_found: 'authInvalid',
  already_used: 'authUsed',
  no_telegram: 'openInTelegram',
}

/**
 * ورقة سفلية (Bottom Sheet) لتفعيل الاشتراك.
 * التحقّق من الرمز واستهلاكه يحدثان داخل قاعدة البيانات في عملية واحدة.
 */
export default function AuthSheet({ open, onClose, onRedeem }) {
  const { t } = useI18n()
  const [code, setCode] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | error | success
  const [errorKey, setErrorKey] = useState('authInvalid')
  const inputRef = useRef(null)

  useEffect(() => {
    if (!open) return

    const onKeyDown = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKeyDown)

    setCode('')
    setStatus('idle')

    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!code.trim() || status === 'loading') return

    setStatus('loading')

    try {
      const result = await onRedeem(code.trim())

      if (result?.ok) {
        setStatus('success')
        setTimeout(onClose, 1800) // إغلاق تلقائي بعد رسالة النجاح
        return
      }

      setErrorKey(REASON_KEY[result?.reason] ?? 'authInvalid')
      setStatus('error')
    } catch {
      setErrorKey('authInvalid')
      setStatus('error')
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <div key="auth-sheet" className="absolute inset-0 z-40 flex items-end">
          {/* الخلفية المعتمة */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink-950/75 backdrop-blur-md"
          />

          {/* الورقة */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-sheet-title"
            initial={{ y: '100%' }}
            animate={{
              y: 0,
              transition: { type: 'spring', stiffness: 380, damping: 36 },
            }}
            /* الخروج بمدة محدّدة حتى يزيل AnimatePresence العنصر فعليًا */
            exit={{ y: '100%', transition: { duration: 0.22, ease: 'easeIn' } }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.4 }}
            onDragEnd={(_, info) => {
              // إغلاق عند السحب لمسافة كافية أو بسرعة عالية
              if (info.offset.y > 110 || info.velocity.y > 600) onClose()
            }}
            className="relative w-full rounded-t-3xl border-t border-white/10 bg-gradient-to-b from-ink-800 to-ink-900 px-5 pb-7 pt-3"
          >
            {/* مقبض السحب */}
            <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-white/15" />

            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-4 text-center"
              >
                <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-win/35 bg-win/10">
                  <CheckCircle2 className="h-7 w-7 text-win" strokeWidth={1.8} />
                </span>
                <h3 className="text-lg font-bold text-steel-100">
                  {t('authSuccess')}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-steel-400">
                  {t('authSuccessNote')}
                </p>
              </motion.div>
            ) : (
              <>
                <div className="mb-5 text-center">
                  <span className="mx-auto mb-3.5 flex h-12 w-12 items-center justify-center rounded-2xl border border-gold-500/30 bg-gold-500/[0.08]">
                    <KeyRound className="h-5 w-5 text-gold-500" strokeWidth={1.8} />
                  </span>
                  <h3
                    id="auth-sheet-title"
                    className="text-lg font-bold text-steel-100"
                  >
                    {t('authTitle')}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-steel-400">
                    {t('authDesc')}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    ref={inputRef}
                    type="text"
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value)
                      if (status === 'error') setStatus('idle')
                    }}
                    placeholder={t('authPlaceholder')}
                    autoComplete="off"
                    autoCapitalize="none"
                    spellCheck="false"
                    dir="ltr"
                    className={[
                      'w-full rounded-xl border bg-ink-900/70 px-4 py-3.5 text-center font-mono text-sm tracking-widest text-steel-100 outline-none transition-colors placeholder:font-sans placeholder:tracking-normal placeholder:text-steel-400/60',
                      status === 'error'
                        ? 'border-loss/60 focus:border-loss'
                        : 'border-white/10 focus:border-gold-500/60',
                    ].join(' ')}
                  />

                  {status === 'error' && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center text-[11px] text-loss"
                    >
                      {t(errorKey)}
                    </motion.p>
                  )}

                  <button
                    type="submit"
                    disabled={!code.trim() || status === 'loading'}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-gold-500/45 bg-gradient-to-b from-gold-500/25 to-gold-600/10 py-3.5 text-sm font-bold text-gold-400 transition-opacity active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {status === 'loading' && (
                      <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.2} />
                    )}
                    {t('confirm')}
                  </button>
                </form>

                <div className="my-4 gold-divider opacity-40" />

                <a
                  href={CONTACT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center text-[11px] leading-relaxed text-steel-300 underline decoration-gold-500/40 underline-offset-4 active:text-gold-400"
                >
                  {t('noCodeContact')}
                </a>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
