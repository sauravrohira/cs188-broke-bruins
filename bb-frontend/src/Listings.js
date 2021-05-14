import './App.css';
import { useState, useEffect } from 'react';
import { useAuth } from "./use-auth.js"
import Button from '@material-ui/core/Button';

function Listings() {
  
  const auth = useAuth(); 
  const userId = auth.user.id;
  const [listings, setListings] = useState(null);

  const setFilteredListings = (result) => {
    console.log("!!", result)
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
              <img className="Rental-image" src={listing.imageUrl} alt="haha"/>
          </div>
          <div className="Rental-info">
                <div className="Title">
                    <span className="Title-value">{listing.title}</span>
                </div>
                <div className="Description">
                    <span className="Description-value">{listing.description}</span>
                </div>
                <div className="Price">
                    <span className="Price-field">Price: </span>
                    <span className="Price-value">{listing.price}</span>
                </div>
            </div>
          <div>
            <Button>See Offers</Button>
          </div>
        </div>
      )) : <div>No Listings Currently.</div>}
    </div>
  );
}

export default Listings;
