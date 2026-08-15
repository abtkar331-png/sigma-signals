// ⚠️ بيانات تجريبية (Placeholder) لأغراض بناء الواجهة فقط.
// لا تمثّل أداءً حقيقيًا، وسيتم استبدالها بالكامل ببيانات الـ API عند ربط الواجهة الخلفية.

/** أنواع الأسواق المدعومة في الواجهة */
export const MARKETS = {
  FOREX: 'forex',
  BINARY: 'binary',
}

/** ٣٠ زوج عملات للخيارات الثنائية */
export const BINARY_PAIRS = [
  'EUR/USD', 'GBP/USD', 'USD/JPY', 'AUD/USD', 'USD/CAD',
  'USD/CHF', 'NZD/USD', 'EUR/GBP', 'EUR/JPY', 'GBP/JPY',
  'AUD/JPY', 'EUR/AUD', 'GBP/CAD', 'CAD/JPY', 'CHF/JPY',
  'NZD/JPY', 'AUD/CAD', 'EUR/CHF', 'USD/SGD', 'USD/MXN',
  'GBP/AUD', 'GBP/CHF', 'EUR/CAD', 'EUR/NZD', 'AUD/NZD',
  'AUD/CHF', 'CAD/CHF', 'NZD/CAD', 'NZD/CHF', 'USD/ZAR',
]

/** ٣٠ أداة تداول — معادن وطاقة وعملات رقمية ومؤشرات وأسهم */
export const FOREX_INSTRUMENTS = [
  'XAU/USD', 'XAG/USD', 'WTI/USD', 'BRENT/USD', 'BTC/USD',
  'ETH/USD', 'US30', 'NAS100', 'SPX500', 'GER40',
  'UK100', 'JPN225', 'AAPL', 'MSFT', 'TSLA',
  'AMZN', 'GOOGL', 'META', 'NVDA', 'NFLX',
  'XPT/USD', 'NGAS', 'COPPER', 'SOL/USD', 'XRP/USD',
  'FRA40', 'AUS200', 'HK50', 'AMD', 'NKE',
]

/** ٢٠ مؤشرًا فنيًا — يظهر اسم واحد بجانب كل صفقة بدل الأرقام */
export const INDICATORS = [
  'تقاطع المتوسطات',
  'تباعد RSI',
  'اختراق بولينجر',
  'تقاطع MACD',
  'ارتداد فيبوناتشي',
  'نموذج الابتلاع',
  'دعم رئيسي',
  'مقاومة رئيسية',
  'تشبّع شرائي',
  'تشبّع بيعي',
  'تقاطع ستوكاستك',
  'اختراق قناة',
  'نموذج المطرقة',
  'تباعد MACD',
  'كسر خط الاتجاه',
  'رأس وكتفين',
  'دوجي انعكاسية',
  'تجمّع سيولة',
  'اختراق النطاق',
  'تدفّق حجم',
]

/**
 * منصات التداول المعروضة في الشريط المتحرك.
 * `logo` يشير إلى ملف PNG داخل مجلد `public/platforms/`.
 * لو الملف غير موجود، تعرض البطاقة الرمز النصّي في `mark` تلقائيًا.
 */
export const PLATFORMS = [
  { name: 'Quotex', mark: 'Q', logo: '/platforms/quotex.png' },
  { name: 'Pocket Option', mark: 'PO', logo: '/platforms/pocket-option.png' },
  { name: 'IQ Option', mark: 'IQ', logo: '/platforms/iq-option.png' },
  { name: 'Binance', mark: 'B', logo: '/platforms/binance.png' },
  { name: 'OKX', mark: 'OK', logo: '/platforms/okx.png' },
  { name: 'MetaTrader 4', mark: 'M4', logo: '/platforms/metatrader-4.png' },
  { name: 'MetaTrader 5', mark: 'M5', logo: '/platforms/metatrader-5.png' },
]

/** عدد الصفقات المعروضة في سجل النتائج */
export const RESULTS_SIZE = 20

/** عدد الصفقات الرابحة المستهدَف من أصل RESULTS_SIZE (‎١٨/٢٠ = ٩٠٪‎) */
export const TARGET_WINS = 18

const pick = (list) => list[Math.floor(Math.random() * list.length)]

let counter = 0

/**
 * يولّد صفقة واحدة بنتيجة محدّدة مسبقًا.
 * @param {'win'|'loss'} outcome نتيجة الصفقة
 */
export function generateTrade(outcome) {
  counter += 1
  const isBinary = Math.random() > 0.5

  return {
    id: `t-${counter}-${Math.floor(Math.random() * 1e6)}`,
    market: isBinary ? MARKETS.BINARY : MARKETS.FOREX,
    pair: isBinary ? pick(BINARY_PAIRS) : pick(FOREX_INSTRUMENTS),
    direction: isBinary
      ? Math.random() > 0.5 ? 'call' : 'put'
      : Math.random() > 0.5 ? 'buy' : 'sell',
    indicator: pick(INDICATORS),
    outcome,
  }
}

/**
 * ينشئ قائمة البداية: ‎٢٠‎ صفقة منها ‎١٨‎ رابحة و‎٢‎ خاسرة.
 * مواقع الخاسرتين تُختار عشوائيًا في كل تشغيل حتى لا تظهرا
 * في نفس الترتيب دائمًا.
 */
export function createInitialTrades() {
  const lossCount = RESULTS_SIZE - TARGET_WINS
  const lossPositions = new Set()

  while (lossPositions.size < lossCount) {
    lossPositions.add(Math.floor(Math.random() * RESULTS_SIZE))
  }

  return Array.from({ length: RESULTS_SIZE }, (_, i) =>
    generateTrade(lossPositions.has(i) ? 'loss' : 'win')
  )
}

/** إشارة مباشرة للقسم المموّه (نتيجتها عشوائية لأنها قيد التنفيذ) */
export function generateLiveSignal() {
  return generateTrade(Math.random() > 0.2 ? 'win' : 'loss')
}

/** تسميات عربية لاتجاه الصفقة */
export const DIRECTION_LABELS = {
  buy: 'شراء',
  sell: 'بيع',
  call: 'صاعد',
  put: 'هابط',
}

/** تسميات عربية لنوع السوق */
export const MARKET_LABELS = {
  [MARKETS.FOREX]: 'فوركس',
  [MARKETS.BINARY]: 'خيارات ثنائية',
}
