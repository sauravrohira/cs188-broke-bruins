import React, {
    useState,
    useContext,
    createContext
  } from "react";
  
  /**
   * Purpose: handles concerns regarding accessing the
   * user's information (login, contacts, etc)
   */
  const core = {
    coreObject: null,
    async getCore() {
      let response = await fetch("/api/core", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Credentials': 'include'
        }
      })
      .then(response => response.json())
      .catch(err => {
  
        if (err.status === 401) {
          return null;
        }
      });
  
      return response;
    },
  };
  
  const coreContext = createContext();
  
  export function ProvideCore({ children }) {
    const core = useProvideCore();
  
    return (
      <coreContext.Provider value={core}>
        { children }
      </coreContext.Provider>
    );
  }
  
  export const useCore = () => {
    return useContext(coreContext);
  };

  function useProvideCore() {
  
    const [coreObject, setCoreObject] = useState(null);
  
    const getCore = () => {
      return core.getCore()
      .then(response => {
        if (response === null) {
          return null;
        }
  
        setCoreObject(response);
        return response;
      });
    };
   
    return {
      coreObject,
      getCore,
    };
  }
  