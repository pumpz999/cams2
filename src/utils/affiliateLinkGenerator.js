import { v4 as uuidv4 } from 'uuid';

class AffiliateLinkGenerator {
  constructor() {
    this.affiliateConfigs = {
      xlovecam: {
        baseUrl: 'https://xlovecam.com/c/go/',
        affiliateId: '24010',
        trackingParam: 'ref'
      },
      chaturbate: {
        baseUrl: 'https://chaturbate.com/affiliate/',
        affiliateId: 'UVYnr',
        trackingParam: 'track'
      },
      stripchat: {
        baseUrl: 'https://stripchat.com/affiliate/',
        affiliateId: null, // Placeholder
        trackingParam: 'aff'
      }
    };
  }

  generateTrackingCode() {
    return uuidv4();
  }

  generateAffiliateLink(options = {}) {
    const { 
      platform = 'xlovecam', 
      modelId, 
      customAffiliateId,
      additionalParams = {} 
    } = options;

    const config = this.affiliateConfigs[platform];
    if (!config) {
      throw new Error(`Unsupported platform: ${platform}`);
    }

    // Use custom affiliate ID or default
    const affiliateId = customAffiliateId || config.affiliateId;
    if (!affiliateId) {
      throw new Error(`No affiliate ID configured for ${platform}`);
    }

    // Generate tracking code
    const trackingCode = this.generateTrackingCode();

    // Construct base URL
    const url = new URL(config.baseUrl);

    // Add affiliate tracking parameter
    url.searchParams.set(config.trackingParam, affiliateId);

    // Add model-specific parameters if provided
    if (modelId) {
      url.searchParams.set('model', modelId);
    }

    // Add tracking code
    url.searchParams.set('tid', trackingCode);

    // Add any additional custom parameters
    Object.entries(additionalParams).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });

    return {
      fullLink: url.toString(),
      trackingCode: trackingCode,
      platform: platform
    };
  }

  parseAffiliateLink(link) {
    try {
      const url = new URL(link);
      const params = Object.fromEntries(url.searchParams);

      // Detect platform
      const platform = Object.keys(this.affiliateConfigs).find(p => 
        link.includes(this.affiliateConfigs[p].baseUrl)
      );

      return {
        platform,
        affiliateId: params[this.affiliateConfigs[platform]?.trackingParam],
        modelId: params.model,
        trackingCode: params.tid,
        additionalParams: params
      };
    } catch (error) {
      console.error('Invalid affiliate link:', error);
      return null;
    }
  }

  // Track link generation
  trackLinkGeneration(linkData) {
    // Optional: Implement server-side or client-side tracking
    console.log('Affiliate Link Generated:', linkData);
    
    // You could send this to a tracking service
    // trackingService.logLinkGeneration(linkData);
  }
}

export default new AffiliateLinkGenerator();
