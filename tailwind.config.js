/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // لوحة محصورة في ثلاثة ألوان فقط: أسود ← رمادي ← ذهبي
        ink: {
          950: '#030303', // أعمق أسود — خلفية التطبيق
          900: '#0A0A0A', // أسطح أساسية
          800: '#121212', // بطاقات
          700: '#1A1A1A', // بطاقات مرتفعة
          600: '#242424', // حدود بارزة
        },
        steel: {
          500: '#5E5E5E', // نص خافت جدًا
          400: '#8A8A8A', // نص ثانوي
          300: '#B4B4B4', // نص عادي
          200: '#D8D8D8', // نص بارز
          100: '#F2F2F2', // عناوين
        },
        gold: {
          400: '#E0C36B', // ذهب فاتح — نصوص وأيقونات
          500: '#C9A227', // الذهب الأساسي
          600: '#A8871D', // ذهب داكن — تدرّجات وحدود
        },
        // حالة الصفقة داخل نفس اللوحة: الذهب للناجحة والرمادي المطفي للخاسرة
        // اللون الأخضر — الاستثناء الوحيد خارج اللوحة الثلاثية:
        // نقطة البث الحيّ وشارة الصفقة الرابحة. درجة مهدّأة لا نيون.
        win: '#45C463',
        live: '#45C463',
        loss: '#7C7C7C', // رمادي واضح بما يكفي للقراءة على الأسود
      },
      fontFamily: {
        sans: ['Cairo', 'Tajawal', 'Segoe UI', 'Tahoma', 'sans-serif'],
        display: ['Montserrat', 'Cairo', 'sans-serif'],
        mono: ['SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      boxShadow: {
        elite: '0 20px 60px -20px rgba(0,0,0,0.75)',
        gold: '0 0 0 1px rgba(201,162,39,0.35), 0 12px 40px -12px rgba(201,162,39,0.45)',
      },
      backgroundImage: {
        'gold-line':
          'linear-gradient(90deg, transparent, rgba(201,162,39,0.55), transparent)',
      },
      keyframes: {
        // المسار مكرّر مرتين، لذا الإزاحة بمقدار 50% تُعيد التشغيل بدون أي قفزة مرئية
        marquee: {
          '0%': { transform: 'translate3d(0,0,0)' },
          '100%': { transform: 'translate3d(-50%,0,0)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-120%)' },
          '100%': { transform: 'translateX(120%)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
        // الإزاحة داخل الإطارات لأن transform الخاص بالحركة يلغي أي translate خارجي
        beam: {
          '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
          '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        shimmer: 'shimmer 3.2s ease-in-out infinite',
        pulseSoft: 'pulseSoft 2.4s ease-in-out infinite',
        // مدة اللفة = الفترة بين كل صفقة مقفولة والتي تليها
        beam: 'beam 20s linear infinite',
      },
    },
  },
  plugins: [],
}
