/**
 * نصوص الواجهة بلغتين.
 * كل نصّ ظاهر للمستخدم يمرّ من هنا — لا نصوص مكتوبة داخل المكوّنات.
 */

export const LANGUAGES = {
  ar: { label: 'العربية', dir: 'rtl' },
  en: { label: 'English', dir: 'ltr' },
}

export const translations = {
  ar: {
    // الحالة العلوية
    analyzing: 'يتم تحليل السوق وإرسال الإشارات القوية فقط',

    // البث المموّه
    lockedNote: 'يجب الحصول على رمز اشتراك لفتح الصفقات',
    viewTrades: 'عرض الصفقات',
    getCode: 'الحصول على رمز',

    // سجل النتائج
    resultsTitle: 'نتائج الصفقات السابقة',
    resultsSubtitle: 'صفقات منتهية تُعرض كنتائج فقط',
    viewByMarket: 'عرض النتائج حسب السوق',
    demoDataNote:
      'بيانات تجريبية للعرض — تُستبدل بسجل التداول الفعلي عند ربط الواجهة الخلفية.',

    // حالة الصفقة
    pending: 'جارية',
    win: 'رابحة',
    loss: 'خاسرة',
    up: 'صعود',
    down: 'هبوط',
    minutesShort: 'د',
    entryLabel: 'وقت الدخول',
    durationLabel: 'مدّة الصفقة',

    // الأسواق والاتجاهات
    forex: 'FOREX',
    binary: 'BINARY OPTION',
    buy: 'شراء',
    sell: 'بيع',
    call: 'صاعد',
    put: 'هابط',

    // المنصات
    platformsNote: 'متوافق بالكامل مع جميع منصات التداول العالمية',

    // كيف يعمل
    howItWorksEyebrow: 'HOW IT WORKS',
    howItWorksTitle: 'كيف يعمل التطبيق؟',
    step1Title: 'قراءة بيانات الأسواق',
    step1Text:
      'يقرأ النظام حركة الأسعار وأحجام التداول من أسواق الفوركس والعملات الرقمية بشكل مستمر.',
    step2Title: 'تحليل السوق',
    step2Text:
      'يستخدم النظام مؤشرات واستراتيجيات فنية مدفوعة لتحليل حركة السوق والوصول إلى أفضل النتائج الممكنة.',
    step3Title: 'تصفية الإشارات',
    step3Text:
      'يتم تصفية الإشارات واستبعاد أي إشارات مكرّرة أو ضعيفة، ويتم إرسال الصفقات القوية فقط.',
    step4Title: 'إرسال الصفقة',
    step4Text:
      'يتم إرسال وعرض الإشارات المعتمدة في مربع الصفقات في الأعلى (يجب أن تكون مشتركًا لعرض الصفقات).',
    howItWorksNote:
      'يستخدم النظام الذكاء الاصطناعي في التحليل وتطبيق الاستراتيجيات لدعم قرار منظّم — التزم بإدارة رأس المال لأنها تبقى مسؤوليتك.',

    // النوافذ
    close: 'إغلاق',

    // الملف الشخصي
    profileTitle: 'الملف الشخصي',
    profileSubtitle: 'بيانات حسابك',
    guestName: 'زائر',
    accountId: 'رقم الحساب',
    memberSince: 'عضو منذ',
    status: 'الحالة',
    statusActive: 'مشترك',
    statusInactive: 'غير مفعّل',
    statusExpired: 'منتهي',
    subscriptionUntil: 'ينتهي في',
    enterCode: 'إدخال رمز الاشتراك',
    contactSupport: 'التواصل مع الدعم',
    openInTelegram: 'افتح التطبيق من داخل تيليجرام لتفعيل حسابك',

    // المزيد
    moreTitle: 'المزيد',
    moreSubtitle: 'الإعدادات والدعم',
    language: 'اللغة',
    notifications: 'الإشعارات',
    on: 'مفعّلة',
    off: 'متوقّفة',
    disclaimer:
      'تنويه: التداول في الأسواق المالية ينطوي على مخاطر قد تؤدي إلى خسارة رأس المال. المحتوى المعروض لأغراض تحليلية ومعلوماتية فقط ولا يُعدّ نصيحة استثمارية. الأداء السابق لا يضمن نتائج مستقبلية.',

    // رمز الاشتراك
    authTitle: 'الدخول إلى الصفقات',
    authDesc: 'أدخل رمز الاشتراك للوصول إلى التفاصيل الكاملة للإشارات.',
    authPlaceholder: 'أدخل رمز الاشتراك الخاص بك...',
    confirm: 'تأكيد',
    authInvalid: 'رمز الاشتراك غير صحيح.',
    authUsed: 'هذا الرمز مُستخدم من قبل.',
    authSuccess: 'تم تفعيل اشتراكك بنجاح',
    authSuccessNote: 'الصفقات أصبحت مفتوحة أمامك لمدة شهر.',
    subscribed: 'مشترك',
    noCodeContact: 'إذا لم يكن لديك رمز اشتراك، تواصل معنا من هنا',

    saving: 'جارٍ الحفظ...',

    // اختيار المنصة
    choosePlatform: 'اختيار منصتك',
    choosePlatformSubtitle: 'اختر المنصة التي تتداول عليها',
    noPlatformChosen: 'لم تختر بعد',
    selected: 'مختارة',
    searchPlatform: 'ابحث عن اسم المنصة...',
    allMarkets: 'الكل',
    crypto: 'العملات الرقمية',
    supported: 'مدعومة',
    notSupported: 'غير مدعومة',
    noPlatformFound: 'لم نجد هذه المنصة — تواصل معنا للاستفسار',
    platformsCount: 'منصة متاحة',

    // اختيار التوقيت
    chooseTimezone: 'اختيار التوقيت',
    chooseTimezoneSubtitle: 'اختر دولتك ليُضبط توقيت الإشارات عليها',
    noTimezoneChosen: 'لم تختر بعد',
    searchCountry: 'Search country...',
    noCountryFound: 'لم نجد هذه الدولة',
    countriesCount: 'دولة',

    loadingTrades: 'جارٍ تحميل الصفقات...',
    loadError: 'تعذّر الاتصال بالخادم',
    retry: 'إعادة المحاولة',
    noTrades: 'لا توجد صفقات لعرضها الآن',
  },

  en: {
    analyzing: 'Scanning the market — only strong signals are sent',

    lockedNote: 'A subscription code is required to unlock the trades',
    viewTrades: 'View Trades',
    getCode: 'Get a code',

    resultsTitle: 'Past Trade Results',
    resultsSubtitle: 'Closed trades, shown as results only',
    viewByMarket: 'View results by market',
    demoDataNote:
      'Demo data for preview — replaced by the live trading record once the backend is connected.',

    pending: 'Open',
    win: 'Win',
    loss: 'Loss',
    up: 'UP',
    down: 'DOWN',
    minutesShort: 'm',
    entryLabel: 'Entry time',
    durationLabel: 'Duration',

    forex: 'FOREX',
    binary: 'BINARY OPTION',
    buy: 'Buy',
    sell: 'Sell',
    call: 'Call',
    put: 'Put',

    platformsNote: 'Fully compatible with all major trading platforms',

    howItWorksEyebrow: 'HOW IT WORKS',
    howItWorksTitle: 'How does the app work?',
    step1Title: 'Market data collection',
    step1Text:
      'The system continuously reads price action and trading volume across forex and crypto markets.',
    step2Title: 'Pattern analysis',
    step2Text:
      'Statistical models compare current movement against similar historical patterns to estimate the likelier direction.',
    step3Title: 'Signal filtering',
    step3Text:
      'Weak or conflicting signals are discarded; only those above a preset confidence threshold pass through.',
    step4Title: 'Signal delivery',
    step4Text:
      'Approved signals reach subscribers with the pair, direction, and suggested risk level.',
    howItWorksNote:
      'This is an analysis tool that supports a disciplined decision — it does not guarantee profit, and capital management remains your responsibility.',

    close: 'Close',

    profileTitle: 'Profile',
    profileSubtitle: 'Your account details',
    guestName: 'Guest',
    accountId: 'Account ID',
    memberSince: 'Member since',
    status: 'Status',
    statusActive: 'Subscribed',
    statusInactive: 'Not active',
    statusExpired: 'Expired',
    subscriptionUntil: 'Expires on',
    enterCode: 'Enter subscription code',
    contactSupport: 'Contact support',
    openInTelegram: 'Open the app inside Telegram to activate your account',

    moreTitle: 'More',
    moreSubtitle: 'Settings and support',
    language: 'Language',
    notifications: 'Notifications',
    on: 'On',
    off: 'Off',
    disclaimer:
      'Disclaimer: Trading financial markets carries risk that may lead to loss of capital. The content shown is for analytical and informational purposes only and is not investment advice. Past performance does not guarantee future results.',

    authTitle: 'Access the trades',
    authDesc: 'Enter your subscription code to unlock full signal details.',
    authPlaceholder: 'Enter your subscription code...',
    confirm: 'Confirm',
    authInvalid: 'This subscription code is invalid.',
    authUsed: 'This code has already been used.',
    authSuccess: 'Your subscription is now active',
    authSuccessNote: 'Trades are unlocked for one month.',
    subscribed: 'Subscribed',
    noCodeContact: "Don't have a subscription code? Contact us here",

    saving: 'Saving...',

    choosePlatform: 'Choose your platform',
    choosePlatformSubtitle: 'Pick the platform you trade on',
    noPlatformChosen: 'Not chosen yet',
    selected: 'Selected',
    searchPlatform: 'Search for a platform...',
    allMarkets: 'All',
    crypto: 'Crypto',
    supported: 'Supported',
    notSupported: 'Not supported',
    noPlatformFound: 'We could not find that platform — contact us to ask',
    platformsCount: 'platforms available',

    chooseTimezone: 'Choose your timezone',
    chooseTimezoneSubtitle: 'Pick your country to set the signal time',
    noTimezoneChosen: 'Not chosen yet',
    searchCountry: 'Search country...',
    noCountryFound: 'No country matches that search',
    countriesCount: 'countries',

    loadingTrades: 'Loading trades...',
    loadError: 'Could not reach the server',
    retry: 'Try again',
    noTrades: 'No trades to show right now',
  },
}

