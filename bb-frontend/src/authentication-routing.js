import React, { useEffect, useState } from 'react';
import { useAuth } from './use-auth';
import Login from './Login';
import AboutUs from './AboutUs';
import Home from './Home';
import { ProvideCore } from './use-core';

export default function AuthenticationRouting(props) {

  const [loading, setLoading] = useState(true);
  const [login, setLogin] = useState(false);

  const auth = useAuth();

  const clickLogin = () => {
    setLogin(true);
  }

  useEffect(() => {

    setLoading(true);

    const refreshPage = async () => {
      setLoading(false);
    };

    refreshPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

        login ?
        <Login /> :
        <AboutUs clickLogin={clickLogin}/>
      )
    )
  );
}
