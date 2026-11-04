// HTML written by a store (thank-you pages) as React elements, without what could run code or
// act for the customer: scripts, event handlers, javascript: links, forms, frames other than
// YouTube/Vimeo players, <meta>/<base>/<link>. Styles stay (the page's own look). Self-check:
// safe-html.check.tsx
import parse, { DOMNode, Element } from 'html-react-parser'
import { Fragment } from 'react'

const DROPPED = new Set([
  'script', 'object', 'embed', 'applet', 'base', 'meta', 'link', 'form', 'input', 'textarea',
  'select', 'button', 'frame', 'frameset', 'noscript', 'template', 'portal',
])
const PLAYER = /^https:\/\/(www\.youtube(-nocookie)?\.com\/embed\/|player\.vimeo\.com\/video\/)/
const URL_ATTRS = new Set(['href', 'src', 'xlink:href', 'action', 'formaction', 'poster', 'background', 'srcset'])

/** No javascript:/vbscript:, and data: only for images (browsers ignore spaces and controls in schemes). */
const safeUrl = (value: string) => {
  const url = value.replace(/[\u0000- ]/g, '').toLowerCase()
  return !/^(javascript|vbscript):/.test(url) && (!url.startsWith('data:') || url.startsWith('data:image/'))
}

const clean = (node: DOMNode) => {
  if (!(node instanceof Element)) return
  const name = node.name.toLowerCase()
  if (DROPPED.has(name) || (name === 'iframe' && !PLAYER.test(node.attribs.src ?? ''))) {
    return <Fragment />
  }
  // Read after this call by the parser: what is deleted here is never rendered.
  for (const key of Object.keys(node.attribs)) {
    const attr = key.toLowerCase()
    if (attr.startsWith('on') || attr === 'srcdoc' || (URL_ATTRS.has(attr) && !safeUrl(node.attribs[key]))) {
      delete node.attribs[key]
    }
  }
}

export const safeHtml = (html: string) => parse(html, { replace: clean })
