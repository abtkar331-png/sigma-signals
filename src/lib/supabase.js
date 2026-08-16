import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

/** هل تم ضبط متغيّرات البيئة؟ لو لا، يعمل التطبيق ببيانات محلية تجريبية. */
export const isSupabaseConfigured = Boolean(url && key)

if (!isSupabaseConfigured) {
  console.warn(
    'متغيّرات Supabase غير مضبوطة — التطبيق يعمل ببيانات تجريبية محلية. ' +
      'انسخ ‎.env.example‎ إلى ‎.env.local‎ واملأ القيم.'
  )
}

export const supabase = isSupabaseConfigured
  ? createClient(url, key, {
      auth: { persistSession: false }, // لا يوجد تسجيل دخول في هذه المرحلة
      realtime: { params: { eventsPerSecond: 2 } }, // تخفيف الضغط على الأجهزة الضعيفة
    })
  : null

/** عدد الصفقات المعروضة في كل قسم */
export const CLOSED_LIMIT = 20

/*
  ثلاث إشارات لا ستّ: بطاقة البثّ صارت بسطرين (الزوج والاتجاه، ثم وقت
  الدخول والمدّة)، فكان القسم يبتلع نصف الشاشة قبل أن يصل المستخدم
  إلى سجل النتائج. المولّد يبقي ستًّا في قاعدة البيانات — العرض وحده تقلّص.
*/
export const LIVE_LIMIT = 3
