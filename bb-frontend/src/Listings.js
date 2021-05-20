import './App.css';
import { useState, useEffect } from 'react';
import { useAuth } from "./use-auth.js"
import Button from '@material-ui/core/Button';
import Empty from './empty-object.png';
import Dialog from '@material-ui/core/Dialog';

function Listings() {
  
  const auth = useAuth(); 
  const userId = auth.user.id;
  const [listings, setListings] = useState(null);
  const [seeOffersClicked, setSeeOffersClicked] = useState(false);
  const [currListing, setCurrListing] = useState(null);

  const handleCloseSeeOffers = () => {
    setSeeOffersClicked(false);
  }


  const handleSeeOffersClicked = () => {
    setSeeOffersClicked(true);
  }

  const changeListingId = async(evt, listingId) => {
    evt.preventDefault(); 
    setCurrListing(listingId);
  }

  const setFilteredListings = (result) => {
    const filteredListings = result.filter(result => result.sellerId == userId)
    if(filteredListings.length) setListings(filteredListings);
  }


  useEffect(() => {
    async function getListings() {
    fetch("http://localhost:8000/api/rental/getAllListings")
        .then(res => res.json())
        .then(
        (result) => {
            setFilteredListings(result);
        },
        (error) => {
            setListings(error);
        }
        )
      }
      getListings();
  }, [])

  return (
    <div>
      {listings ? listings.map(listing => (
        <div className="Rental-card">
          <div>
              <img className="Rental-image" src={listing.imageUrl || Empty} alt="haha"/>
          </div>
          <div className="Rental-info">
                <div className="Title">
                    <span className="Title-value">{listing.title}</span>
                </div>
                <div className="Description">
                    <span className="Description-value">{listing.description}</span>
                </div>
                <div className="Price">
                    <span className="Price-field">Price: $</span>
                    <span className="Price-value">{listing.price}</span>
                </div>
            </div>
          <div className="Rental-offer">
            <form onSubmit={(evt) => changeListingId(evt, listing.id)} className="Login-and-signup-form">
              <Button type="submit" variant="contained" onClick={handleSeeOffersClicked}>
                      See Offers
              </Button>     
            </form>
          </div>    
        </div>
      )) : <div>No Listings Currently.</div>}
          <div>
            <Dialog
              open={seeOffersClicked}
              onClose={handleCloseSeeOffers}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            > 
              <div>{currListing}</div>
            </Dialog> 
          </div>
    </div>
  );
}

export default Listings;
