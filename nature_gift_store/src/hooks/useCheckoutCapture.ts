'use client'

import { useSite } from '@/components/Site'
import { CartItem } from '@/hooks/useCart'
import { DeliveryFormData } from '@/lib/utils/validation-form'
import { useEffect, useRef } from 'react'
import { UseFormReturn } from 'react-hook-form'

const STORAGE_KEY = 'checkout-id'
const PHONE = /^(?:\+237|237)?6\d{8}$/

/** One id per checkout session (tab), reused until an order is placed. */
export const getCheckoutId = () => {
  let id = sessionStorage.getItem(STORAGE_KEY)
  if (!id) {
    id = crypto.randomUUID()
    sessionStorage.setItem(STORAGE_KEY, id)
  }
  return id
}
export const resetCheckoutId = () => sessionStorage.removeItem(STORAGE_KEY)

/**
 * Saves the checkout (name, phone, items, area) as soon as the name and a valid phone are
 * typed, debounced, so an unfinished order can be followed up. Sends again when they change.
 */
export function useCheckoutCapture(form: UseFormReturn<DeliveryFormData>, items: CartItem[]) {
  const fullName = form.watch('fullName')
  const phone = form.watch('phone')?.replace(/\s+/g, '')
  const location = form.watch('shipping.location')
  const lastSent = useRef('')
  const { site } = useSite()

  useEffect(() => {
    if (!fullName || fullName.trim().length < 2 || !PHONE.test(phone ?? '') || items.length === 0) {
      return
    }
    const payload = {
      site,
      id: getCheckoutId(),
      fullName: fullName.trim(),
      phone,
      location: location || null,
      source: window.location.pathname + window.location.search,
      items: items.map(i => ({ path: i.product.path, quantity: i.quantity })),
    }
    const key = JSON.stringify(payload)
    if (key === lastSent.current) return
    const timer = setTimeout(() => {
      lastSent.current = key
      fetch('/api/checkouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: key,
        keepalive: true,
      }).catch(() => {})
    }, 1500)
    return () => clearTimeout(timer)
  }, [site, fullName, phone, location, items])
}
