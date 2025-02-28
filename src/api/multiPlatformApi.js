import XloveCamAffiliate from './xlovecamApi';
import ChaturbateAPI from './chaturbateApi';
import ThirdPlatformAPI from './thirdPlatformApi';
import { API_CONFIGS } from '../config/apiConfig';

class MultiPlatformAffiliateAPI {
  constructor() {
    this.xlovecam = new XloveCamAffiliate(
      API_CONFIGS.xlovecam.affiliateId, 
      API_CONFIGS.xlovecam.secretKey
    );
    this.chaturbate = ChaturbateAPI;
    this.thirdPlatform = new ThirdPlatformAPI(
      API_CONFIGS.thirdplatform.apiKey,
      API_CONFIGS.thirdplatform.baseUrl
    );
  }

  async fetchModelsFromAllPlatforms(filters = {}) {
    try {
      const [xlovecamModels, chaturbateModels, thirdPlatformModels] = await Promise.all([
        this.xlovecam.getOnlineModels(50),
        this.chaturbate.fetchOnlineModels(filters),
        this.thirdPlatform.fetchOnlineModels(filters)
      ]);

      return [
        ...xlovecamModels.map(model => ({
          ...model,
          source: 'xlovecam'
        })),
        ...chaturbateModels,
        ...thirdPlatformModels
      ];
    } catch (error) {
      console.error('Multi-platform model fetch error:', error);
      throw error;
    }
  }

  async getModelDetails(modelId, platform) {
    switch(platform) {
      case 'xlovecam':
        return this.xlovecam.getModelDetails(modelId);
      case 'chaturbate':
        return null; // Chaturbate doesn't provide direct model details API
      case 'thirdplatform':
        return this.thirdPlatform.getModelDetails(modelId);
      default:
        throw new Error('Unsupported platform');
    }
  }

  async applyPlatformFilters(platform, filters = {}) {
    switch(platform) {
      case 'xlovecam':
        return this.xlovecam.getOnlineModels(filters.limit, filters);
      case 'chaturbate':
        return this.chaturbate.filterModels(filters);
      case 'thirdplatform':
        return this.thirdPlatform.applyFilters(filters);
      default:
        throw new Error('Unsupported platform');
    }
  }
}

export default new MultiPlatformAffiliateAPI();
