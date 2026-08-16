/**
 * مسار ملف من مجلد public يعمل مهما كان مكان نشر التطبيق.
 *
 * على GitHub Pages يُنشر التطبيق داخل مجلد فرعي مثل `/sigma-signals/`،
 * فالمسار المطلق `/flags/eg.png` يشير إلى جذر النطاق وتفشل الصورة.
 * إضافة BASE_URL تجعل نفس الكود يعمل محليًا وعلى الاستضافة دون تغيير.
 */
export const asset = (path) =>
  path ? `${import.meta.env.BASE_URL}${String(path).replace(/^\/+/, '')}` : path
