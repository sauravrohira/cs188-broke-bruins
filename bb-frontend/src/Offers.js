import './App.css';
import { useState, useEffect } from 'react';

function Offers() {

const [offers, setOffers] = useState(null);

useEffect(() => {
    fetch("http://localhost:8000/api/offer/getAllOffers")
        .then(res => res.json())
        .then(
        (result) => {
            setOffers(result);
        },
        (error) => {
            setOffers(error);
        }
        )
    }, [])

  return (
    <div>
      My Offers: {JSON.stringify(offers)}
    </div>
  );
}

export default Offers;
