import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

// eslint-config-next 16 ships flat configs: spread them directly (FlatCompat no longer loads them).
const config = [
  { ignores: ['.history/**', '.next-e2e/**'] },
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      'react-hooks/exhaustive-deps': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@next/next/no-img-element': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      // New in eslint-config-next 16 (React Compiler rules): warnings until the existing
      // code is cleaned up, so lint can gate CI without a code change.
      'react-hooks/preserve-manual-memoization': 'warn',
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/refs': 'warn',
      'react-hooks/immutability': 'warn',
      'react-hooks/purity': 'warn',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'warn',
      '@typescript-eslint/no-require-imports': 'warn',
      'prefer-const': 'warn',
    },
  },
]

export default config
