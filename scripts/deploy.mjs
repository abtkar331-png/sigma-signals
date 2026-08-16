/**
 * نشر التطبيق على GitHub Pages من الجهاز مباشرة.
 *
 * يبني، يدفع إلى فرع gh-pages، ثم ينتظر حتى يصبح الإصدار الجديد
 * على الهواء فعلًا — لا يكتفي بنجاح الدفع.
 *
 * التشغيل:  npm run deploy
 */

import { execFileSync } from 'node:child_process'
import { cpSync, mkdtempSync, rmSync, writeFileSync, copyFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const BRANCH = 'gh-pages'
const BUILD_ID = String(Date.now())

const run = (cmd, args, opts = {}) => execFileSync(cmd, args, { stdio: 'inherit', ...opts })
const out = (cmd, args) => execFileSync(cmd, args, { encoding: 'utf8' }).trim()

const origin = out('git', ['remote', 'get-url', 'origin']).replace(/\.git$/, '')
const REPO = origin.split('/').pop()
const OWNER = origin.split('/').at(-2)
const SITE = `https://${OWNER}.github.io/${REPO}/`

const started = Date.now()
const since = () => `${((Date.now() - started) / 1000).toFixed(0)}س`

console.log(`\n▸ بناء الإصدار ${BUILD_ID}`)
run('npm', ['run', 'build'], {
  shell: process.platform === 'win32',
  env: { ...process.env, VITE_BASE_PATH: `/${REPO}/`, BUILD_ID },
})

// نفس البصمة المحقونة في الحزمة — عليها يقارن التطبيق ليعرف أن نسخة أحدث نُشرت
writeFileSync('dist/version.json', JSON.stringify({ build: BUILD_ID }))
writeFileSync('dist/.nojekyll', '')
copyFileSync('dist/index.html', 'dist/404.html')

/*
  النشر داخل شجرة عمل مؤقّتة منفصلة: تبديل الفروع داخل مجلد المشروع
  يعرّض ملفات المصدر للحذف، أمّا الشجرة المؤقّتة فمعزولة تمامًا.
*/
const work = mkdtempSync(join(tmpdir(), 'pages-'))

try {
  run('git', ['worktree', 'add', '-q', '--detach', work])
  run('git', ['-C', work, 'checkout', '-q', '--orphan', `pages-${process.pid}`])
  run('git', ['-C', work, 'rm', '-rq', '--cached', '.'])

  cpSync('dist', work, { recursive: true })

  run('git', ['-C', work, 'add', '-A'])
  run('git', ['-C', work, 'commit', '-q', '-m', `نشر ${BUILD_ID}`])
  run('git', ['-C', work, 'push', '-q', '--force', 'origin', `HEAD:${BRANCH}`])
  console.log(`▸ دُفع إلى ${BRANCH} (${since()})`)
} finally {
  run('git', ['worktree', 'remove', '--force', work])
  rmSync(work, { recursive: true, force: true })
}

// GitHub لا يبني فورًا بعد الدفع؛ الطلب الصريح يختصر الانتظار
try {
  execFileSync('gh', ['api', '-X', 'POST', `repos/${OWNER}/${REPO}/pages/builds`], {
    stdio: 'ignore',
  })
} catch {
  // قد يكون هناك بناء قيد التنفيذ — لا ضرر
}

console.log('▸ في انتظار نشر GitHub...')

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
let live = false

for (let i = 0; i < 60; i++) {
  await sleep(3000)
  try {
    const res = await fetch(`${SITE}version.json?t=${Date.now()}`, { cache: 'no-store' })
    if (res.ok && (await res.json()).build === BUILD_ID) {
      live = true
      break
    }
  } catch {
    // الموقع قيد إعادة البناء — نواصل الانتظار
  }
}

if (live) {
  console.log(`\n✓ التحديث على الهواء (${since()})`)
  console.log(`  ${SITE}`)
  console.log('  المستخدمون المفتوح عندهم التطبيق يأخذونه خلال دقيقتين دون تدخّل.')
} else {
  console.error('\n✗ انتهت المهلة ولم يظهر الإصدار الجديد. راجِع حالة Pages.')
  process.exitCode = 1
}
