import './App.css';
import { useState, useEffect } from 'react';
import { useAuth } from "./use-auth.js"

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
          <div>
            <div className="Rental-info">{listing.title}</div>
            <div className="Rental-info">{listing.description}</div>
          </div>
        </div>
      )) : <div>No Listings Currently.</div>}
    </div>
  );
}

export default Listings;
