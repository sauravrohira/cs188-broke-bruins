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
  }

  useEffect(() => {
    async function getListings() {
    fetch(`http://localhost:8000/api/offer/getUsersOfferListings?userId=${userId}`, options)
        .then(res => res.json())
        .then((result) => {
            console.log("here is the result:",result)
            setOffers(result);
        })
        .catch(err => {
          setOffers(err);
        })
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
