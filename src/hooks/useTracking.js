import { useState } from 'react';
import trackingService from '../services/trackingService';

export const useTracking = () => {
  const [trackingId, setTrackingId] = useState(null);

  const trackRegistration = async (registrationData) => {
    try {
      const id = await trackingService.trackRegistration(registrationData);
      setTrackingId(id);
      return id;
    } catch (error) {
      console.error('Registration tracking failed:', error);
      return null;
    }
  };

  const trackConversion = async (conversionData) => {
    try {
      const id = await trackingService.trackConversion(conversionData);
      setTrackingId(id);
      return id;
    } catch (error) {
      console.error('Conversion tracking failed:', error);
      return null;
    }
  };

  const trackClick = async (clickData) => {
    try {
      const id = await trackingService.trackClick(clickData);
      setTrackingId(id);
      return id;
    } catch (error) {
      console.error('Click tracking failed:', error);
      return null;
    }
  };

  return {
    trackingId,
    trackRegistration,
    trackConversion,
    trackClick
  };
};