/**
 * أسماء المؤشّرات الفنية مخزَّنة بالعربية في قاعدة البيانات،
 * فنترجمها هنا عند اختيار الإنجليزية. أي اسم غير مذكور يظهر كما هو.
 */
export const INDICATOR_EN = {
  'تقاطع المتوسطات': 'MA Cross',
  'تباعد RSI': 'RSI Divergence',
  'اختراق بولينجر': 'Bollinger Breakout',
  'تقاطع MACD': 'MACD Cross',
  'ارتداد فيبوناتشي': 'Fibonacci Retrace',
  'نموذج الابتلاع': 'Engulfing Pattern',
  'دعم رئيسي': 'Key Support',
  'مقاومة رئيسية': 'Key Resistance',
  'تشبّع شرائي': 'Overbought',
  'تشبّع بيعي': 'Oversold',
  'تقاطع ستوكاستك': 'Stochastic Cross',
  'اختراق قناة': 'Channel Break',
  'نموذج المطرقة': 'Hammer Pattern',
  'تباعد MACD': 'MACD Divergence',
  'كسر خط الاتجاه': 'Trendline Break',
  'رأس وكتفين': 'Head & Shoulders',
  'دوجي انعكاسية': 'Reversal Doji',
  'تجمّع سيولة': 'Liquidity Pool',
  'اختراق النطاق': 'Range Breakout',
  'تدفّق حجم': 'Volume Surge',
}
