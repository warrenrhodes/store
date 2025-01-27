import { Analytics } from './Analytics'

declare global {
  interface Window {
    analytics: Analytics
  }
}
