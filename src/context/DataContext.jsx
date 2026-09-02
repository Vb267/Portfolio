import { createContext, useContext, useState } from 'react';
import { defaultData } from '../data/portfolio';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [data, setData] = useState(defaultData);

  const updateData = (newData) => {
    setData(newData);
  };

  const resetData = () => {
    setData(defaultData);
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
