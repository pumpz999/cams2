import { useState, useCallback } from 'react';
import affiliateLinkService from '../services/affiliateLinkService';

export const useAffiliateLink = () => {
  const [generatedLink, setGeneratedLink] = useState(null);
  const [linkHistory, setLinkHistory] = useState(
    affiliateLinkService.getLinkHistory()
  );

  const generateLink = useCallback((options) => {
    try {
      const linkData = affiliateLinkService.generateAffiliateLink(options);
      setGeneratedLink(linkData);
      
      // Update link history
      setLinkHistory(affiliateLinkService.getLinkHistory());

      return linkData;
    } catch (error) {
      console.error('Failed to generate affiliate link:', error);
      return null;
    }
  }, []);

  const calculateEarnings = useCallback((platform, params) => {
    return affiliateLinkService.calculatePotentialEarnings(platform, params);
  }, []);

  return {
    generatedLink,
    linkHistory,
    generateLink,
    calculateEarnings
  };
};
