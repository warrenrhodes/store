export const trackEvent = (eventName, params = {}) => {
  if (typeof fbq !== 'function') return
  fbq('track', eventName, params)
}

export const trackCustomEvent = (eventName, params = {}) => {
  if (typeof fbq !== 'function') return
  fbq('trackCustom', eventName, params)
}

// Optional: Track events for specific pixels only
export const trackEventForPixel = (pixelId, eventName, params = {}) => {
  if (typeof fbq !== 'function') return
  fbq('track', eventName, params, { pixelId })
}

export const getAdCampaignFromURL = () => {
  if (typeof window === 'undefined') return {}

  const params = new URLSearchParams(window.location.search)
  return {
    campaign_id: params.get('utm_campaign') || undefined,
    ad_id: params.get('ad_id') || undefined,
    source: params.get('utm_source') || undefined,
  }
}

export const trackPageViewWithSource = () => {
  const campaignData = getAdCampaignFromURL()

  if (typeof fbq !== 'function') return

  // Track regular PageView
  fbq('track', 'PageView')

  // Track custom PageView with ad data
  if (campaignData.ad_id || campaignData.campaign_id) {
    fbq('trackCustom', 'CampaignPageView', {
      ...campaignData,
      page_url: window.location.href,
      timestamp: new Date().toISOString(),
    })
  }
}

export const trackPurchaseWithSource = (order, cartItems) => {
  const campaignData = getAdCampaignFromURL()

  fbq('track', 'Purchase', {
    content_ids: order.items.map(item => item.id),
    userInfo: {
      email: order.userData.email,
      firstName: order.userData.fullName.split(' ')[0],
      lastName: order.userData.fullName.split(' ')[1],
      phone: order.userData.phone,
    },
    contents: cartItems.map(item => ({
      product: item.product.title,
      quantity: item.quantity,
    })),
    num_items: cartItems.length,
    value: order.orderPrices.total,
    currency: 'XAF',
    transaction_id: order.id,
    ...campaignData,
  })
}

export const trackSearch = (params = {}) => {
  if (typeof fbq !== 'function') return

  const campaignData = getAdCampaignFromURL()
  fbq('track', 'Search', {
    ...params,
    ...campaignData,
  })
}

export const trackViewContent = (params = {}) => {
  if (typeof fbq !== 'function') return

  const campaignData = getAdCampaignFromURL()
  fbq('track', 'ViewContent', {
    ...params,
    ...campaignData,
  })
}

export const trackAddToCart = (params = {}) => {
  if (typeof fbq !== 'function') return

  const campaignData = getAdCampaignFromURL()
  fbq('track', 'AddToCart', {
    ...params,
    ...campaignData,
  })
}
export const trackRemoveFromCart = (params = {}) => {
  if (typeof fbq !== 'function') return

  const campaignData = getAdCampaignFromURL()
  fbq('track', 'RemoveFromCart', {
    ...params,
    ...campaignData,
  })
}

export const trackInitiateCheckout = (params = {}) => {
  if (typeof fbq !== 'function') return

  const campaignData = getAdCampaignFromURL()
  fbq('track', 'InitiateCheckout', {
    ...params,
    ...campaignData,
  })
}
