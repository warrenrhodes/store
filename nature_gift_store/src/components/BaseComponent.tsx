'use client'

import { useState, useEffect } from 'react'

export default function BaseComponent({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  if (!isHydrated) {
    return <></>
  }
  return <div>{children}</div>
}
