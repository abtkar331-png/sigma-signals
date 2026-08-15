import { Loader2, WifiOff } from 'lucide-react'
import { useI18n } from '../i18n/I18nProvider'

/**
 * حالة القائمة حين لا توجد بطاقات لعرضها.
 * بدونها يظهر صندوق فارغ بلا تفسير إذا تأخّر الخادم أو تعذّر الاتصال،
 * فيبدو التطبيق معطّلًا.
 */
export default function FeedState({ status, onRetry }) {
  const { t } = useI18n()

  if (status === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center gap-2.5 py-10">
        <Loader2 className="h-5 w-5 animate-spin text-gold-500/70" strokeWidth={2} />
        <p className="text-[11px] text-steel-400">{t('loadingTrades')}</p>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-10">
        <WifiOff className="h-5 w-5 text-steel-500" strokeWidth={1.9} />
        <p className="text-[11px] text-steel-400">{t('loadError')}</p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="rounded-lg border border-gold-500/40 bg-gold-500/[0.1] px-4 py-1.5 text-[11px] font-semibold text-gold-400 active:scale-95"
          >
            {t('retry')}
          </button>
        )}
      </div>
    )
  }

  return (
    <p className="py-10 text-center text-[11px] text-steel-400">{t('noTrades')}</p>
  )
}
