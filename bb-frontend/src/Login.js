import './App.css';
import { useState } from 'react'
// import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

import { useAuth } from "./use-auth.js"

function Login(props) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");  

  const auth = useAuth();

  const handleLogin = async (evt) => {
    evt.preventDefault();
    let response = await auth.login(username, password);
    if (response) {
        // nothing for now
    }

    // TODO: display error message on permission denied
    else {
      console.log("Permission denied");
    }
  }

  return (
    <div className="App">
    <div className="Login">
    <form onSubmit={evt => handleLogin(evt)}>
      <div> 
        <div className="Login-field">
          <label className="Login-label" htmlFor="email">
            Email address
          </label>
          <Input classes="Login-input" onChange={(evt) => setUsername(evt.target.value)} name="email" type="email" />
        </div>
        <div className="Login-field">
          <label className="Login-label" htmlFor="password">
            Password
          </label>
          <Input onChange={(evt) => setPassword(evt.target.value)} name="password" type="password" />
        </div>
        <div className="Login-button">
          <input type="submit" value="Login" />
        </div>
      </div>
    </form>
    </div>
  </div>
  );
}

export default Login;
