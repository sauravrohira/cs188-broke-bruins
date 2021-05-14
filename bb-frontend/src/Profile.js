import './App.css';
import React, {useState} from "react";
// import { useCore } from "./use-core.js"
import Button from '@material-ui/core/Button'
// import { navigate } from "@reach/router"
import { useAuth } from "./use-auth.js"
import Listings from './Listings'
import Offers from './Offers'

function Profile() {

    const auth = useAuth();
    const user = auth.user;
    
    const [myListingsClicked, setMyListingsClicked] = useState(true);
    const [myOffersClicked, setMyOffersClicked] = useState(false);

    const handleMyListingsClicked = () => {
        setMyListingsClicked(true); 
        setMyOffersClicked(false);
    }

    const handleMyOffersClicked = () => {
        setMyListingsClicked(false); 
        setMyOffersClicked(true);
    }

    return (
        <div className="Profile">
            <div className="Profile-details">
                <img src="https://www.jnis.ac.in/images/ca9ef5762f5458271e00249401f67406.jpg" className="Profile-image" alt="oops"/>
                <div>
                    <div>MY PROFILE</div>
                    <div>@{user.username}</div>
                </div>
            </div>
            <div className="Listings-and-offers">
                <Button onClick={handleMyListingsClicked}>My Listings</Button>
                <Button onClick={handleMyOffersClicked}>My Offers</Button>
                <div className="Listings-and-offers-list">
                    {myOffersClicked ? <Offers/> : <div> <Listings/> </div>}
                </div>
            </div>
        </div>
    )
}

export default Profile;