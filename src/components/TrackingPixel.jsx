import React, { useEffect } from 'react';
import { useTracking } from '../hooks/useTracking';

const TrackingPixel = ({ 
  platform, 
  modelId, 
  affiliateId 
}) => {
  const { trackClick } = useTracking();

  useEffect(() => {
    const trackPageView = async () => {
      await trackClick({
        platform,
        modelId,
        affiliateId,
        referralUrl: window.location.href,
        ipAddress: 'auto' // Will be replaced by server-side IP detection
      });
    };

    trackPageView();
  }, [platform, modelId, affiliateId]);

  return null; // Invisible pixel component
};

export default TrackingPixel;
