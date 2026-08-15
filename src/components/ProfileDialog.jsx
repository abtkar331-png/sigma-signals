import { UserRound, KeyRound, MessageCircle, ChevronLeft, Loader2 } from 'lucide-react'
import Dialog from './Dialog'
import { CONTACT_URL } from '../config'
import { useI18n } from '../i18n/I18nProvider'

/** صف قابل للنقر بنمط قوائم الإعدادات */
export function ListRow({ icon: Icon, label, hint, onClick, href, control }) {
  const Tag = control ? 'div' : href ? 'a' : 'button'
  const props = control
    ? {}
    : href
      ? { href, target: '_blank', rel: 'noopener noreferrer' }
      : { type: 'button', onClick }

  return (
    <Tag
      {...props}
      className={`flex w-full items-center gap-3 px-4 py-3.5 text-start ${
        control ? '' : 'active:bg-white/[0.04]'
      }`}
    >
      <Icon className="h-4 w-4 shrink-0 text-gold-500/85" strokeWidth={1.9} />
      <span className="flex-1 text-[13px] text-steel-200">{label}</span>

      {control ?? (
        <>
          {hint && <span className="text-[11px] text-steel-400">{hint}</span>}
          <ChevronLeft
            className="h-4 w-4 shrink-0 text-steel-400/60 ltr:rotate-180"
            strokeWidth={2}
          />
        </>
      )}
    </Tag>
  )
}

const STATUS_KEY = {
  active: 'statusActive',
  inactive: 'statusInactive',
  expired: 'statusExpired',
}

/** ديالوج الملف الشخصي — يعرض حساب تيليجرام الحقيقي بعد التحقّق منه */
export default function ProfileDialog({ open, onClose, onOpenAuth, profile, state }) {
  const { t, lang } = useI18n()

  const fullName =
    [profile?.first_name, profile?.last_name].filter(Boolean).join(' ') ||
    t('guestName')

  const status = profile?.subscription ?? 'inactive'
  const isActive = status === 'active'

  const joined = profile?.created_at
    ? new Intl.DateTimeFormat(lang === 'ar' ? 'ar-EG' : 'en-GB', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).format(new Date(profile.created_at))
    : null

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={t('profileTitle')}
      subtitle={t('profileSubtitle')}
      icon={UserRound}
    >
      {/* بطاقة المستخدم */}
      <div className="glass-card mb-3 flex items-center gap-3.5 p-4">
        {profile?.photo_url ? (
          <img
            src={profile.photo_url}
            alt=""
            className="h-12 w-12 shrink-0 rounded-2xl object-cover"
          />
        ) : (
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-gold-500/25 bg-gold-500/[0.08]">
            {state === 'loading' ? (
              <Loader2
                className="h-5 w-5 animate-spin text-gold-500"
                strokeWidth={1.8}
              />
            ) : (
              <UserRound className="h-5 w-5 text-gold-500" strokeWidth={1.8} />
            )}
          </span>
        )}

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-steel-100">{fullName}</p>

          {profile?.username && (
            <p className="mt-0.5 truncate font-mono text-[11px] text-steel-400">
              @{profile.username}
            </p>
          )}

          <p className="mt-1 text-[11px] text-steel-400">
            {t('status')}:{' '}
            <span className={isActive ? 'text-win' : 'text-loss'}>
              {t(STATUS_KEY[status])}
            </span>
          </p>
        </div>
      </div>

      {/* تفاصيل الحساب — تظهر فقط عند وجود حساب مُتحقَّق منه */}
      {profile ? (
        <div className="glass-card mb-3 divide-y divide-white/[0.05] overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-[11px] text-steel-400">{t('accountId')}</span>
            <span className="font-mono text-[12px] text-steel-200">
              {profile.telegram_id}
            </span>
          </div>

          {joined && (
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-[11px] text-steel-400">{t('memberSince')}</span>
              <span className="text-[12px] text-steel-200">{joined}</span>
            </div>
          )}

          {isActive && profile.subscription_expires && (
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-[11px] text-steel-400">
                {t('subscriptionUntil')}
              </span>
              <span className="text-[12px] text-steel-200">
                {new Intl.DateTimeFormat(lang === 'ar' ? 'ar-EG' : 'en-GB').format(
                  new Date(profile.subscription_expires)
                )}
              </span>
            </div>
          )}
        </div>
      ) : (
        state !== 'loading' && (
          <p className="mb-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-center text-[11px] leading-relaxed text-steel-400">
            {t('openInTelegram')}
          </p>
        )
      )}

      <div className="glass-card divide-y divide-white/[0.05] overflow-hidden">
        <ListRow
          icon={KeyRound}
          label={t('enterCode')}
          onClick={() => {
            onClose()
            onOpenAuth()
          }}
        />
        <ListRow
          icon={MessageCircle}
          label={t('contactSupport')}
          href={CONTACT_URL}
        />
      </div>
    </Dialog>
  )
}
