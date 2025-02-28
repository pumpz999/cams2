export const AFFILIATE_PLATFORMS = {
  xlovecam: {
    name: 'XloveCam',
    baseUrl: 'https://xlovecam.com/c/go/',
    affiliateId: '24010',
    trackingParam: 'ref',
    commissionRates: {
      registration: 0.50,
      revenue: 0.20
    },
    requiredParams: ['model']
  },
  chaturbate: {
    name: 'Chaturbate',
    baseUrl: 'https://chaturbate.com/affiliate/',
    affiliateId: 'UVYnr',
    trackingParam: 'track',
    commissionRates: {
      registration: 0.60,
      revenue: 0.25
    },
    requiredParams: ['model']
  },
  stripchat: {
    name: 'Stripchat',
    baseUrl: 'https://stripchat.com/affiliate/',
    affiliateId: null,
    trackingParam: 'aff',
    commissionRates: {
      registration: 0.55,
      revenue: 0.22
    },
    requiredParams: ['model']
  }
};

export const validateAffiliateLink = (platform, params) => {
  const platformConfig = AFFILIATE_PLATFORMS[platform];
  if (!platformConfig) {
    throw new Error(`Unsupported platform: ${platform}`);
  }

  // Check required parameters
  platformConfig.requiredParams.forEach(param => {
    if (!params[param]) {
      throw new Error(`Missing required parameter: ${param}`);
    }
  });

  return true;
};
