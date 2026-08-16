import { useState } from 'react'
import { UserRound, LayoutGrid, ShieldCheck } from 'lucide-react'
import { useI18n } from '../i18n/I18nProvider'
import { asset } from '../lib/asset'

const BRAND_NAME = 'SIGNAL PRO'
const LOGO_SRC = asset('/logo.png')

/** زر أيقونة في الهيدر */
function IconButton({ icon: Icon, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="rounded-xl border border-white/[0.09] bg-gradient-to-b from-white/[0.09] to-white/[0.02] p-2.5 text-steel-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] transition-colors active:scale-95 active:text-gold-400"
    >
      <Icon className="h-[18px] w-[18px]" strokeWidth={1.9} />
    </button>
  )
}

/**
 * شعار التطبيق من ‎public/logo.png‎.
 * لو الملف غير موجود تظهر الأيقونة الافتراضية بدل صورة مكسورة،
 * فيعمل التطبيق قبل إضافة الشعار وبعده دون أي تعديل في الكود.
 */
function BrandLogo() {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-gold-500/30 bg-gold-500/[0.08]">
        <ShieldCheck className="h-4 w-4 text-gold-500" strokeWidth={1.9} />
      </span>
    )
  }

  return (
    <img
      src={LOGO_SRC}
      alt={BRAND_NAME}
      width="36"
      height="36"
      draggable="false"
      onError={() => setFailed(true)}
      className="h-9 w-9 shrink-0 rounded-xl object-cover"
    />
  )
}

/**
 * هيدر ثابت أعلى التطبيق.
 * أيقونة في كل زاوية تفتح ديالوجًا عائمًا، والهوية في المنتصف.
 */
export default function Header({ onOpenProfile, onOpenMore }) {
  const { t } = useI18n()

  return (
    <header
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
      /*
        زجاج حقيقي: الخلفية شبه شفّافة فيظهر ما تحتها مموّهًا أثناء التمرير.
        شدّة التمويه تبقى كما كانت — زيادتها تُثقل الرسم على الموبايل
        لأن الهيدر يُعاد رسمه مع كل إطار تمرير.
      */
      className="sticky top-0 z-30 shrink-0 bg-gradient-to-b from-ink-900/65 to-ink-950/45 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.9)] backdrop-blur-xl backdrop-saturate-150"
    >
      {/* حافة علوية فاتحة — انعكاس الضوء على حرف الزجاج */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/[0.09]"
      />

      {/* خيط ذهبي أسفل الهيدر بدل الحدّ الرمادي */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gold-line"
      />

      {/*
        شبكة من ثلاثة أعمدة متساوية بدل justify-between:
        العمود الأوسط يبقى في منتصف الهيدر تمامًا مهما اختلف عرض الزرّين.
      */}
      <div className="grid grid-cols-3 items-center px-4 py-3">
        {/* الزاوية اليمنى: الملف الشخصي */}
        <div className="justify-self-start">
          <IconButton
            icon={UserRound}
            label={t('profileTitle')}
            onClick={onOpenProfile}
          />
        </div>

        {/* الهوية في المنتصف: الشعار ثم الاسم */}
        <div className="flex items-center justify-center gap-2.5">
          <BrandLogo />
          <p className="whitespace-nowrap font-display text-[15px] font-extrabold tracking-[0.22em] text-gold-400">
            {BRAND_NAME}
          </p>
        </div>

        {/* الزاوية اليسرى: المزيد */}
        <div className="justify-self-end">
          <IconButton icon={LayoutGrid} label={t('moreTitle')} onClick={onOpenMore} />
        </div>
      </div>
    </header>
  )
}
