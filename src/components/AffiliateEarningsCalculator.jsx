import React, { useState } from 'react';
import affiliateLinkService from '../services/affiliateLinkService';
import { AFFILIATE_PLATFORMS } from '../utils/affiliatePlatforms';

const AffiliateEarningsCalculator = () => {
  const [platform, setPlatform] = useState('xlovecam');
  const [expectedRevenue, setExpectedRevenue] = useState(0);
  const [earnings, setEarnings] = useState(null);

  const calculateEarnings = () => {
    try {
      const earningsBreakdown = affiliateLinkService.calculatePotentialEarnings(platform, {
        expectedRevenue
      });

      setEarnings(earningsBreakdown);
    } catch (error) {
      console.error('Earnings calculation error:', error);
    }
  };

  return (
    <div className="affiliate-earnings-calculator">
      <h2>Affiliate Earnings Calculator</h2>
      
      <div>
        <label>Platform:</label>
        <select 
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        >
          {Object.keys(AFFILIATE_PLATFORMS).map(platformKey => (
            <option key={platformKey} value={platformKey}>
              {AFFILIATE_PLATFORMS[platformKey].name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Expected Monthly Revenue:</label>
        <input 
          type="number" 
          value={expectedRevenue}
          onChange={(e) => setExpectedRevenue(parseFloat(e.target.value))}
          placeholder="Enter expected revenue"
        />
      </div>

      <button onClick={calculateEarnings}>
        Calculate Potential Earnings
      </button>

      {earnings && (
        <div className="earnings-breakdown">
          <h3>Earnings Breakdown</h3>
          <p>Registration Commission: ${earnings.registrationCommission.toFixed(2)}</p>
          <p>Revenue Share Percentage: {earnings.revenueSharePercentage * 100}%</p>
          <p>Estimated Registration Earning: ${earnings.estimatedRegistrationEarning.toFixed(2)}</p>
          <p>Estimated Revenue Sharing: ${earnings.estimatedRevenueSharing.toFixed(2)}</p>
          <p>Total Estimated Monthly Earnings: ${(
            earnings.estimatedRegistrationEarning + 
            earnings.estimatedRevenueSharing
          ).toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default AffiliateEarningsCalculator;
