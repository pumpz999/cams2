import { useState, useMemo } from 'react';

export const useModelFilter = (initialModels = []) => {
  const [filters, setFilters] = useState({
    country: '',
    minAge: 18,
    maxAge: 99,
    onlineOnly: false,
    sortBy: 'popularity'
  });

  const filteredModels = useMemo(() => {
    return initialModels.filter(model => {
      const matchCountry = !filters.country || 
        model.country.toLowerCase().includes(filters.country.toLowerCase());
      
      const matchAge = model.age >= filters.minAge && model.age <= filters.maxAge;
      
      const matchOnlineStatus = !filters.onlineOnly || model.isOnline;

      return matchCountry && matchAge && matchOnlineStatus;
    }).sort((a, b) => {
      switch(filters.sortBy) {
        case 'age':
          return a.age - b.age;
        case 'popularity':
          return b.views - a.views;
        default:
          return 0;
      }
    });
  }, [initialModels, filters]);

  return { 
    filteredModels, 
    filters, 
    setFilters 
  };
};
