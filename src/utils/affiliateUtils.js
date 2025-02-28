export const generateAffiliateLink = (platform, modelId, affiliateId) => {
  const platformDomains = {
    xlovecam: 'https://xlovecam.com/model/',
    chaturbate: 'https://chaturbate.com/model/',
    stripchat: 'https://stripchat.com/model/'
  };

  const baseUrl = platformDomains[platform] || platformDomains.xlovecam;
  
  return `${baseUrl}${modelId}?aid=${affiliateId}`;
};

export const extractAffiliateParams = (url) => {
  const urlParams = new URLSearchParams(new URL(url).search);
  return {
    affiliateId: urlParams.get('aid'),
    platform: urlParams.get('platform'),
    trackingId: urlParams.get('tid')
  };
};
