'use client'

import { useEffect } from 'react'

/**
 * In a theme preview (the admin's iframe), applies the colors, radius and font the editor sends
 * as you pick them, before they are saved. Only messages from the admin's origin, only CSS
 * variables with plain values (HSL triples, rem, var(--font-…)).
 */
export function ThemePreviewListener({ adminOrigin }: { adminOrigin: string }) {
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== adminOrigin || event.data?.type !== 'ngift-theme-preview') return
      for (const [name, value] of Object.entries(event.data.vars ?? {})) {
        if (
          /^--[a-z-]{1,40}$/.test(name) &&
          typeof value === 'string' &&
          /^[\w%.() -]{1,60}$/.test(value)
        ) {
          document.documentElement.style.setProperty(name, value)
        }
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [adminOrigin])
  return null
}
