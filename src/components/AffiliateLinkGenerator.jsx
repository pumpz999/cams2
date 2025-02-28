import React, { useState } from 'react';
import { useAffiliateLink } from '../hooks/useAffiliateLink';

const AffiliateLinkGeneratorComponent = () => {
  const { generateLink } = useAffiliateLink();
  const [linkOptions, setLinkOptions] = useState({
    platform: 'xlovecam',
    modelId: '',
    customAffiliateId: ''
  });
  const [generatedLink, setGeneratedLink] = useState(null);

  const handleGenerate = () => {
    const link = generateLink(linkOptions);
    if (link) {
      setGeneratedLink(link.fullLink);
    }
  };

  return (
    <div className="affiliate-link-generator">
      <h2>Affiliate Link Generator</h2>
      
      <div>
        <label>Platform:</label>
        <select 
          value={linkOptions.platform}
          onChange={(e) => setLinkOptions(prev => ({
            ...prev, 
            platform: e.target.value
          }))}
        >
          <option value="xlovecam">XloveCam</option>
          <option value="chaturbate">Chaturbate</option>
          <option value="stripchat">Stripchat</option>
        </select>
      </div>

      <div>
        <label>Model ID:</label>
        <input 
          type="text"
          value={linkOptions.modelId}
          onChange={(e) => setLinkOptions(prev => ({
            ...prev, 
            modelId: e.target.value
          }))}
        />
      </div>

      <div>
        <label>Custom Affiliate ID (Optional):</label>
        <input 
          type="text"
          value={linkOptions.customAffiliateId}
          onChange={(e) => setLinkOptions(prev => ({
            ...prev, 
            customAffiliateId: e.target.value
          }))}
        />
      </div>

      <button onClick={handleGenerate}>
        Generate Affiliate Link
      </button>

      {generatedLink && (
        <div>
          <h3>Generated Link:</h3>
          <input 
            type="text" 
            value={generatedLink} 
            readOnly 
            style={{width: '100%'}}
          />
          <button onClick={() => navigator.clipboard.writeText(generatedLink)}>
            Copy Link
          </button>
        </div>
      )}
    </div>
  );
};

export default AffiliateLinkGeneratorComponent;
