import { useCallback, useEffect, useRef, useState } from 'react'
import {
  supabase,
  isSupabaseConfigured,
  CLOSED_LIMIT,
  LIVE_LIMIT,
} from '../lib/supabase'
import { useRollingTrades } from './useRollingTrades'
import { generateLiveSignal } from '../data/mockData'

const FALLBACK_INTERVAL_MS = 20000

/**
 * مصدر بيانات الصفقات.
 *
 * عند ضبط Supabase: كل المستخدمين يقرأون نفس الصفوف من نفس الجدول،
 * ويصلهم أي تغيير فورًا عبر البث اللحظي — فلا اختلاف بين جهاز وآخر.
 * عند غيابه: بيانات محلية تجريبية حتى لا تتعطّل الواجهة أثناء التطوير.
 */
export function useTrades() {
  const [closed, setClosed] = useState([])
  const [live, setLive] = useState([])
  const [status, setStatus] = useState(
    isSupabaseConfigured ? 'loading' : 'local'
  )
  const refetchTimer = useRef(null)

  // الوضع الاحتياطي (لا يعمل إطلاقًا عند تفعيل Supabase)
  const localClosed = useRollingTrades(FALLBACK_INTERVAL_MS, !isSupabaseConfigured)
  const [localLive] = useState(() =>
    isSupabaseConfigured
      ? []
      : Array.from({ length: LIVE_LIMIT }, generateLiveSignal)
  )

  const fetchTrades = useCallback(async () => {
    const [closedRes, liveRes] = await Promise.all([
      supabase
        .from('trades')
        .select('id, pair, market, direction, indicator, outcome, closed_at')
        .eq('status', 'closed')
        .order('closed_at', { ascending: false })
        .limit(CLOSED_LIMIT),
      supabase
        .from('trades')
        .select(
          'id, pair, market, direction, indicator, outcome, opened_at, entry_at, duration_min, is_manual'
        )
        .eq('status', 'live')
        // الإشارة اليدوية أوّلًا: الأدمن أضافها عمدًا فلا تُدفن تحت المولّد
        .order('is_manual', { ascending: false })
        .order('entry_at', { ascending: true })
        .limit(LIVE_LIMIT),
    ])

    if (closedRes.error || liveRes.error) {
      console.error('تعذّر جلب الصفقات:', closedRes.error ?? liveRes.error)
      setStatus('error')
      return
    }

    setClosed(closedRes.data ?? [])
    setLive(liveRes.data ?? [])
    setStatus('ready')
  }, [])

  useEffect(() => {
    if (!isSupabaseConfigured) return

    fetchTrades()

    /*
      كل دورة من المولّد تُنتج حدثين (إضافة صفقة + حذف الأقدم)، وكل حدث
      كان يُطلق إعادة جلب كاملة للقائمتين — أي أربعة طلبات وإعادة بناء
      ٢٦ بطاقة بحركاتها مرّتين خلال أقل من ثانية. نجمع الأحداث المتتالية
      في إعادة جلب واحدة بعد سكون قصير.
    */
    const scheduleRefetch = () => {
      clearTimeout(refetchTimer.current)
      refetchTimer.current = setTimeout(fetchTrades, 400)
    }

    /*
      اسم فريد لكل اشتراك: React في وضع التطوير يشغّل التأثير مرّتين،
      فيُلغى الاشتراك الأول ثم يُنشأ آخر بنفس الاسم — عندها تظهر القناة
      «متصلة» بينما يكون الخادم قد ألغى ربطها فلا تصل أي أحداث.
      الاسم الفريد يمنع هذا التضارب تمامًا.
    */
    const channel = supabase
      .channel(`trades-stream-${crypto.randomUUID()}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'trades' },
        scheduleRefetch
      )
      .subscribe()

    return () => {
      clearTimeout(refetchTimer.current)
      supabase.removeChannel(channel)
    }
  }, [fetchTrades])

  if (!isSupabaseConfigured) {
    return { closed: localClosed, live: localLive, status: 'local', retry: () => {} }
  }

  return { closed, live, status, retry: fetchTrades }
}
