import axios from 'axios';

class ThirdPlatformAPI {
  constructor(apiKey = '', baseUrl = '') {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl || 'https://api.thirdplatform.com';
    this.defaultHeaders = {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json'
    };
  }

  async fetchOnlineModels(filters = {}) {
    try {
      const response = await axios.get(`${this.baseUrl}/models`, {
        headers: this.defaultHeaders,
        params: {
          online: true,
          limit: 50,
          ...filters
        }
      });

      return response.data.map(model => ({
        id: model.id,
        nickname: model.username,
        age: model.age,
        country: model.country,
        gender: this._mapGender(model.gender),
        isOnline: true,
        image: model.profileImage,
        viewers: model.currentViewers || 0,
        tags: model.tags || [],
        source: 'thirdplatform'
      }));
    } catch (error) {
      console.error('Third Platform API Error:', error);
      throw error;
    }
  }

  _mapGender(gender) {
    const genderMap = {
      'female': 'Female',
      'male': 'Male',
      'trans': 'Trans',
      'couple': 'Couple'
    };
    return genderMap[gender.toLowerCase()] || 'Unknown';
  }

  async getModelDetails(modelId) {
    try {
      const response = await axios.get(`${this.baseUrl}/models/${modelId}`, {
        headers: this.defaultHeaders
      });

      return {
        ...response.data,
        source: 'thirdplatform'
      };
    } catch (error) {
      console.error('Third Platform Model Details Error:', error);
      throw error;
    }
  }

  async applyFilters(filters = {}) {
    return this.fetchOnlineModels(filters);
  }
}

export default ThirdPlatformAPI;
