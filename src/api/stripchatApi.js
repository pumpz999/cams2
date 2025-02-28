import axios from 'axios';

const getSettings = () => {
  const settings = JSON.parse(localStorage.getItem('apiSettings') || '{}');
  return settings.stripchat || {};
};

let accessToken = null;

const getAccessToken = async () => {
  const { clientId, clientSecret } = getSettings();
  
  if (!clientId || !clientSecret) {
    throw new Error('Stripchat credentials not configured');
  }

  if (accessToken) return accessToken;

  const response = await axios.post('https://stripchat.com/api/auth/token', {
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'client_credentials'
  });

  accessToken = response.data.access_token;
  return accessToken;
};

export const getModels = async (params = {}) => {
  try {
    const token = await getAccessToken();
    const response = await axios.get('https://stripchat.com/api/front/v1/models', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params
    });
    return response.data.models;
  } catch (error) {
    console.error('Error fetching Stripchat models:', error);
    throw error;
  }
};

// ... rest of the stripchatApi.js code ...
