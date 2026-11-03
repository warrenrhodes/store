#!/usr/bin/env node
// CI guard for storefront links (docs/MULTI_TENANT_PLAN.md, 3.2): a store's pages live under
// /boutique/<slug>, so in nature_gift_store/src every internal link goes through SiteLink,
// useSiteRouter or useSiteHref (src/components/Site.tsx), which add the prefix.
import { readdirSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const SRC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../nature_gift_store/src')
const SKIP = new Set(['components/Site.tsx'])
const RULES = [
  [/from ['"]next\/link['"]/, "next/link: use SiteLink from '@/components/Site'"],
  [/\buseRouter\b[^;]*from ['"]next\/navigation['"]/, 'useRouter: use useSiteRouter'],
  [/\bredirect\(\s*['"`]\/(?!\/)/, "redirect('/…'): use siteHref(site, path)"],
  [/<a\s[^>]*?\bhref=\{?\s*['"`]\/(?!\/)/, '<a href="/…">: use SiteLink'],
]

const offenders = []
const walk = dir => {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name)
    const rel = path.relative(SRC, full).split(path.sep).join('/')
    if (statSync(full).isDirectory()) {
      if (rel !== 'components/ui') walk(full)
    } else if (/\.(ts|tsx)$/.test(name) && !SKIP.has(rel)) {
      const text = readFileSync(full, 'utf8')
      for (const [rule, fix] of RULES) if (rule.test(text)) offenders.push(`  src/${rel}: ${fix}`)
    }
  }
}
walk(SRC)

if (offenders.length) {
  console.error('Storefront links that would leave the store (see src/components/Site.tsx):')
  console.error(offenders.join('\n'))
  process.exit(1)
}
console.log('check-store-links: every storefront link keeps its site')
