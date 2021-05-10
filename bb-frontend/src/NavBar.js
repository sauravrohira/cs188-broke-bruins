import './App.css';
// import React, {useState} from "react";
// import { useCore } from "./use-core.js"
// import Button from '@material-ui/core/Button';
// import { navigate } from "@reach/router"
import { useAuth } from "./use-auth.js"

function NavBar() {

    const auth = useAuth();

    return (
        <div className="Nav-bar">
            {/* <img alt="logo" className="NetworkLogo" src={logo} /> */}
            <div>
                <span>
                    <form>
                        <div> Sign Out </div>
                        <div> { JSON.stringify(auth.user) } </div>
                        <div> { console.log("uhhh", auth.user) }</div>
                    </form>
                </span>
            </div>
        </div>
    )
}

export default NavBar;
