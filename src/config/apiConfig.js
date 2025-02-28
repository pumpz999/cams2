export const API_CONFIGS = {
  xlovecam: {
    affiliateId: '24010',
    secretKey: 'd87ac7785760d9190ca3b4d366980ec2',
    baseUrl: 'https://webservice-affiliate.xlovecam.com'
  },
  chaturbate: {
    wm: 'UVYnr',
    baseUrl: 'https://chaturbate.com/api/public/affiliates/onlinerooms/',
    defaultParams: {
      format: 'json',
      limit: 100,
      client_ip: 'request_ip'
    }
  },
  thirdplatform: {
    apiKey: '', // Placeholder for third platform API key
    baseUrl: 'https://api.thirdplatform.com'
  }
};
