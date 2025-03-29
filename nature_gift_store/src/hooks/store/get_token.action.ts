'use server'

import { clientConfig, serverConfig } from 'config'
import { getTokens, Tokens } from 'next-firebase-auth-edge'
import { cookies } from 'next/headers'

export async function getEdgeToken(): Promise<Tokens | undefined> {
  const token = await getTokens(await cookies(), {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  })

  return token
}
