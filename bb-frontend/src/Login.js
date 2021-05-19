import './App.css';
import { useState } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AlertDialog from "./PopUp.js"
import { useAuth } from "./use-auth.js"
import logo from './bruins-logo.png'

function Login(props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");  
  const [incorrectLogin, setIncorrectLogin] = useState(false);  

  const [passwordNew, setPasswordNew] = useState("");
  const [emailNew, setEmailNew] = useState("");  
  const [username, setUsername] = useState("");
  const [primaryComm, setPrimaryComm] = useState("");
  const [primaryDetails, setPrimaryDetails] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [incorrectSignup, setIncorrectSignup] = useState(false);  
  const [successfulSignup, setSuccessfulSignup] = useState(false);  

  const [verificationCode, setVerificationCode] = useState("");
  const [successfulVerification, setSuccessfulVerification] = useState(false);
  const [insuccessfulVerification, setInsuccessfulVerification] = useState(false);

  const auth = useAuth();

  const handleLogin = async (evt) => {
    evt.preventDefault();
    let response = await auth.login(email, password);
    if (!response) {
      setIncorrectLogin(true);
    }
  }

  const handleCodeInput = async (evt) => {
    evt.preventDefault();
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({email: emailNew, code: verificationCode})
    }

    await fetch("http://localhost:8000/api/user/verify", options)
    .then(res => { 
      if(res.ok) {
        setSuccessfulVerification(true);
        setInsuccessfulVerification(false);
      }
      else  {
        setInsuccessfulVerification(true);
        setSuccessfulVerification(false);
      }
    }) 
    .catch(err => console.log("Error in Verifying User: ", err))
  }

  const handleSignup = async (evt) => {
    setIncorrectSignup(false);
    evt.preventDefault();
    const userObj = {
      passwordNew, 
      emailNew, 
      username, 
      primaryComm, 
      primaryDetails
    }
    let response = await auth.signup(userObj);
    if (response != true) {
      setIncorrectSignup(true);
      setErrorMessage(response);
    }
    else {
      setSuccessfulSignup(true);
    }
  }

  return (
    <div className="App">
      {incorrectLogin ? <AlertDialog errorMessage="Incorrect Login Details."/> : <div></div>}
      {incorrectSignup ? <AlertDialog errorMessage={errorMessage}/> : <div></div>}
      {insuccessfulVerification ? <AlertDialog errorMessage="Incorrect Verification Code."/> : <div></div>}
      <div className="Login-and-signup">
      <div className="Logo-placeholder">
        <div className="Login-title">Broke</div>
        <img src={logo} style={{height:'260px'}} alt='broke bruins'/>
      </div>
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
                required 
                />
            </div>
            <div className="Login-field">
              <TextField 
                className="Login-input" 
                label="Password"
                variant="outlined"
                required
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
      {!successfulSignup ? 
      <div className="Signup">
        <div className="Login-and-signup-prompt"> New User? </div>
        <form onSubmit={evt => handleSignup(evt)} className="Login-and-signup-form">
            <div className="Login-field">
              <TextField 
                id="Filled-basic"
                label="UCLA Email Address" 
                variant="outlined" 
                onChange={(evt) => setEmailNew(evt.target.value)} 
                value={emailNew}
                type="email"
                required 
                />
            </div>
            <div className="Login-field">
              <TextField 
                className="Login-input" 
                label="Password"
                variant="outlined"
                required
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
                required 
                />
            </div>
            <div className="Login-field">
              <TextField 
                id="Filled-basic"
                label="Primary Mode of Comm" 
                variant="outlined" 
                onChange={(evt) => setPrimaryComm(evt.target.value)} 
                value={primaryComm}
                required 
                />
            </div>
            <div className="Login-field">
              <TextField 
                id="Filled-basic"
                label="Primary Details" 
                variant="outlined" 
                onChange={(evt) => setPrimaryDetails(evt.target.value)} 
                value={primaryDetails}
                required 
                />
            </div>
            <Button type="submit" variant="contained" color="primary">
              Signup
            </Button>
        </form>
      </div> : 
      (successfulVerification ? <div>Thank you! You may now log in.</div> :
        <form onSubmit={evt => handleCodeInput(evt)} className="Login-and-signup-form">
            <div className="Login-and-signup-prompt">Please check your email for a verification code.</div>
            <div className="Login-field">
              <TextField 
                id="Filled-basic"
                label="Verification code" 
                variant="outlined" 
                onChange={(evt) => setVerificationCode(evt.target.value)} 
                value={verificationCode}
                required 
                />
            </div>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
        </form>
      )}
    </div>
  </div>
  );
}

export default Login;
