import React, { useEffect, useState } from 'react';
import { useAuth } from './use-auth';
import Login from './Login';
import Home from './Home';
import { ProvideCore } from './use-core';
// import LoadingPage from './loading-page';

export default function AuthenticationRouting(props) {

  const [loading, setLoading] = useState(true);

  const auth = useAuth();

  useEffect(() => {

    setLoading(true);

    const refreshPage = async () => {
      let response = await auth.refresh();
      console.log(auth.user);
      if (! response) {
        console.log("refresh didn't work");
      }
      else {
        console.log("refresh worked");
        console.log(response);
      }

      setLoading(false);
    };

    refreshPage();
  }, []);

  return (
    loading ? (
      <div> loading </div>
    ) : (
      auth.user ? (
        <ProvideCore>
          <Home />
        </ProvideCore>
      ) : (
        <Login />
      )
    )
  );
}
