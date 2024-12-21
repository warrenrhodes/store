import { loadEnvConfig } from '@next/env'

const projectDir = process.cwd()
const { combinedEnv } = loadEnvConfig(projectDir)

// Export loaded env vars
export const env = {
  DATABASE_URL: combinedEnv.DATABASE_URL,
  OPTIMIZE_API_KEY: combinedEnv.OPTIMIZE_API_KEY,
  // Add other env vars as needed
}

// Log to verify env loading
if (!env.DATABASE_URL || !env.OPTIMIZE_API_KEY) {
  console.error('env DATABASE_URL or OPTIMIZE_API_KEY is not defined in environment')
}
