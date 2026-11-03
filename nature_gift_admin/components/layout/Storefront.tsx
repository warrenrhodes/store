'use client'

import { PLATFORM_URL } from '@/lib/storefront'
import { createContext, useContext } from 'react'

type Storefront = { url: string; name: string }

const StorefrontContext = createContext<Storefront>({ url: PLATFORM_URL, name: 'N.Gift' })

/** The current store's public address and name, for the links and messages the admin copies. */
export const StorefrontProvider = ({
  value,
  children,
}: {
  value: Storefront
  children: React.ReactNode
}) => <StorefrontContext.Provider value={value}>{children}</StorefrontContext.Provider>

export const useStorefront = () => useContext(StorefrontContext)
