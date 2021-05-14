import './App.css';
import { useState, useEffect } from 'react';

function Listings() {

const [listings, setListings] = useState(null);

useEffect(() => {
    async function getListings() {
    fetch("http://localhost:8000/api/rental/getAllListings")
        .then(res => res.json())
        .then(
        (result) => {
            setListings(result);
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
      {listings && listings.map(listing => (
        <div className="Rental-card">
          <div>
            <div className="Rental-info">{listing.title}</div>
            <div className="Rental-info">{listing.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Listings;
