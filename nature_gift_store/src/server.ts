import next from 'next'
import nextBuild from 'next/dist/build'
import path from 'path'
import { loadEnvConfig } from '@next/env'

const projectDir = process.cwd()
loadEnvConfig(projectDir)

import express from 'express'

const app = express()
const PORT = process.env.PORT || 3001

const start = async (): Promise<void> => {
  if (process.env.NEXT_BUILD) {
    app.listen(PORT, async () => {
      // @ts-expect-error
      await nextBuild(path.join(__dirname, '../'))
      process.exit()
    })

    return
  }

  const nextApp = next({
    dev: process.env.NODE_ENV !== 'production',
  })

  const nextHandler = nextApp.getRequestHandler()

  app.use((req, res) => nextHandler(req, res))

  nextApp.prepare().then(() => {
    console.info('Starting Next.js...')

    app.listen(PORT, async () => {
      console.info(`Next.js App URL: ${process.env.NEXT_PUBLIC_ECOMMERCE_STORE_URL}`)
    })
  })
}

start()
