import { v4 as uuidv4 } from 'uuid';
import { AFFILIATE_PLATFORMS, validateAffiliateLink } from '../utils/affiliatePlatforms';

class AffiliateLinkService {
  constructor() {
    this.linkHistory = [];
  }

  generateAffiliateLink(options = {}) {
    const { 
      platform = 'xlovecam', 
      modelId, 
      customAffiliateId,
      additionalParams = {} 
    } = options;

    const platformConfig = AFFILIATE_PLATFORMS[platform];
    if (!platformConfig) {
      throw new Error(`Unsupported platform: ${platform}`);
    }

    // Validate required parameters
    validateAffiliateLink(platform, { model: modelId, ...additionalParams });

    // Use custom affiliate ID or default
    const affiliateId = customAffiliateId || platformConfig.affiliateId;
    if (!affiliateId) {
      throw new Error(`No affiliate ID configured for ${platform}`);
    }

    // Generate tracking code
    const trackingCode = this.generateTrackingCode();

    // Construct base URL
    const url = new URL(platformConfig.baseUrl);

    // Add affiliate tracking parameter
    url.searchParams.set(platformConfig.trackingParam, affiliateId);

    // Add model-specific parameters
    url.searchParams.set('model', modelId);

    // Add tracking code
    url.searchParams.set('tid', trackingCode);

    // Add any additional custom parameters
    Object.entries(additionalParams).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });

    const linkData = {
      fullLink: url.toString(),
      trackingCode: trackingCode,
      platform: platform,
      createdAt: new Date(),
      modelId: modelId,
      affiliateId: affiliateId
    };

    // Store link history
    this.storeLinkHistory(linkData);

    return linkData;
  }

  generateTrackingCode() {
    return uuidv4();
  }

  storeLinkHistory(linkData) {
    this.linkHistory.push(linkData);
    
    // Optional: Persist to localStorage or send to backend
    try {
      localStorage.setItem('affiliateLinkHistory', JSON.stringify(this.linkHistory));
    } catch (error) {
      console.error('Failed to store link history:', error);
    }
  }

  getLinkHistory() {
    try {
      const storedHistory = localStorage.getItem('affiliateLinkHistory');
      return storedHistory ? JSON.parse(storedHistory) : this.linkHistory;
    } catch (error) {
      console.error('Failed to retrieve link history:', error);
      return this.linkHistory;
    }
  }

  calculatePotentialEarnings(platform, params) {
    const platformConfig = AFFILIATE_PLATFORMS[platform];
    if (!platformConfig) {
      throw new Error(`Unsupported platform: ${platform}`);
    }

    return {
      registrationCommission: platformConfig.commissionRates.registration,
      revenueSharePercentage: platformConfig.commissionRates.revenue,
      estimatedRegistrationEarning: platformConfig.commissionRates.registration,
      estimatedRevenueSharing: params.expectedRevenue 
        ? params.expectedRevenue * platformConfig.commissionRates.revenue 
        : 0
    };
  }
}

export default new AffiliateLinkService();
