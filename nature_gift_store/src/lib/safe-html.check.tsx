// Self-check of safe-html.tsx: node_modules/.bin/tsx src/lib/safe-html.check.tsx
import assert from 'node:assert/strict'
import { renderToStaticMarkup } from 'react-dom/server'
import { safeHtml } from './safe-html'
import { THANK_YOU_TEMPLATES } from '@ngift/core/thank-you-templates'

// React 19 adds its own image preload <link>: not part of the input.
const html = (input: string) =>
  renderToStaticMarkup(<>{safeHtml(input)}</>).replace(/<link rel="preload"[^>]*>/g, '')

assert.equal(html('<script>alert(1)</script><p>ok</p>'), '<p>ok</p>')
assert.equal(html('<img src="x.png" onerror="alert(1)" ONLOAD="x">'), '<img src="x.png"/>')
assert.equal(html('<a href=" JaVa\tscript:alert(1)">x</a>'), '<a>x</a>')
assert.equal(html('<a href="https://wa.me/237?text=a">x</a>'), '<a href="https://wa.me/237?text=a">x</a>')
assert.equal(html('<a href="data:text/html,<script>x</script>">x</a>'), '<a>x</a>')
assert.ok(html('<img src="data:image/png;base64,AA==">').includes('data:image/png'))
assert.equal(html('<iframe src="https://evil.test"></iframe><iframe srcdoc="<script>"></iframe>'), '')
assert.ok(html('<iframe src="https://www.youtube.com/embed/abc"></iframe>').includes('youtube.com/embed/abc'))
assert.equal(html('<form action="https://evil.test"><input name="p"><button>Go</button></form>'), '')
assert.equal(html('<svg><script>alert(1)</script><a href="javascript:x">y</a></svg>'), '<svg><a>y</a></svg>')
assert.equal(html('<meta http-equiv="refresh" content="0;url=https://evil.test"><base href="//evil">'), '')
// The page's own look stays: inline styles and a style block.
assert.ok(html('<style>.c{color:red}</style><div class="c" style="padding:4px">x</div>').includes('.c{color:red}'))
assert.ok(html('<div style="padding:4px">x</div>').includes('style="padding:4px"'))
// The admin's ready-made thank-you pages come through whole.
for (const t of THANK_YOU_TEMPLATES) {
  const out = html(t.html)
  for (const kept of ['<style>', 'class="ty"', '<h1>', 'href="{{whatsappUrl}}"']) {
    assert.ok(out.includes(kept), `${t.id}: ${kept}`)
  }
}
console.log('safe-html: all checks passed')
