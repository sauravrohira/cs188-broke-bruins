import React, {
    useState,
    useContext,
    createContext
  } from "react";
  
  // this auth can be replaced with anything that provides the same API
  // could be extracted to separate file
  const auth = {
    user: null,
    async login(email, password) {
      let response = await fetch("http://localhost:8000/api/user/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Credentials': 'include',
          'Accept': 'application/json'
        },
        body: JSON.stringify({email, password})
      }).then(res => res.json())
      .then(response => {
        if (response.status == 200)
          return true;
        else {
          return response.error;
        }
      })
      .catch(err => {
          return err;
      });

      return response;
    },
    async getOffers(userId) {
      let response = await fetch("http://localhost:8000/api/offer/getUsersOfferListings", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Credentials': 'include'
        },
        body: JSON.stringify({userId})
      }).then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Unsuccessful Login');
        }
      })
      .catch(err => {
        if (err.status === 401) {
          throw new Error(err);
        }
      });

      return response;
    },
    async logout() {
      return true;
      // let response = await fetch("/api/logout", {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Credentials': 'include'
      //   }
      // })
      // .then(response => {
      //   if (response.status === 200) {
      //     return true;
      //   }
      //   else {
      //     return false;
      //   }
      // })
      // .catch(err => {
      //   if (err.status === 500) {
      //     return false;
      //   }
      //   return false;
      // });
  
      // return response;
    },
    async refresh() {
      // let response = await fetch("/api/core", {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Credentials': 'include'
      //   }
      // })
      // .then(response => response.json())
      // .catch(err => {
      //   if (err.status === 401) {
      //     return null;
      //   }
      //   return null;
      // });
  
      // temp until backend is connected
      const response = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Credentials': 'include'
          }
      };
      return response;
    },
    async signup(userObject) {
      const obj = {
        email: userObject.emailNew,
        password: userObject.passwordNew, 
        username: userObject.username, 
        primaryComm: userObject.primaryComm, 
        primaryDetails: userObject.primaryDetails 
      }
      let response = await fetch("http://localhost:8000/api/user/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Credentials': 'include',
          'Accept': 'application/json'
        },
        body: JSON.stringify(obj)
      })
      .then(res => res.json())
      .then(response => {
        if (response.status == 200)
          return true;
        else {
          return response.error;
        }
      })
      .catch(err => {
          return err;
      });
  
      return response;
    }
  }
  
  const authContext = createContext();
  
  /**
   * @return returns the authentication required
   * for login, logout, session cookies, etc
   *
   * purpose: to get the authentication object which is needed
   * to allow the user to enter and use the web app
   */
  export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
  
    return (
      <authContext.Provider value={auth}>
        { children }
      </authContext.Provider>
    );
  }
  
  export const useAuth = () => {
    return useContext(authContext);
  };
  
  /**
   * @return returns the response from the login attempt, or
   * null if the attempt was successful.
   *
   * purpose: to use the authentication object to allow the
   * user to login to the web app
   */
  function useProvideAuth() {
  
    const [user, setUser] = useState(null);
  
    const login = (username, password) => {
      return auth.login(username, password)
      .then(response => {
        if (response === null) {
          return null;
        }
  
        setUser(response)
        return response;
      })
    };

    const getOffers = (userId) => {
      return auth.getOffers(userId)
      .then(response => {
        if (response === null) {
          return null;
        }
        return response;
      })
    };
  
    const logout = ()  => {
      return auth.logout()
      .then(didLogout => {
        if (didLogout) {
          setUser(null);
        }
        return didLogout;
      });
    };
  
    const refresh = () => {
      return null;
      // return auth.refresh()
      // .then(response => {
      //   if (response === null) {
      //     return null;
      //   }
  
      //   console.log("in refresh", response.userObject)
      //   setUser(response.userObject);
      //   return response;
      // });
    };
  
    const signup = (userObject) => {
      return auth.signup(userObject)
      .then(response => {
        return response;
      });
    }
  
    return {
      user,
      login,
      logout,
      refresh,
      signup, 
      getOffers
    };
  }
  