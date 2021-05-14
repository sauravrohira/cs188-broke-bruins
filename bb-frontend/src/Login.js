import './App.css';
import { useState } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AlertDialog from "./PopUp.js"
import { useAuth } from "./use-auth.js"

function Login(props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");  
  const [incorrectLogin, setIncorrectLogin] = useState(false);  

  const [passwordNew, setPasswordNew] = useState("");
  const [emailNew, setEmailNew] = useState("");  
  const [username, setUsername] = useState("");
  const [primaryComm, setPrimaryComm] = useState("");
  const [primaryDetails, setPrimaryDetails] = useState("");

  const [incorrectSignup, setIncorrectSignup] = useState(false);  
  const [successfulSignup, setSuccessfulSignup] = useState(false);  

  const auth = useAuth();

  const handleLogin = async (evt) => {
    evt.preventDefault();
    let response = await auth.login(email, password);
    if (!response) {
      setIncorrectLogin(true);
    }
  }

  const handleSignup = async (evt) => {
    evt.preventDefault();
    const userObj = {
      passwordNew, 
      emailNew, 
      username, 
      primaryComm, 
      primaryDetails
    }
    let response = await auth.signup(userObj);
    if (!response) {
      setIncorrectSignup(true);
    }
    else {
      setSuccessfulSignup(true);
    }
  }

  return (
    <div className="App">
      <div className="Logo-placeholder">
        broke bruins
      </div>
      {incorrectLogin ? <AlertDialog/> : <div></div>}
      {incorrectSignup ? <AlertDialog/> : <div></div>}
      {successfulSignup ? <div>Please verify your email address. Following that, you may log in. </div> : <div></div>}
    <div className="Login-and-signup">
      <div className="Login">
        <div className="Login-and-signup-prompt"> Existing User? </div>
        <form onSubmit={evt => handleLogin(evt)} className="Login-and-signup-form">
            <div className="Login-field">
              <TextField 
                id="Filled-basic"
                label="Email Address" 
                variant="outlined" 
                onChange={(evt) => setEmail(evt.target.value)} 
                value={email}
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
      <div className="Signup">
        <div className="Login-and-signup-prompt"> New User? </div>
        <form onSubmit={evt => handleSignup(evt)} className="Login-and-signup-form">
            <div className="Login-field">
              <TextField 
                id="Filled-basic"
                label="Email Address" 
                variant="outlined" 
                onChange={(evt) => setEmailNew(evt.target.value)} 
                value={emailNew}
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
                onChange={(evt) => setPasswordNew(evt.target.value)} 
                value={passwordNew}
                name="password" 
                type="password" />
            </div>
            <div className="Login-field">
              <TextField 
                id="Filled-basic"
                label="Username" 
                variant="outlined" 
                onChange={(evt) => setUsername(evt.target.value)} 
                value={username}
                // required 
                />
            </div>
            <div className="Login-field">
              <TextField 
                id="Filled-basic"
                label="Primary Mode of Comm" 
                variant="outlined" 
                onChange={(evt) => setPrimaryComm(evt.target.value)} 
                value={primaryComm}
                // required 
                />
            </div>
            <div className="Login-field">
              <TextField 
                id="Filled-basic"
                label="Primary Details" 
                variant="outlined" 
                onChange={(evt) => setPrimaryDetails(evt.target.value)} 
                value={primaryDetails}
                // required 
                />
            </div>
            <Button type="submit" variant="contained" color="primary">
              Signup
            </Button>
        </form>
      </div>
    </div>
  </div>
  );
}

export default Login;
