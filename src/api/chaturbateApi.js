import axios from 'axios';
import { API_CONFIGS } from '../config/apiConfig';

class ChaturbateAPI {
  constructor() {
    this.config = API_CONFIGS.chaturbate;
  }

  async fetchOnlineModels(filters = {}) {
    try {
      const params = {
        ...this.config.defaultParams,
        wm: this.config.wm,
        ...filters
      };

      const response = await axios.get(this.config.baseUrl, { 
        params 
      });

      return response.data.results.map(model => ({
        id: model.username,
        nickname: model.username,
        age: model.age,
        country: model.country,
        gender: this._mapGender(model.gender),
        isOnline: model.current_show === 'public',
        image: model.image_url_360x270,
        viewers: model.num_users,
        tags: model.tags,
        languages: model.spoken_languages,
        source: 'chaturbate'
      }));
    } catch (error) {
      console.error('Chaturbate API Error:', error);
      throw error;
    }
  }

  _mapGender(gender) {
    const genderMap = {
      'f': 'Female',
      'm': 'Male', 
      't': 'Trans',
      'c': 'Couple'
    };
    return genderMap[gender] || 'Unknown';
  }

  // Additional methods for filtering and advanced querying
  async filterModels(options = {}) {
    const filters = {
      ...(options.gender ? { gender: options.gender } : {}),
      ...(options.region ? { region: options.region } : {}),
      ...(options.hd ? { hd: options.hd } : {}),
      ...(options.tags ? { tag: options.tags } : {})
    };

    return this.fetchOnlineModels(filters);
  }
}

export default new ChaturbateAPI();
