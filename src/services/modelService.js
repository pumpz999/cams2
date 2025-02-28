import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://api.xxxcams.org';

export const modelService = {
  async getModels(filters = {}) {
    try {
      const response = await axios.get(`${BASE_URL}/models`, { 
        params: filters 
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch models';
    }
  },

  async getModelDetails(modelId) {
    try {
      const response = await axios.get(`${BASE_URL}/models/${modelId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch model details';
    }
  },

  async createModel(modelData) {
    try {
      const response = await axios.post(`${BASE_URL}/models`, modelData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to create model';
    }
  },

  async updateModel(modelId, modelData) {
    try {
      const response = await axios.put(`${BASE_URL}/models/${modelId}`, modelData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to update model';
    }
  }
};
