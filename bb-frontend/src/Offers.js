import './App.css';
import { useState, useEffect } from 'react';
import { useAuth } from "./use-auth.js"

function Offers() {

  const auth = useAuth();
  const userId = auth.user.id;
  const [offers, setOffers] = useState("oops")
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Credentials': 'include'
    },
    body: JSON.stringify({userId})
  }

  useEffect(() => {
    async function getListings() {
    fetch("http://localhost:8000/api/offer/getUsersOfferListings", options)
        .then(res => res.json())
        .then(
        (result) => {
            setOffers(result);
        },
        (error) => {
            setOffers(error);
        }
        )
      }
      getListings();
  }, [])

  return (
    <div>
      {JSON.stringify(offers)}
    </div>
  );
}

export default Offers;
