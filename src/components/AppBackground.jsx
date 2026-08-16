/**
 * خلفية التطبيق — أربع طبقات CSS/SVG خالصة بلا أي صور:
 *   ١) قاعدة سوداء بتدرّج رمادي خفيف
 *   ٢) شبكة رفيعة تحاكي شبكة شارت التداول
 *   ٣) هالة ذهبية خافتة أعلى الشاشة
 *   ٤) خط أسعار صاعد باهت أسفل الشاشة + تعتيم الحواف
 * كلها ثابتة وغير تفاعلية، فلا تؤثر على الأداء أو اللمس.
 */
export default function AppBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* ١) القاعدة */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#141414_0%,_#0A0A0A_45%,_#030303_100%)]" />

      {/* ٢) شبكة الشارت */}
      <div className="absolute inset-0 opacity-[0.5] [background-image:linear-gradient(rgba(255,255,255,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.022)_1px,transparent_1px)] [background-size:48px_48px]" />

      {/* شبكة أدقّ داخل كل مربّع لعمق أكبر */}
      <div className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] [background-size:12px_12px]" />

      {/* ٣) هالة ذهبية أعلى الشاشة */}
      <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-gold-500/[0.06] blur-[90px]" />

      {/* ٤) خط أسعار صاعد باهت أسفل الشاشة */}
      <svg
        className="absolute inset-x-0 bottom-0 h-2/5 w-full"
        viewBox="0 0 400 200"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="bg-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#C9A227" stopOpacity="0" />
            <stop offset="50%" stopColor="#C9A227" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#C9A227" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="bg-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C9A227" stopOpacity="0.07" />
            <stop offset="100%" stopColor="#C9A227" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* المساحة أسفل الخط */}
        <path
          d="M0 150 L40 138 L80 156 L120 120 L160 132 L200 96 L240 108 L280 74 L320 86 L360 52 L400 62 L400 200 L0 200 Z"
          fill="url(#bg-fill)"
        />

        {/* الخط نفسه */}
        <path
          d="M0 150 L40 138 L80 156 L120 120 L160 132 L200 96 L240 108 L280 74 L320 86 L360 52 L400 62"
          stroke="url(#bg-line)"
          strokeWidth="1.5"
          strokeLinejoin="round"
          opacity="0.55"
        />
      </svg>

      {/* تعتيم الحواف (Vignette) لتركيز النظر في المنتصف */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_45%,_rgba(0,0,0,0.55)_100%)]" />
    </div>
  )
}
