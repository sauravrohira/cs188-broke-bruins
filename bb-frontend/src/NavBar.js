import './App.css';
// import React, {useState} from "react";
// import { useCore } from "./use-core.js"
import Button from '@material-ui/core/Button';
// import { navigate } from "@reach/router"
import { useAuth } from "./use-auth.js"

function NavBar() {

    const auth = useAuth();
    const handleLogout = async () => {
        let response = await auth.logout();
        if (response) {
          // successful logout
        }
        else {
          // UNsuccessful logout
        }
      };

    return (
        <div className="Nav-bar">
        {/* <img alt="logo" className="NetworkLogo" src={logo} /> */}
        <div className="Nav-bar">
            <span>
                <Button variant="info" onClick={handleLogout}>
                    Sign Out
                </Button>
            </span>
        </div>
    </div>
    )
}

export default NavBar;
