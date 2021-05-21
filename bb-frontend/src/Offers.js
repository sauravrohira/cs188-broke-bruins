import './App.css';
import { useState, useEffect } from 'react';
import { useAuth } from "./use-auth.js"

function Offers() {

  const auth = useAuth();
  const userId = auth.user.id;
  const [offers, setOffers] = useState(null)
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Credentials': 'include'
    },
  }

  useEffect(() => {
    async function getListings() {
    fetch(`http://localhost:8000/api/offer/getUsersOfferListings?userId=${userId}`, options)
        .then(res => res.json())
        .then((result) => {
            setOffers(result);
        })
        .catch(err => {
          setOffers(err);
        })
      }
      getListings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      {offers && offers.length && offers.map(listing => (
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

export default Offers;
