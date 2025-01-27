import { PageView, Conversion, CampaignCost, DeviceInfo, UTMParams } from '@prisma/client'

export class Analytics {
  private visits: Map<string, PageView> = new Map()
  private conversions: Omit<Conversion, 'id'>[] = []
  private campaignCosts: Map<string, Omit<CampaignCost, 'id'>> = new Map()
  private knownDomains = new Map([
    ['facebook.com', 'facebook'],
    ['instagram.com', 'instagram'],
    ['google.com', 'google'],
    ['bing.com', 'bing'],
  ])

  private detectBrowser(userAgent: string): string {
    if (userAgent.includes('Firefox')) return 'Firefox'
    if (userAgent.includes('Chrome')) return 'Chrome'
    if (userAgent.includes('Safari')) return 'Safari'
    return 'Unknown'
  }

  private detectOS(userAgent: string): string {
    if (userAgent.includes('Windows')) return 'Windows'
    if (userAgent.includes('Mac')) return 'MacOS'
    if (userAgent.includes('Linux')) return 'Linux'
    if (userAgent.includes('Android')) return 'Android'
    if (userAgent.includes('iOS')) return 'iOS'
    return 'Unknown'
  }

  private getDeviceInfo(): DeviceInfo {
    const userAgent = navigator.userAgent
    return {
      userAgent,
      screenSize: `${window.screen.width}x${window.screen.height}`,
      browser: this.detectBrowser(userAgent),
      os: this.detectOS(userAgent),
      device: /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile/.test(userAgent)
        ? 'Mobile'
        : 'Desktop',
    }
  }

  private parseUTMParams(url: URL): Omit<UTMParams, 'id'> | undefined {
    const params = url.searchParams
    const source = params.get('utm_source') || 'direct'
    const medium = params.get('utm_medium') || 'none'
    const campaign = params.get('utm_campaign') || 'none'

    if (!source || !medium || !campaign) return undefined

    return {
      source,
      medium,
      campaign,
      term: params.get('utm_term') || undefined,
      content: params.get('utm_content') || undefined,
    }
  }

  startVisit(): string {
    const id = crypto.randomUUID()
    const url = new URL(window.location.href)

    const visit: PageView = {
      id,
      url: url.pathname,
      timestamp: new Date(),
      loadTime: 0,
      timeOnPage: 0,
      isCompleteLoad: false,
      referrer: document.referrer,
      source: this.getSourceFromReferrer(document.referrer),
      deviceInfo: this.getDeviceInfo(),
      utmParams: this.parseUTMParams(url),
      createdAt: new Date(),
    }

    this.visits.set(id, visit)
    this.saveVisit(visit).catch(console.error)
    return id
  }

  private getSourceFromReferrer(referrer: string): string {
    if (!referrer) return 'direct'

    try {
      const url = new URL(referrer)
      for (const [domain, source] of this.knownDomains) {
        if (url.hostname.includes(domain)) return source
      }
      return 'other'
    } catch {
      return 'direct'
    }
  }
  markPageLoaded(visitId: string) {
    const visit = this.visits.get(visitId)
    if (visit) {
      visit.isCompleteLoad = true
      visit.loadTime = performance.now()
      this.saveVisit(visit).catch(console.error)
    }
  }

  endVisit(visitId: string) {
    const visit = this.visits.get(visitId)
    if (visit) {
      visit.timeOnPage = (new Date().getTime() - visit.timestamp.getTime()) / 1000
      this.saveVisit(visit).catch(console.error)
    }
  }

  trackConversion(visitId: string, type: 'purchase' | 'signup' | 'lead', value: number) {
    const conversion: Omit<Conversion, 'id'> = {
      visitId,
      type,
      value,
      timestamp: new Date(),
      createdAt: new Date(),
    }

    this.conversions.push(conversion)
    this.saveConversion(conversion).catch(console.error)
  }

  setCampaignCost(campaign: string, cost: number, startDate: Date, endDate: Date) {
    const campaignCost: Omit<CampaignCost, 'id'> = {
      campaign,
      cost,
      startDate,
      endDate,
      createdAt: new Date(),
    }

    this.campaignCosts.set(campaign, campaignCost)
    this.saveCampaignCost(campaignCost).catch(console.error)
  }

  private async saveVisit(visit: PageView) {
    try {
      const response = await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(visit),
      })

      if (!response.ok) {
        throw new Error(`Failed to save visit: ${response.statusText}`)
      }

      console.log('Visit saved successfully:', visit.id)
    } catch (error) {
      console.error('Failed to save visit:', error)
      throw error
    }
  }

  private async saveConversion(conversion: Omit<Conversion, 'id'>) {
    try {
      const response = await fetch('/api/analytics/conversions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(conversion),
      })

      if (!response.ok) {
        throw new Error(`Failed to save conversion: ${response.statusText}`)
      }

      console.log('Conversion saved successfully')
    } catch (error) {
      console.error('Failed to save conversion:', error)
      throw error
    }
  }

  private async saveCampaignCost(cost: Omit<CampaignCost, 'id'>) {
    try {
      const response = await fetch('/api/analytics/campaign-costs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cost),
      })

      if (!response.ok) {
        throw new Error(`Failed to save campaign cost: ${response.statusText}`)
      }

      console.log('Campaign cost saved successfully')
    } catch (error) {
      console.error('Failed to save campaign cost:', error)
      throw error
    }
  }
}
