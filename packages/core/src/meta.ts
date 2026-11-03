// Meta (Pixel and Conversions API) refuses the CFA franc ("Currency XAF is not valid"). The
// franc is pegged to the euro (1 EUR = 655.957 XAF, a fixed rate): amounts go to Meta in euros,
// converted exactly. GTM/GA4 events keep XAF. Self-check: meta.check.ts
export const META_CURRENCY = 'EUR'
export const XAF_PER_EUR = 655.957

/** An amount in XAF, in euros to the cent. */
export const toMetaValue = (xaf: number) => Math.round((xaf / XAF_PER_EUR) * 100) / 100
