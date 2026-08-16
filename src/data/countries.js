import { asset } from '../lib/asset'

/**
 * دول العالم بالأسماء الإنجليزية (ISO 3166-1) ومع كل دولة منطقتها الزمنية.
 *
 * الأسماء إنجليزية عمدًا في اللغتين: هي المعيار المتعارف عليه في منصات التداول،
 * والبحث يتم بها مباشرة بلا حاجة لمطابقة نطق عربي.
 *
 * القائمة ثابتة داخل التطبيق ولا تأتي من قاعدة البيانات — فهي لا تتغيّر،
 * وتحميلها محليًا يوفّر طلب شبكة ويجعل النافذة تفتح فورًا.
 * المحفوظ في حساب المستخدم هو `code` فقط.
 */

export const COUNTRIES = [
  { code: 'AF', name: 'Afghanistan', zone: 'Asia/Kabul' },
  { code: 'AX', name: 'Aland Islands', zone: 'Europe/Mariehamn' },
  { code: 'AL', name: 'Albania', zone: 'Europe/Tirane' },
  { code: 'DZ', name: 'Algeria', zone: 'Africa/Algiers' },
  { code: 'AS', name: 'American Samoa', zone: 'Pacific/Pago_Pago' },
  { code: 'AD', name: 'Andorra', zone: 'Europe/Andorra' },
  { code: 'AO', name: 'Angola', zone: 'Africa/Luanda' },
  { code: 'AI', name: 'Anguilla', zone: 'America/Anguilla' },
  { code: 'AQ', name: 'Antarctica', zone: 'Antarctica/McMurdo' },
  { code: 'AG', name: 'Antigua and Barbuda', zone: 'America/Antigua' },
  { code: 'AR', name: 'Argentina', zone: 'America/Argentina/Buenos_Aires' },
  { code: 'AM', name: 'Armenia', zone: 'Asia/Yerevan' },
  { code: 'AW', name: 'Aruba', zone: 'America/Aruba' },
  { code: 'AU', name: 'Australia', zone: 'Australia/Sydney' },
  { code: 'AT', name: 'Austria', zone: 'Europe/Vienna' },
  { code: 'AZ', name: 'Azerbaijan', zone: 'Asia/Baku' },
  { code: 'BS', name: 'Bahamas', zone: 'America/Nassau' },
  { code: 'BH', name: 'Bahrain', zone: 'Asia/Bahrain' },
  { code: 'BD', name: 'Bangladesh', zone: 'Asia/Dhaka' },
  { code: 'BB', name: 'Barbados', zone: 'America/Barbados' },
  { code: 'BY', name: 'Belarus', zone: 'Europe/Minsk' },
  { code: 'BE', name: 'Belgium', zone: 'Europe/Brussels' },
  { code: 'BZ', name: 'Belize', zone: 'America/Belize' },
  { code: 'BJ', name: 'Benin', zone: 'Africa/Porto-Novo' },
  { code: 'BM', name: 'Bermuda', zone: 'Atlantic/Bermuda' },
  { code: 'BT', name: 'Bhutan', zone: 'Asia/Thimphu' },
  { code: 'BO', name: 'Bolivia', zone: 'America/La_Paz' },
  { code: 'BQ', name: 'Caribbean Netherlands', zone: 'America/Kralendijk' },
  { code: 'BA', name: 'Bosnia and Herzegovina', zone: 'Europe/Sarajevo' },
  { code: 'BW', name: 'Botswana', zone: 'Africa/Gaborone' },
  { code: 'BR', name: 'Brazil', zone: 'America/Sao_Paulo' },
  { code: 'IO', name: 'British Indian Ocean Territory', zone: 'Indian/Chagos' },
  { code: 'VG', name: 'British Virgin Islands', zone: 'America/Tortola' },
  { code: 'BN', name: 'Brunei', zone: 'Asia/Brunei' },
  { code: 'BG', name: 'Bulgaria', zone: 'Europe/Sofia' },
  { code: 'BF', name: 'Burkina Faso', zone: 'Africa/Ouagadougou' },
  { code: 'BI', name: 'Burundi', zone: 'Africa/Bujumbura' },
  { code: 'CV', name: 'Cabo Verde', zone: 'Atlantic/Cape_Verde' },
  { code: 'KH', name: 'Cambodia', zone: 'Asia/Phnom_Penh' },
  { code: 'CM', name: 'Cameroon', zone: 'Africa/Douala' },
  { code: 'CA', name: 'Canada', zone: 'America/Toronto' },
  { code: 'KY', name: 'Cayman Islands', zone: 'America/Cayman' },
  { code: 'CF', name: 'Central African Republic', zone: 'Africa/Bangui' },
  { code: 'TD', name: 'Chad', zone: 'Africa/Ndjamena' },
  { code: 'CL', name: 'Chile', zone: 'America/Santiago' },
  { code: 'CN', name: 'China', zone: 'Asia/Shanghai' },
  { code: 'CX', name: 'Christmas Island', zone: 'Indian/Christmas' },
  { code: 'CC', name: 'Cocos (Keeling) Islands', zone: 'Indian/Cocos' },
  { code: 'CO', name: 'Colombia', zone: 'America/Bogota' },
  { code: 'KM', name: 'Comoros', zone: 'Indian/Comoro' },
  { code: 'CG', name: 'Congo - Brazzaville', zone: 'Africa/Brazzaville' },
  { code: 'CD', name: 'Congo - Kinshasa', zone: 'Africa/Kinshasa' },
  { code: 'CK', name: 'Cook Islands', zone: 'Pacific/Rarotonga' },
  { code: 'CR', name: 'Costa Rica', zone: 'America/Costa_Rica' },
  { code: 'CI', name: 'Cote d Ivoire', zone: 'Africa/Abidjan' },
  { code: 'HR', name: 'Croatia', zone: 'Europe/Zagreb' },
  { code: 'CU', name: 'Cuba', zone: 'America/Havana' },
  { code: 'CW', name: 'Curacao', zone: 'America/Curacao' },
  { code: 'CY', name: 'Cyprus', zone: 'Asia/Nicosia' },
  { code: 'CZ', name: 'Czechia', zone: 'Europe/Prague' },
  { code: 'DK', name: 'Denmark', zone: 'Europe/Copenhagen' },
  { code: 'DJ', name: 'Djibouti', zone: 'Africa/Djibouti' },
  { code: 'DM', name: 'Dominica', zone: 'America/Dominica' },
  { code: 'DO', name: 'Dominican Republic', zone: 'America/Santo_Domingo' },
  { code: 'EC', name: 'Ecuador', zone: 'America/Guayaquil' },
  { code: 'EG', name: 'Egypt', zone: 'Africa/Cairo' },
  { code: 'SV', name: 'El Salvador', zone: 'America/El_Salvador' },
  { code: 'GQ', name: 'Equatorial Guinea', zone: 'Africa/Malabo' },
  { code: 'ER', name: 'Eritrea', zone: 'Africa/Asmara' },
  { code: 'EE', name: 'Estonia', zone: 'Europe/Tallinn' },
  { code: 'SZ', name: 'Eswatini', zone: 'Africa/Mbabane' },
  { code: 'ET', name: 'Ethiopia', zone: 'Africa/Addis_Ababa' },
  { code: 'FK', name: 'Falkland Islands', zone: 'Atlantic/Stanley' },
  { code: 'FO', name: 'Faroe Islands', zone: 'Atlantic/Faroe' },
  { code: 'FJ', name: 'Fiji', zone: 'Pacific/Fiji' },
  { code: 'FI', name: 'Finland', zone: 'Europe/Helsinki' },
  { code: 'FR', name: 'France', zone: 'Europe/Paris' },
  { code: 'GF', name: 'French Guiana', zone: 'America/Cayenne' },
  { code: 'PF', name: 'French Polynesia', zone: 'Pacific/Tahiti' },
  { code: 'GA', name: 'Gabon', zone: 'Africa/Libreville' },
  { code: 'GM', name: 'Gambia', zone: 'Africa/Banjul' },
  { code: 'GE', name: 'Georgia', zone: 'Asia/Tbilisi' },
  { code: 'DE', name: 'Germany', zone: 'Europe/Berlin' },
  { code: 'GH', name: 'Ghana', zone: 'Africa/Accra' },
  { code: 'GI', name: 'Gibraltar', zone: 'Europe/Gibraltar' },
  { code: 'GR', name: 'Greece', zone: 'Europe/Athens' },
  { code: 'GL', name: 'Greenland', zone: 'America/Nuuk' },
  { code: 'GD', name: 'Grenada', zone: 'America/Grenada' },
  { code: 'GP', name: 'Guadeloupe', zone: 'America/Guadeloupe' },
  { code: 'GU', name: 'Guam', zone: 'Pacific/Guam' },
  { code: 'GT', name: 'Guatemala', zone: 'America/Guatemala' },
  { code: 'GG', name: 'Guernsey', zone: 'Europe/Guernsey' },
  { code: 'GN', name: 'Guinea', zone: 'Africa/Conakry' },
  { code: 'GW', name: 'Guinea-Bissau', zone: 'Africa/Bissau' },
  { code: 'GY', name: 'Guyana', zone: 'America/Guyana' },
  { code: 'HT', name: 'Haiti', zone: 'America/Port-au-Prince' },
  { code: 'HN', name: 'Honduras', zone: 'America/Tegucigalpa' },
  { code: 'HK', name: 'Hong Kong', zone: 'Asia/Hong_Kong' },
  { code: 'HU', name: 'Hungary', zone: 'Europe/Budapest' },
  { code: 'IS', name: 'Iceland', zone: 'Atlantic/Reykjavik' },
  { code: 'IN', name: 'India', zone: 'Asia/Kolkata' },
  { code: 'ID', name: 'Indonesia', zone: 'Asia/Jakarta' },
  { code: 'IR', name: 'Iran', zone: 'Asia/Tehran' },
  { code: 'IQ', name: 'Iraq', zone: 'Asia/Baghdad' },
  { code: 'IE', name: 'Ireland', zone: 'Europe/Dublin' },
  { code: 'IM', name: 'Isle of Man', zone: 'Europe/Isle_of_Man' },
  { code: 'IL', name: 'Israel', zone: 'Asia/Jerusalem' },
  { code: 'IT', name: 'Italy', zone: 'Europe/Rome' },
  { code: 'JM', name: 'Jamaica', zone: 'America/Jamaica' },
  { code: 'JP', name: 'Japan', zone: 'Asia/Tokyo' },
  { code: 'JE', name: 'Jersey', zone: 'Europe/Jersey' },
  { code: 'JO', name: 'Jordan', zone: 'Asia/Amman' },
  { code: 'KZ', name: 'Kazakhstan', zone: 'Asia/Almaty' },
  { code: 'KE', name: 'Kenya', zone: 'Africa/Nairobi' },
  { code: 'KI', name: 'Kiribati', zone: 'Pacific/Tarawa' },
  { code: 'KW', name: 'Kuwait', zone: 'Asia/Kuwait' },
  { code: 'KG', name: 'Kyrgyzstan', zone: 'Asia/Bishkek' },
  { code: 'LA', name: 'Laos', zone: 'Asia/Vientiane' },
  { code: 'LV', name: 'Latvia', zone: 'Europe/Riga' },
  { code: 'LB', name: 'Lebanon', zone: 'Asia/Beirut' },
  { code: 'LS', name: 'Lesotho', zone: 'Africa/Maseru' },
  { code: 'LR', name: 'Liberia', zone: 'Africa/Monrovia' },
  { code: 'LY', name: 'Libya', zone: 'Africa/Tripoli' },
  { code: 'LI', name: 'Liechtenstein', zone: 'Europe/Vaduz' },
  { code: 'LT', name: 'Lithuania', zone: 'Europe/Vilnius' },
  { code: 'LU', name: 'Luxembourg', zone: 'Europe/Luxembourg' },
  { code: 'MO', name: 'Macao', zone: 'Asia/Macau' },
  { code: 'MG', name: 'Madagascar', zone: 'Indian/Antananarivo' },
  { code: 'MW', name: 'Malawi', zone: 'Africa/Blantyre' },
  { code: 'MY', name: 'Malaysia', zone: 'Asia/Kuala_Lumpur' },
  { code: 'MV', name: 'Maldives', zone: 'Indian/Maldives' },
  { code: 'ML', name: 'Mali', zone: 'Africa/Bamako' },
  { code: 'MT', name: 'Malta', zone: 'Europe/Malta' },
  { code: 'MH', name: 'Marshall Islands', zone: 'Pacific/Majuro' },
  { code: 'MQ', name: 'Martinique', zone: 'America/Martinique' },
  { code: 'MR', name: 'Mauritania', zone: 'Africa/Nouakchott' },
  { code: 'MU', name: 'Mauritius', zone: 'Indian/Mauritius' },
  { code: 'YT', name: 'Mayotte', zone: 'Indian/Mayotte' },
  { code: 'MX', name: 'Mexico', zone: 'America/Mexico_City' },
  { code: 'FM', name: 'Micronesia', zone: 'Pacific/Pohnpei' },
  { code: 'MD', name: 'Moldova', zone: 'Europe/Chisinau' },
  { code: 'MC', name: 'Monaco', zone: 'Europe/Monaco' },
  { code: 'MN', name: 'Mongolia', zone: 'Asia/Ulaanbaatar' },
  { code: 'ME', name: 'Montenegro', zone: 'Europe/Podgorica' },
  { code: 'MS', name: 'Montserrat', zone: 'America/Montserrat' },
  { code: 'MA', name: 'Morocco', zone: 'Africa/Casablanca' },
  { code: 'MZ', name: 'Mozambique', zone: 'Africa/Maputo' },
  { code: 'MM', name: 'Myanmar', zone: 'Asia/Yangon' },
  { code: 'NA', name: 'Namibia', zone: 'Africa/Windhoek' },
  { code: 'NR', name: 'Nauru', zone: 'Pacific/Nauru' },
  { code: 'NP', name: 'Nepal', zone: 'Asia/Kathmandu' },
  { code: 'NL', name: 'Netherlands', zone: 'Europe/Amsterdam' },
  { code: 'NC', name: 'New Caledonia', zone: 'Pacific/Noumea' },
  { code: 'NZ', name: 'New Zealand', zone: 'Pacific/Auckland' },
  { code: 'NI', name: 'Nicaragua', zone: 'America/Managua' },
  { code: 'NE', name: 'Niger', zone: 'Africa/Niamey' },
  { code: 'NG', name: 'Nigeria', zone: 'Africa/Lagos' },
  { code: 'NU', name: 'Niue', zone: 'Pacific/Niue' },
  { code: 'NF', name: 'Norfolk Island', zone: 'Pacific/Norfolk' },
  { code: 'KP', name: 'North Korea', zone: 'Asia/Pyongyang' },
  { code: 'MK', name: 'North Macedonia', zone: 'Europe/Skopje' },
  { code: 'MP', name: 'Northern Mariana Islands', zone: 'Pacific/Saipan' },
  { code: 'NO', name: 'Norway', zone: 'Europe/Oslo' },
  { code: 'OM', name: 'Oman', zone: 'Asia/Muscat' },
  { code: 'PK', name: 'Pakistan', zone: 'Asia/Karachi' },
  { code: 'PW', name: 'Palau', zone: 'Pacific/Palau' },
  { code: 'PS', name: 'Palestine', zone: 'Asia/Gaza' },
  { code: 'PA', name: 'Panama', zone: 'America/Panama' },
  { code: 'PG', name: 'Papua New Guinea', zone: 'Pacific/Port_Moresby' },
  { code: 'PY', name: 'Paraguay', zone: 'America/Asuncion' },
  { code: 'PE', name: 'Peru', zone: 'America/Lima' },
  { code: 'PH', name: 'Philippines', zone: 'Asia/Manila' },
  { code: 'PN', name: 'Pitcairn Islands', zone: 'Pacific/Pitcairn' },
  { code: 'PL', name: 'Poland', zone: 'Europe/Warsaw' },
  { code: 'PT', name: 'Portugal', zone: 'Europe/Lisbon' },
  { code: 'PR', name: 'Puerto Rico', zone: 'America/Puerto_Rico' },
  { code: 'QA', name: 'Qatar', zone: 'Asia/Qatar' },
  { code: 'RE', name: 'Reunion', zone: 'Indian/Reunion' },
  { code: 'RO', name: 'Romania', zone: 'Europe/Bucharest' },
  { code: 'RU', name: 'Russia', zone: 'Europe/Moscow' },
  { code: 'RW', name: 'Rwanda', zone: 'Africa/Kigali' },
  { code: 'BL', name: 'Saint Barthelemy', zone: 'America/St_Barthelemy' },
  { code: 'SH', name: 'Saint Helena', zone: 'Atlantic/St_Helena' },
  { code: 'KN', name: 'Saint Kitts and Nevis', zone: 'America/St_Kitts' },
  { code: 'LC', name: 'Saint Lucia', zone: 'America/St_Lucia' },
  { code: 'MF', name: 'Saint Martin', zone: 'America/Marigot' },
  { code: 'PM', name: 'Saint Pierre and Miquelon', zone: 'America/Miquelon' },
  { code: 'VC', name: 'Saint Vincent and the Grenadines', zone: 'America/St_Vincent' },
  { code: 'WS', name: 'Samoa', zone: 'Pacific/Apia' },
  { code: 'SM', name: 'San Marino', zone: 'Europe/San_Marino' },
  { code: 'ST', name: 'Sao Tome and Principe', zone: 'Africa/Sao_Tome' },
  { code: 'SA', name: 'Saudi Arabia', zone: 'Asia/Riyadh' },
  { code: 'SN', name: 'Senegal', zone: 'Africa/Dakar' },
  { code: 'RS', name: 'Serbia', zone: 'Europe/Belgrade' },
  { code: 'SC', name: 'Seychelles', zone: 'Indian/Mahe' },
  { code: 'SL', name: 'Sierra Leone', zone: 'Africa/Freetown' },
  { code: 'SG', name: 'Singapore', zone: 'Asia/Singapore' },
  { code: 'SX', name: 'Sint Maarten', zone: 'America/Lower_Princes' },
  { code: 'SK', name: 'Slovakia', zone: 'Europe/Bratislava' },
  { code: 'SI', name: 'Slovenia', zone: 'Europe/Ljubljana' },
  { code: 'SB', name: 'Solomon Islands', zone: 'Pacific/Guadalcanal' },
  { code: 'SO', name: 'Somalia', zone: 'Africa/Mogadishu' },
  { code: 'ZA', name: 'South Africa', zone: 'Africa/Johannesburg' },
  { code: 'GS', name: 'South Georgia and South Sandwich Islands', zone: 'Atlantic/South_Georgia' },
  { code: 'KR', name: 'South Korea', zone: 'Asia/Seoul' },
  { code: 'SS', name: 'South Sudan', zone: 'Africa/Juba' },
  { code: 'ES', name: 'Spain', zone: 'Europe/Madrid' },
  { code: 'LK', name: 'Sri Lanka', zone: 'Asia/Colombo' },
  { code: 'SD', name: 'Sudan', zone: 'Africa/Khartoum' },
  { code: 'SR', name: 'Suriname', zone: 'America/Paramaribo' },
  { code: 'SJ', name: 'Svalbard and Jan Mayen', zone: 'Arctic/Longyearbyen' },
  { code: 'SE', name: 'Sweden', zone: 'Europe/Stockholm' },
  { code: 'CH', name: 'Switzerland', zone: 'Europe/Zurich' },
  { code: 'SY', name: 'Syria', zone: 'Asia/Damascus' },
  { code: 'TW', name: 'Taiwan', zone: 'Asia/Taipei' },
  { code: 'TJ', name: 'Tajikistan', zone: 'Asia/Dushanbe' },
  { code: 'TZ', name: 'Tanzania', zone: 'Africa/Dar_es_Salaam' },
  { code: 'TH', name: 'Thailand', zone: 'Asia/Bangkok' },
  { code: 'TL', name: 'Timor-Leste', zone: 'Asia/Dili' },
  { code: 'TG', name: 'Togo', zone: 'Africa/Lome' },
  { code: 'TK', name: 'Tokelau', zone: 'Pacific/Fakaofo' },
  { code: 'TO', name: 'Tonga', zone: 'Pacific/Tongatapu' },
  { code: 'TT', name: 'Trinidad and Tobago', zone: 'America/Port_of_Spain' },
  { code: 'TN', name: 'Tunisia', zone: 'Africa/Tunis' },
  { code: 'TR', name: 'Turkiye', zone: 'Europe/Istanbul' },
  { code: 'TM', name: 'Turkmenistan', zone: 'Asia/Ashgabat' },
  { code: 'TC', name: 'Turks and Caicos Islands', zone: 'America/Grand_Turk' },
  { code: 'TV', name: 'Tuvalu', zone: 'Pacific/Funafuti' },
  { code: 'UG', name: 'Uganda', zone: 'Africa/Kampala' },
  { code: 'UA', name: 'Ukraine', zone: 'Europe/Kyiv' },
  { code: 'AE', name: 'United Arab Emirates', zone: 'Asia/Dubai' },
  { code: 'GB', name: 'United Kingdom', zone: 'Europe/London' },
  { code: 'US', name: 'United States', zone: 'America/New_York' },
  { code: 'UY', name: 'Uruguay', zone: 'America/Montevideo' },
  { code: 'UZ', name: 'Uzbekistan', zone: 'Asia/Tashkent' },
  { code: 'VU', name: 'Vanuatu', zone: 'Pacific/Efate' },
  { code: 'VA', name: 'Vatican City', zone: 'Europe/Vatican' },
  { code: 'VE', name: 'Venezuela', zone: 'America/Caracas' },
  { code: 'VN', name: 'Vietnam', zone: 'Asia/Ho_Chi_Minh' },
  { code: 'VI', name: 'US Virgin Islands', zone: 'America/St_Thomas' },
  { code: 'WF', name: 'Wallis and Futuna', zone: 'Pacific/Wallis' },
  { code: 'EH', name: 'Western Sahara', zone: 'Africa/El_Aaiun' },
  { code: 'YE', name: 'Yemen', zone: 'Asia/Aden' },
  { code: 'ZM', name: 'Zambia', zone: 'Africa/Lusaka' },
  { code: 'ZW', name: 'Zimbabwe', zone: 'Africa/Harare' },
]

