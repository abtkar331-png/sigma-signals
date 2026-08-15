import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  /*
    التطبيق يُنشر على GitHub Pages داخل مجلد فرعي باسم المستودع.
    يُمرَّر المسار من متغيّر البيئة وقت البناء، فيبقى الجذر `/` أثناء التطوير
    المحلي وعند النشر على نطاق خاص لاحقًا دون تعديل الملف.
  */
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [react()],
  server: {
    host: true, // مطلوب لتجربة التطبيق على الهاتف عبر الشبكة المحلية
    port: 5173,
  },
  build: {
    rollupOptions: {
      output: {
        // فصل المكتبات عن كود التطبيق: تعديل الواجهة لا يُبطل كاش المكتبات
        manualChunks: {
          react: ['react', 'react-dom'],
          motion: ['framer-motion'],
          supabase: ['@supabase/supabase-js'],
        },
      },
    },
  },
})
