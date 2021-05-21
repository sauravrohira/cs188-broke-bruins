import './App.css';
import Button from '@material-ui/core/Button';
import logo from './bruins-logo.png'

function Login(props) {

  return (
    <div className="App">
        <div className="Login-and-signup">
            <div className="Logo-placeholder">
                <div className="Login-title">Broke</div>
                <img src={logo} style={{height:'260px'}} alt='broke bruins'/>
            </div>
            <div className="About-us">
                <div className="About-us-title">About Us.</div>
                <div className="About-us-text">
                    Welcome! Broke Bruins is a community for broke college students at UCLA  
                    trying to make some quick money. It creates a safe space for students to interact with 
                    each other, and to they sell things they no longer need and simultaneously replace those 
                    with cheap college necessities being sold on the site. 
                    [ !! UH IDK !! we can update this to better description later ]
                </div>
                <form onSubmit={() => props.clickLogin()}>
                    <Button type="submit" variant="contained" color="primary">
                        Login/Signup
                    </Button>                
                </form>
            </div>
        </div>
  </div>
  );
}

export default Login;
