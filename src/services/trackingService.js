import axios from 'axios';

class S2STrackingService {
  constructor() {
    // Default tracking endpoints (to be configured)
    this.endpoints = {
      xlovecam: 'https://track.xlovecam.com/s2s',
      chaturbate: 'https://track.chaturbate.com/s2s',
      stripchat: 'https://track.stripchat.com/s2s'
    };
  }

  // Generate unique tracking ID
  generateTrackingId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // Track registration event
  async trackRegistration(data) {
    const trackingPayload = {
      trackingId: this.generateTrackingId(),
      timestamp: new Date().toISOString(),
      type: 'registration',
      platform: data.platform,
      affiliateId: data.affiliateId,
      userData: {
        username: data.username,
        email: data.email,
        referralSource: data.referralSource
      }
    };

    try {
      const responses = await Promise.all(
        Object.entries(this.endpoints).map(([platform, endpoint]) => 
          axios.post(`${endpoint}/register`, {
            ...trackingPayload,
            platform
          }).catch(error => ({
            platform,
            error: error.message
          }))
        )
      );

      this._logTrackingResponses(responses);
      return trackingPayload.trackingId;
    } catch (error) {
      console.error('S2S Registration Tracking Error:', error);
      throw error;
    }
  }

  // Track conversion event
  async trackConversion(data) {
    const trackingPayload = {
      trackingId: this.generateTrackingId(),
      timestamp: new Date().toISOString(),
      type: 'conversion',
      platform: data.platform,
      affiliateId: data.affiliateId,
      conversionData: {
        revenue: data.revenue,
        modelId: data.modelId,
        conversionType: data.conversionType
      }
    };

    try {
      const responses = await Promise.all(
        Object.entries(this.endpoints).map(([platform, endpoint]) => 
          axios.post(`${endpoint}/convert`, {
            ...trackingPayload,
            platform
          }).catch(error => ({
            platform,
            error: error.message
          }))
        )
      );

      this._logTrackingResponses(responses);
      return trackingPayload.trackingId;
    } catch (error) {
      console.error('S2S Conversion Tracking Error:', error);
      throw error;
    }
  }

  // Track click event
  async trackClick(data) {
    const trackingPayload = {
      trackingId: this.generateTrackingId(),
      timestamp: new Date().toISOString(),
      type: 'click',
      platform: data.platform,
      affiliateId: data.affiliateId,
      clickData: {
        modelId: data.modelId,
        referralUrl: data.referralUrl,
        userAgent: navigator.userAgent,
        ipAddress: data.ipAddress
      }
    };

    try {
      const responses = await Promise.all(
        Object.entries(this.endpoints).map(([platform, endpoint]) => 
          axios.post(`${endpoint}/click`, {
            ...trackingPayload,
            platform
          }).catch(error => ({
            platform,
            error: error.message
          }))
        )
      );

      this._logTrackingResponses(responses);
      return trackingPayload.trackingId;
    } catch (error) {
      console.error('S2S Click Tracking Error:', error);
      throw error;
    }
  }

  // Log tracking responses for monitoring
  _logTrackingResponses(responses) {
    responses.forEach(response => {
      if (response.error) {
        console.warn(`Tracking failed for ${response.platform}:`, response.error);
      } else {
        console.log(`Tracking successful for ${response.platform}`);
      }
    });
  }

  // Configure tracking endpoints
  setTrackingEndpoints(endpoints) {
    this.endpoints = {
      ...this.endpoints,
      ...endpoints
    };
  }
}

export default new S2STrackingService();
