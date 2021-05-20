import './App.css';
import React, {useState} from "react";
// import { useCore } from "./use-core.js"
import Button from '@material-ui/core/Button'
// import { navigate } from "@reach/router"
import { useAuth } from "./use-auth.js"
import Listings from './Listings'
import Offers from './Offers'
import CreateListing from './CreateListing'
import Dialog from '@material-ui/core/Dialog';
import Avatar from './avatar.png';

function Profile() {

    const auth = useAuth();
    const user = auth.user;
    
    const [myListingsClicked, setMyListingsClicked] = useState(true);
    const [myOffersClicked, setMyOffersClicked] = useState(false);
    const [createListingClicked, setCreateListingClicked] = useState(false);

    const handleCreatePost = () =>{
        setCreateListingClicked(false);
    }

    const handleMyListingsClicked = () => {
        setMyListingsClicked(true);
        setMyOffersClicked(false);
    }

    const handleMyOffersClicked = () => {
        setMyListingsClicked(false); 
        setMyOffersClicked(true);
    }

    const handleCreateListing = () => {
        setCreateListingClicked(true);
    }

    const handleCloseCreateListing = () => {
        setCreateListingClicked(false);
    }

    return (
        <div className="Profile">
            <div className="Profile-details">
                <img src={Avatar} className="Profile-image" alt="oops"/>
                <div>
                    <div>@{user.username}</div>
                </div>
            </div>
            <div>
                {createListingClicked ? 
                        <Dialog
                         open={createListingClicked}
                         onClose={handleCloseCreateListing}
                         aria-labelledby="alert-dialog-title"
                         aria-describedby="alert-dialog-description"
                        > 
                            <CreateListing postCreated={handleCreatePost}/>
                        </Dialog> 
                       : <div/>}
            </div>
            <div className="Listings-and-offers">
                {myOffersClicked ? 
                    <span> <Button onClick={handleMyListingsClicked}>My Listings</Button> </span>
                    : <span className="Clicked-tab"> <Button onClick={handleMyListingsClicked}>My Listings</Button> </span>
                }
                {myOffersClicked ? 
                    <span className="Clicked-tab"> <Button onClick={handleMyOffersClicked}>My Offers</Button> </span>
                    : <span> <Button onClick={handleMyOffersClicked}>My Offers</Button> </span>
                }
                <span className="Create-listing">
                    <Button onClick={handleCreateListing}>Create Listing!</Button>
                </span>
                <div className="Listings-and-offers-list">
                    {myOffersClicked ? <Offers/> : <div> <Listings/> </div>}
                </div>
            </div>
        </div>
    )
}

export default Profile;
