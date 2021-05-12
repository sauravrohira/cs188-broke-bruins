import './App.css';
import { useState } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
      <div className="Logo-placeholder">
        broke bruins
      </div>
    <div className="Login">
    <form onSubmit={evt => handleLogin(evt)} className="Login-form">
        <div className="Login-field">
          <TextField 
            id="Filled-basic"
            label="Email Address" 
            variant="outlined" 
            onChange={(evt) => setUsername(evt.target.value)} 
            value={username}
            type="email"
            // required 
            />
        </div>
        <div className="Login-field">
          <TextField 
            className="Login-input" 
            label="Password"
            variant="outlined"
            // required
            onChange={(evt) => setPassword(evt.target.value)} 
            value={password}
            name="password" 
            type="password" />
        </div>
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
    </form>
    </div>
  </div>
  );
}

export default Login;
