/**
 * نشر التطبيق على GitHub Pages من الجهاز مباشرة.
 *
 * لماذا لا نستخدم GitHub Actions؟
 * موجود ملف سير عمل جاهز في `.github/workflows/deploy.yml`، لكنه يحتاج
 * تفعيل الفوترة على حساب GitHub. حتى ذلك الحين يبني هذا السكربت المشروع
 * محليًا ويدفع مجلد dist إلى فرع gh-pages.
 *
 * التشغيل:  npm run deploy
 */

import { execFileSync } from 'node:child_process'
import { cpSync, mkdtempSync, rmSync, writeFileSync, copyFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const BRANCH = 'gh-pages'

// اسم المستودع يحدّد المسار الفرعي على Pages
const REPO = execFileSync('git', ['remote', 'get-url', 'origin'], { encoding: 'utf8' })
  .trim()
  .replace(/\.git$/, '')
  .split('/')
  .pop()

const run = (cmd, args, opts = {}) =>
  execFileSync(cmd, args, { stdio: 'inherit', ...opts })

console.log(`\n▸ بناء المشروع للمسار /${REPO}/`)
run('npm', ['run', 'build'], {
  shell: process.platform === 'win32',
  env: { ...process.env, VITE_BASE_PATH: `/${REPO}/` },
})

// ‎.nojekyll‎ يمنع GitHub من تجاهل الملفات التي تبدأ بشرطة سفلية
writeFileSync('dist/.nojekyll', '')
// أي مسار غير موجود يعيد نفس الصفحة — التطبيق صفحة واحدة
copyFileSync('dist/index.html', 'dist/404.html')

/*
  النشر داخل مجلد مؤقّت منفصل وليس في مجلد المشروع.
  تبديل الفروع داخل مجلد العمل نفسه يعرّض ملفات المصدر للحذف،
  أما شجرة العمل المؤقّتة فمعزولة تمامًا.
*/
const work = mkdtempSync(join(tmpdir(), 'pages-'))

try {
  run('git', ['worktree', 'add', '-q', '--detach', work])

  /*
    فرع مؤقّت باسم فريد ثم يُدفع إلى gh-pages مباشرة.
    استخدام اسم gh-pages محليًا يفشل عند تكرار النشر لأن الفرع يبقى موجودًا،
    والدفع بصيغة HEAD:gh-pages يغني عن الاحتفاظ به أصلًا.
  */
  run('git', ['-C', work, 'checkout', '-q', '--orphan', `pages-${process.pid}`])
  run('git', ['-C', work, 'rm', '-rq', '--cached', '.'])

  cpSync('dist', work, { recursive: true })

  run('git', ['-C', work, 'add', '-A'])
  run('git', ['-C', work, 'commit', '-q', '-m', 'نشر الإصدار المبني — SIGNAL PRO'])
  run('git', ['-C', work, 'push', '-q', '--force', 'origin', `HEAD:${BRANCH}`])

  console.log(`\n✓ تم النشر: https://${process.env.GH_USER ?? 'abtkar331-png'}.github.io/${REPO}/`)
} finally {
  run('git', ['worktree', 'remove', '--force', work])
  rmSync(work, { recursive: true, force: true })
}
