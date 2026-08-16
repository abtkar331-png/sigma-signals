import { useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { PLATFORMS as FALLBACK } from '../data/mockData'

/**
 * قائمة منصات التداول من قاعدة البيانات.
 * تُقرأ مرّة واحدة عند فتح التطبيق — القائمة نادرة التغيّر فلا داعي
 * لاشتراك لحظي عليها.
 */
export function usePlatforms() {
  const [platforms, setPlatforms] = useState([])
  const [status, setStatus] = useState(isSupabaseConfigured ? 'loading' : 'local')

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setPlatforms(FALLBACK.map((p) => ({ ...p, market: 'forex', supported: true })))
      return
    }

    let cancelled = false

    supabase
      .from('platforms')
      .select('id, name, mark, market, logo, supported')
      .order('sort_order', { ascending: true })
      .then(({ data, error }) => {
        if (cancelled) return

        if (error) {
          console.error('تعذّر جلب المنصات:', error)
          setStatus('error')
          return
        }

        setPlatforms(data ?? [])
        setStatus('ready')
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { platforms, status }
}
