import { useCallback, useState } from 'react'
import AppBackground from './components/AppBackground'
import Header from './components/Header'
import LiveSignals from './components/LiveSignals'
import ResultsFeed from './components/ResultsFeed'
import PlatformsMarquee from './components/PlatformsMarquee'
import HowItWorks from './components/HowItWorks'
import ResultsDialog from './components/ResultsDialog'
import ProfileDialog from './components/ProfileDialog'
import MoreDialog from './components/MoreDialog'
import PlatformsDialog from './components/PlatformsDialog'
import TimezoneDialog from './components/TimezoneDialog'
import AuthSheet from './components/AuthSheet'
import { I18nProvider } from './i18n/I18nProvider'
import { useTelegram } from './hooks/useTelegram'
import { useTrades } from './hooks/useTrades'
import { useProfile } from './hooks/useProfile'
import { useSubscription } from './hooks/useSubscription'
import { usePlatforms } from './hooks/usePlatforms'
import { useBackButton } from './hooks/useBackButton'
import { findCountry } from './data/countries'
import { BRAND_NAME } from './config'

export default function App() {
  // نافذة واحدة مفتوحة في كل وقت: results | profile | more | platforms | timezone | auth | null
  const [dialog, setDialog] = useState(null)
  const { tg, haptic } = useTelegram()

  // مصدر واحد للبيانات يُغذّي الصفحة والديالوج معًا
  const { closed: trades, live, status: tradesStatus, retry: retryTrades } =
    useTrades()

  // حساب المستخدم وإعداداته من قاعدة البيانات
  const { profile, settings, state: profileState, updateSettings, redeemCode } =
    useProfile()

  // الاشتراك الفعّال هو ما يرفع التمويه عن الصفقات
  const { isSubscribed } = useSubscription(profile)

  // منصات التداول — تغذّي الشريط المتحرك ونافذة اختيار المنصة
  const { platforms, status: platformsStatus } = usePlatforms()

  // المنصة التي اختارها المستخدم — محفوظة في حسابه فتظل محدَّدة على أي جهاز
  const selectedPlatform =
    platforms.find((p) => p.id === settings.platform_id) ?? null

  const choosePlatform = useCallback(
    (id) => updateSettings({ platform_id: id }),
    [updateSettings]
  )

  // دولة المستخدم — تحدّد المنطقة الزمنية، وتُحفظ في حسابه كذلك
  const selectedCountry = findCountry(settings.country_code)

  const chooseCountry = useCallback(
    (code) => updateSettings({ country_code: code }),
    [updateSettings]
  )

  const openDialog = useCallback(
    (name) => {
      haptic('light')
      setDialog(name)
    },
    [haptic]
  )

  const closeDialog = useCallback(() => setDialog(null), [])

  // زر الرجوع الأصلي في تيليجرام يغلق النافذة بدل الخروج من التطبيق
  useBackButton(tg, dialog !== null, closeDialog)

  const changeLanguage = useCallback(
    (code) => updateSettings({ language: code }),
    [updateSettings]
  )

  return (
    <I18nProvider language={settings.language} onChangeLanguage={changeLanguage}>
      {/* إطار التطبيق: ارتفاع كامل، والتمرير يحدث داخل الإطار لا في الصفحة */}
      <div className="relative mx-auto flex h-[100dvh] w-full max-w-md flex-col overflow-hidden bg-ink-950 sm:my-4 sm:h-[calc(100dvh-2rem)] sm:rounded-[2rem] sm:border sm:border-white/[0.07] sm:shadow-elite">
        <AppBackground />

        {/* صفحة واحدة تُمرَّر بالكامل */}
        <div className="no-scrollbar relative z-10 flex-1 overflow-y-auto overscroll-contain">
          <Header
            onOpenProfile={() => openDialog('profile')}
            onOpenMore={() => openDialog('more')}
          />

          <main className="space-y-5 py-4">
            {/* معرّف أحدث صفقة مقفولة: تغيّره يعيد تشغيل لفة الشعاع من جديد */}
            <LiveSignals
              signals={live}
              status={tradesStatus}
              cycleKey={trades[0]?.id}
              unlocked={isSubscribed}
              onUnlock={() => openDialog('auth')}
            />

            <ResultsFeed
              trades={trades}
              status={tradesStatus}
              onRetry={retryTrades}
              onOpenResults={() => openDialog('results')}
            />

            <div className="px-4">
              <PlatformsMarquee platforms={platforms} />
            </div>

            <HowItWorks />

            <p
              style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
              className="pt-1 text-center font-mono text-[10px] tracking-[0.2em] text-steel-400/45"
            >
              {BRAND_NAME} © 2026
            </p>
          </main>
        </div>

        {/* النوافذ العائمة */}
        <ResultsDialog
          open={dialog === 'results'}
          onClose={closeDialog}
          trades={trades}
        />
        <ProfileDialog
          open={dialog === 'profile'}
          onClose={closeDialog}
          onOpenAuth={() => openDialog('auth')}
          profile={profile}
          state={profileState}
        />
        <MoreDialog
          open={dialog === 'more'}
          onClose={closeDialog}
          settings={settings}
          onUpdateSettings={updateSettings}
          onOpenPlatforms={() => openDialog('platforms')}
          selectedPlatform={selectedPlatform}
          onOpenTimezone={() => openDialog('timezone')}
          selectedCountry={selectedCountry}
        />
        <PlatformsDialog
          open={dialog === 'platforms'}
          onClose={closeDialog}
          platforms={platforms}
          status={platformsStatus}
          selectedId={settings.platform_id ?? null}
          onSelect={choosePlatform}
        />
        <TimezoneDialog
          open={dialog === 'timezone'}
          onClose={closeDialog}
          selectedCode={settings.country_code ?? null}
          onSelect={chooseCountry}
        />
        <AuthSheet
          open={dialog === 'auth'}
          onClose={closeDialog}
          onRedeem={redeemCode}
        />
      </div>
    </I18nProvider>
  )
}
