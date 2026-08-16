import { useState } from 'react'
import { useI18n } from '../i18n/I18nProvider'
import { asset } from '../lib/asset'

/**
 * شعار المنصة: يحاول تحميل ملف PNG من `public/platforms/`،
 * وعند فشل التحميل يعود تلقائيًا إلى الرمز النصّي — فلا تظهر أي مساحة فارغة.
 */
function PlatformLogo({ platform }) {
  const [failed, setFailed] = useState(false)

  if (failed || !platform.logo) {
    return (
      <span className="flex h-6 w-6 items-center justify-center rounded-md border border-gold-500/25 bg-gold-500/[0.07] font-mono text-[8px] font-bold text-gold-400">
        {platform.mark}
      </span>
    )
  }

  return (
    <img
      src={asset(platform.logo)}
      alt=""
      loading="lazy"
      draggable="false"
      onError={() => setFailed(true)}
      className="h-6 w-6 shrink-0 rounded-md object-contain"
    />
  )
}

function PlatformChip({ platform }) {
  return (
    <div className="mx-1.5 flex shrink-0 items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-2">
      <PlatformLogo platform={platform} />
      <span className="whitespace-nowrap text-[11px] font-semibold text-steel-300">
        {platform.name}
      </span>
    </div>
  )
}

/**
 * شريط أفقي لا نهائي.
 * المسار مكرّر مرتين والإزاحة بمقدار -50% بالضبط، فتكون نهاية النسخة الأولى
 * ملاصقة تمامًا لبداية النسخة الثانية — بلا أي فراغ أو قفزة عند إعادة التشغيل.
 */
export default function PlatformsMarquee({ platforms = [] }) {
  const { t } = useI18n()

  // المسار يحتاج نسختين على الأقل ليبدو لا نهائيًا
  const track = [...platforms, ...platforms]

  if (platforms.length === 0) return null

  return (
    <section className="rounded-2xl border border-white/[0.06] bg-white/[0.02] py-3">
      <p className="mb-2.5 px-4 text-center text-[10px] text-steel-400">
        {t('platformsNote')}
      </p>

      {/*
        الحاوية نفسها بالاتجاه LTR وليس المسار فقط.
        في الاتجاه RTL يُثبَّت المسار من حافته اليمنى فيمتدّ لليسار خارج الشاشة،
        فيفرغ الشريط أثناء الحركة. مع LTR يبدأ المسار من الحافة اليسرى ويمتدّ يمينًا،
        فيخرج عنصر من اليسار ويدخل مكانه آخر من اليمين بلا أي فراغ.
      */}
      <div dir="ltr" className="overflow-hidden">
        <div className="flex w-max animate-marquee will-change-transform">
          {track.map((platform, i) => (
            <PlatformChip key={`${platform.id ?? platform.name}-${i}`} platform={platform} />
          ))}
        </div>
      </div>
    </section>
  )
}
