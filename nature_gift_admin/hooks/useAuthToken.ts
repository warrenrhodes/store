import { useAuth } from '@clerk/nextjs'
import { useState } from 'react'

import { useEffect } from 'react'

function useAuthToken() {
  const { getToken } = useAuth()
  const [token, setToken] = useState<string | null>(null)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const tokenValue = await getToken()
        setToken(tokenValue)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to get token'))
      }
    }

    fetchToken()
  }, [getToken])

  return { token, error }
}

export default useAuthToken
