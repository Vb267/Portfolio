import { createContext, useContext, useState } from 'react';
import { defaultData } from '../data/portfolio';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem('vb_portfolio_data');
      return saved ? { ...defaultData, ...JSON.parse(saved) } : defaultData;
    } catch {
      return defaultData;
    }
  });

  const updateData = (newData) => {
    setData(newData);
    try {
      localStorage.setItem('vb_portfolio_data', JSON.stringify(newData));
    } catch {
      // localStorage unavailable
    }
  };

  const resetData = () => {
    setData(defaultData);
    localStorage.removeItem('vb_portfolio_data');
  };

  return (
    <DataContext.Provider value={{ data, updateData, resetData }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
};
