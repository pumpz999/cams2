import axios from 'axios';
import md5 from 'md5';

const XLOVECAM_API_BASE = 'https://webservice-affiliate.xlovecam.com';

class XloveCamAffiliate {
  constructor(affiliateId, secretKey) {
    this.affiliateId = affiliateId;
    this.secretKey = secretKey;
  }

  _generateAuthParams() {
    const timestamp = Math.floor(Date.now() / 1000);
    return {
      authServiceId: '2',
      authItemId: this.affiliateId,
      authSecret: md5(`${this.affiliateId}${this.secretKey}${timestamp}`),
      timestamp: timestamp
    };
  }

  async fetchModelList(params = {}) {
    try {
      const response = await axios.post(`${XLOVECAM_API_BASE}/model/filterList/`, {
        ...this._generateAuthParams(),
        lang: 'en',
        ...params
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      return response.data.content;
    } catch (error) {
      console.error('XloveCam Model Fetch Error:', error);
      throw error;
    }
  }

  async getOnlineModels(limit = 50) {
    return this.fetchModelList({ 
      limit: limit,
      online: 1 
    });
  }

  async getModelDetails(modelIds) {
    try {
      const response = await axios.post(`${XLOVECAM_API_BASE}/model/getprofileinfo/`, {
        ...this._generateAuthParams(),
        modelid: Array.isArray(modelIds) ? modelIds.join(',') : modelIds
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      return response.data.content;
    } catch (error) {
      console.error('XloveCam Model Details Error:', error);
      throw error;
    }
  }
}

export default XloveCamAffiliate;