/** بحث سريع بالرمز بدل المرور على المصفوفة في كل مرّة */
const BY_CODE = new Map(COUNTRIES.map((c) => [c.code, c]))

export const findCountry = (code) => (code ? (BY_CODE.get(code) ?? null) : null)

/**
 * صورة العلم من ملفات `public/flags/` — صور محلية وليست من خدمة خارجية،
 * فتظهر على كل الأجهزة بنفس الشكل وتعمل حتى لو كانت الشبكة بطيئة.
 */
export const flagSrc = (code) => asset(`/flags/${code.toLowerCase()}.png`)

/**
 * علم الدولة كرمز Emoji — بديل احتياطي إن تعذّر تحميل الصورة.
 * على الأجهزة التي لا ترسم الأعلام (ويندوز مثلًا) يظهر رمز الدولة حرفين.
 */
export const flagOf = (code) =>
  String.fromCodePoint(...[...code].map((ch) => 0x1f1e6 + ch.charCodeAt(0) - 65))

/**
 * فرق التوقيت الحالي عن غرينتش بصيغة GMT+03:00.
 * يُحسب من المتصفّح فيراعي التوقيت الصيفي تلقائيًا.
 * النتيجة مخزَّنة في ذاكرة مؤقتة لأن إنشاء مُنسّق لكل دولة مكلف.
 */
const offsetCache = new Map()

export function offsetOf(zone) {
  const cached = offsetCache.get(zone)
  if (cached) return cached

  let label = 'GMT'
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: zone,
      timeZoneName: 'longOffset',
    }).formatToParts(new Date())

    label = parts.find((p) => p.type === 'timeZoneName')?.value ?? 'GMT'
  } catch {
    // منطقة زمنية غير معروفة للمتصفّح — نكتفي بـ GMT
  }

  offsetCache.set(zone, label)
  return label
}

/** الوقت الحالي في المنطقة الزمنية بصيغة 24 ساعة */
export function timeIn(zone) {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: zone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(new Date())
  } catch {
    return ''
  }
}
