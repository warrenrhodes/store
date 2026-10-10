import type { Data } from '@puckeditor/core'

// The store renders `content` as plain HTML, so the builder saves the rendered
// HTML plus its own JSON in an inert script tag, which lets the page be re-opened.
const MARKER = 'data-puck="v1"'
const DATA_RE = /<script type="application\/json" data-puck="v1">([\s\S]*?)<\/script>/

export const isPuckContent = (html: string) => html.includes(MARKER)

export function readPuckData(html: string): Data {
  const match = html.match(DATA_RE)
  if (match) return JSON.parse(match[1])
  // Legacy HTML (Jodit/hand-written): import it as one editable block.
  return {
    root: { props: {} },
    content: html.trim() ? [{ type: 'RawHtml', props: { id: 'legacy-html', html } }] : [],
  }
}

export function writePuckContent(renderedHtml: string, data: Data) {
  // Escaping `<` keeps `</script>` inside the JSON from closing the tag.
  const json = JSON.stringify(data).replace(/</g, '\\u003c')
  return `${renderedHtml}<script type="application/json" ${MARKER}>${json}</script>`
}

// Firestore caps a document at 1 MiB; leave room for the blog's other fields.
const MAX_CONTENT_BYTES = 900 * 1024

/** Returns a message when the content is too big to save, otherwise null. */
export function contentSizeError(html: string) {
  const bytes = new Blob([html]).size
  if (bytes <= MAX_CONTENT_BYTES) return null
  const pasted = html.match(/data:(?:image|video)\/[a-z+.-]+;base64,/gi)?.length ?? 0
  return (
    `This content is ${Math.round(bytes / 1024)} KB, over the ~900 KB limit. ` +
    (pasted
      ? `${pasted} image(s) are pasted inside the text: upload them instead so only their link is stored.`
      : 'Split it into several posts or remove some blocks.')
  )
}
