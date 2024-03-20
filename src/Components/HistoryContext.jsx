

// import React, { createContext, useContext, useState, useEffect } from 'react';

// const HistoryContext = createContext();

// export const HistoryProvider = ({ children }) => {
//   const [history, setHistory] = useState([]);

//   useEffect(() => {
//     const historyFromLocalStorage = JSON.parse(localStorage.getItem('history')) || [];
//     setHistory(historyFromLocalStorage);
//   }, []);

//   const addToHistory = (data, userId) => {
//     setHistory((prevHistory) => {
//       const userHistoryIndex = prevHistory.findIndex((entry) => entry.userId === userId);

      
//       const updatedHistory = [...prevHistory];

//       if (userHistoryIndex !== -1) {
       
//         if (!updatedHistory[userHistoryIndex].data) {
//           updatedHistory[userHistoryIndex].data = [];
//         }
//         updatedHistory[userHistoryIndex].data.push(data);
//       } else {
       
//         updatedHistory.push({ userId, data: [data] });
//       }

      
//       localStorage.setItem('history', JSON.stringify(updatedHistory));

      
//       return updatedHistory;
//     });
//   };

//   const contextValue = {
//     history,
//     addToHistory,
//   };

//   return (
//     <HistoryContext.Provider value={contextValue}>
//       {children}
//     </HistoryContext.Provider>
//   );
// };

// export const useHistory = () => {
//   return useContext(HistoryContext);
// };




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

      const updatedHistory = [...prevHistory];

      if (userHistoryIndex !== -1) {
        if (!updatedHistory[userHistoryIndex].data) {
          updatedHistory[userHistoryIndex].data = [];
        }
        updatedHistory[userHistoryIndex].data.push(data);
      } else {
        updatedHistory.push({ userId, data: [data] });
      }

      localStorage.setItem('history', JSON.stringify(updatedHistory));

      return updatedHistory;
    });
  };

  const clearAllHistory = () => {
    // Clear the entire history
    setHistory([]);
    localStorage.removeItem('history');
  };

  const contextValue = {
    history,
    addToHistory,
    clearAllHistory,
  };

  return (
    <HistoryContext.Provider value={contextValue}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => {
  return useContext(HistoryContext);
};
