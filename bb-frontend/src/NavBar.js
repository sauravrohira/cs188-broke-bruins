import './App.css';
import Button from '@material-ui/core/Button';
import { useAuth } from "./use-auth.js"

function NavBar() {

    const auth = useAuth();
    const handleLogout = async () => {
        let response = await auth.logout();
        if (!response) {
          console.log("Unsuccessful Logout.")
        }
      };

    return (
        <div className="Nav-bar">
        {/* <img alt="logo" className="NetworkLogo" src={logo} /> */}
        <div className="Nav-bar">
            <span className="Button">
                <Button variant="info" onClick={handleLogout}>
                    Sign Out 
                </Button>
            </span>
        </div>
    </div>
    )
}

export default NavBar;
