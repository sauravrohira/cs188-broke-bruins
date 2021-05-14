import './App.css';
import { useState, useEffect } from 'react';
import { useAuth } from "./use-auth.js"

function Offers() {

  const userId = useAuth().user.id;
  const [offers, setOffers] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/offer/getUsersOfferListings", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Credentials': 'include'
        },
        body: JSON.stringify({userId})
      }).then((response) => {
        if (response.ok) {
          setOffers(response)
        } else {
          throw new Error('Unable to Get Offers');
        }
      })
      .catch(err => {
        if (err.status === 401) {
          return null;
        }
    });
  });

  return (
    <div>
      My Offers: {JSON.stringify(offers)}
    </div>
  );
}

export default Offers;
