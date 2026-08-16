import {
  LayoutGrid,
  Globe,
  Bell,
  AlertTriangle,
  MessageCircle,
  LayoutList,
  Clock,
} from 'lucide-react'
import Dialog from './Dialog'
import { ListRow } from './ProfileDialog'
import { offsetOf } from '../data/countries'
import { CONTACT_URL, APP_VERSION, BRAND_NAME } from '../config'
import { useI18n } from '../i18n/I18nProvider'
import { LANGUAGES } from '../i18n/translations'

/** مفتاح تبديل بنمط iOS */
function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-10 shrink-0 rounded-full border transition-colors ${
        checked ? 'border-win/40 bg-win/25' : 'border-white/10 bg-white/[0.06]'
      }`}
    >
      <span
        className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full transition-all ${
          checked ? 'left-[18px] bg-win' : 'left-1 bg-steel-400'
        }`}
      />
    </button>
  )
}

/** مجموعة أزرار لاختيار اللغة */
function LanguagePicker({ value, onChange }) {
  return (
    <div className="flex shrink-0 gap-1 rounded-lg border border-white/[0.07] bg-ink-900/60 p-0.5">
      {Object.entries(LANGUAGES).map(([code, { label }]) => (
        <button
          key={code}
          type="button"
          onClick={() => onChange(code)}
          className={`rounded-md px-2.5 py-1 text-[11px] font-semibold transition-colors ${
            value === code
              ? 'bg-gold-500/[0.14] text-gold-400'
              : 'text-steel-400 active:text-steel-200'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

/** ديالوج المزيد — إعدادات فعلية تُحفظ في قاعدة البيانات */
export default function MoreDialog({
  open,
  onClose,
  settings,
  onUpdateSettings,
  onOpenPlatforms,
  selectedPlatform,
  onOpenTimezone,
  selectedCountry,
}) {
  const { t, lang, setLanguage } = useI18n()

  const notifications = settings?.notifications ?? true

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={t('moreTitle')}
      subtitle={t('moreSubtitle')}
      icon={LayoutGrid}
    >
      <div className="glass-card mb-3 divide-y divide-white/[0.05] overflow-hidden">
        <ListRow
          icon={Globe}
          label={t('language')}
          // setLanguage يمرّ أصلًا على updateSettings، فلا نستدعيها مرّتين
          control={<LanguagePicker value={lang} onChange={setLanguage} />}
        />

        <ListRow
          icon={Bell}
          label={t('notifications')}
          control={
            <div className="flex shrink-0 items-center gap-2.5">
              <span className="text-[11px] text-steel-400">
                {notifications ? t('on') : t('off')}
              </span>
              <Toggle
                checked={notifications}
                label={t('notifications')}
                onChange={(next) => onUpdateSettings({ notifications: next })}
              />
            </div>
          }
        />

        <ListRow
          icon={LayoutList}
          label={t('choosePlatform')}
          hint={selectedPlatform?.name ?? t('noPlatformChosen')}
          onClick={() => {
            onClose()
            onOpenPlatforms()
          }}
        />

        <ListRow
          icon={Clock}
          label={t('chooseTimezone')}
          hint={
            selectedCountry
              ? `${selectedCountry.name} · ${offsetOf(selectedCountry.zone)}`
              : t('noTimezoneChosen')
          }
          onClick={() => {
            onClose()
            onOpenTimezone()
          }}
        />

        <ListRow
          icon={MessageCircle}
          label={t('contactSupport')}
          href={CONTACT_URL}
        />
      </div>

      {/* إخلاء المسؤولية — عنصر أساسي لأي منتج مرتبط بالأسواق المالية */}
      <div className="glass-card flex gap-3 p-4">
        <AlertTriangle
          className="mt-0.5 h-4 w-4 shrink-0 text-gold-500/80"
          strokeWidth={1.8}
        />
        <p className="text-[10px] leading-relaxed text-steel-400">
          {t('disclaimer')}
        </p>
      </div>

      <p className="mt-4 text-center font-mono text-[10px] tracking-[0.2em] text-steel-400/50">
        {BRAND_NAME} v{APP_VERSION}
      </p>
    </Dialog>
  )
}
