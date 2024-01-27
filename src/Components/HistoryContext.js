import React, { createContext, useContext, useState, useEffect } from 'react';

const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const historyFromLocalStorage = JSON.parse(localStorage.getItem('history')) || [];
    setHistory(historyFromLocalStorage);
  }, []);

  const addToHistory = (data, userId) => {
    setHistory((prevHistory) => {
      const userHistoryIndex = prevHistory.findIndex((entry) => entry.userId === userId);
    
      if (userHistoryIndex !== -1) {
        // Create a new array with the updated history for the user
        const updatedHistory = prevHistory.map((entry, index) => {
          if (index === userHistoryIndex) {
            return {
              ...entry,
              data: [...entry.data, data],
            };
          }
          return entry;
        });
        localStorage.setItem('history', JSON.stringify(updatedHistory));
        return updatedHistory;
      } else {
        const updatedHistory = [
          ...prevHistory,
          { userId, data: [data] }
        ];
        localStorage.setItem('history', JSON.stringify(updatedHistory));
        return updatedHistory;
      }
    });
  };
  
  const contextValue = {
    history,
    addToHistory,
  };

  return (
    <HistoryContext.Provider value={contextValue}>
      {children}
    </HistoryContext.Provider>
  );
};
export const useHistory = () => {
  console.log(useContext(HistoryContext));
  return useContext(HistoryContext);
};