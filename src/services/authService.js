import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://api.xxxcams.org';

export const authService = {
  async login(email, password) {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, { 
        email, 
        password 
      });
      return response.data.token;
    } catch (error) {
      throw error.response?.data?.message || 'Login failed';
    }
  },

  async register(userData) {
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Registration failed';
    }
  },

  async resetPassword(email) {
    try {
      const response = await axios.post(`${BASE_URL}/auth/reset-password`, { email });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Password reset failed';
    }
  }
};
