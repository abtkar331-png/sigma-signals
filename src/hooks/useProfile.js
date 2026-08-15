import { useCallback, useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { useTelegram } from './useTelegram'

const LOCAL_SETTINGS_KEY = 'signalpro.settings'
const DEFAULT_SETTINGS = {
  language: 'ar',
  notifications: true,
  platform_id: null,
  country_code: null,
}

/** قراءة إعدادات الزائر المحفوظة في المتصفّح */
function readLocalSettings() {
  try {
    return { ...DEFAULT_SETTINGS, ...JSON.parse(localStorage.getItem(LOCAL_SETTINGS_KEY) ?? '{}') }
  } catch {
    return { ...DEFAULT_SETTINGS }
  }
}

/**
 * حساب المستخدم وإعداداته.
 *
 * التدفّق: نرسل ‎initData‎ الموقّع من تيليجرام إلى Edge Function،
 * تتحقّق من التوقيع بتوكن البوت ثم تُنشئ صفّ المستخدم أو تحدّثه وتعيده.
 * المتصفّح لا يكتب في جدول المستخدمين إطلاقًا، فلا يمكن انتحال أي حساب.
 *
 * الإعدادات تعمل في الحالتين: مع حساب تُحفظ في قاعدة البيانات فيجدها
 * المستخدم على أي جهاز، وبدون حساب تُحفظ محليًا في المتصفّح.
 *
 * الحالات: loading | ready | guest | error
 */
export function useProfile() {
  const { tg, isTelegram } = useTelegram()
  const [profile, setProfile] = useState(null)
  const [localSettings, setLocalSettings] = useState(readLocalSettings)
  const [state, setState] = useState('loading')
  const [error, setError] = useState(null)

  const call = useCallback(
    async (payload = {}) => {
      const initData = tg?.initData
      if (!initData) return null

      const { data, error: fnError } = await supabase.functions.invoke(
        'telegram-auth',
        { body: { initData, ...payload } }
      )

      if (fnError) throw new Error(fnError.message)
      if (data?.error) throw new Error(data.error)

      return data
    },
    [tg]
  )

  // أول تحميل: تسجيل الدخول وإنشاء الحساب إن لم يكن موجودًا
  useEffect(() => {
    // خارج تيليجرام لا يوجد توقيع، فنعمل كزائر بإعدادات محلية
    if (!isSupabaseConfigured || !isTelegram || !tg?.initData) {
      setState('guest')
      return
    }

    let cancelled = false

    call()
      .then((res) => {
        if (cancelled) return
        setProfile(res?.profile ?? null)
        setState('ready')
      })
      .catch((e) => {
        if (cancelled) return
        console.error('تعذّر تسجيل الدخول:', e)
        setError(e.message)
        setState('error') // الإعدادات المحلية تبقى عاملة
      })

    return () => {
      cancelled = true
    }
  }, [call, isTelegram, tg])

  /** الإعدادات الفعّالة: من الحساب إن وُجد، وإلا المحفوظة محليًا */
  const settings = profile
    ? {
        language: profile.language,
        notifications: profile.notifications,
        platform_id: profile.platform_id ?? null,
        country_code: profile.country_code ?? null,
      }
    : localSettings

  const updateSettings = useCallback(
    async (patch) => {
      // تحديث فوري للواجهة في كل الحالات
      setLocalSettings((prev) => {
        const next = { ...prev, ...patch }
        try {
          localStorage.setItem(LOCAL_SETTINGS_KEY, JSON.stringify(next))
        } catch {
          // التخزين المحلي قد يكون معطّلًا — نتجاهل بأمان
        }
        return next
      })
      setProfile((prev) => (prev ? { ...prev, ...patch } : prev))

      // التثبيت في قاعدة البيانات متاح فقط لحساب متحقَّق منه
      if (!profile) return

      try {
        const res = await call({ settings: patch })
        if (res?.profile) setProfile(res.profile)
      } catch (e) {
        console.error('تعذّر حفظ الإعدادات:', e)
        setError(e.message)
      }
    },
    [call, profile]
  )

  /**
   * تفعيل الاشتراك برمز.
   * التحقّق من الرمز واستهلاكه يحدثان داخل قاعدة البيانات في عملية واحدة،
   * فلا يمكن استخدام الرمز مرّتين حتى لو أُرسل الطلب مرّتين معًا.
   */
  const redeemCode = useCallback(
    async (code) => {
      // خارج تيليجرام لا يوجد توقيع، فالرمز لا يصل لقاعدة البيانات أصلًا
      if (!tg?.initData) return { ok: false, reason: 'no_telegram' }

      const res = await call({ redeemCode: code })
      if (res?.profile) setProfile(res.profile)
      return res?.redeem ?? { ok: false, reason: 'not_found' }
    },
    [call, tg]
  )

  return { profile, settings, state, error, updateSettings, redeemCode }
}
