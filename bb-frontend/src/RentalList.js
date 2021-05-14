import './App.css';
import React, {useEffect, useState} from 'react'
// import { useCore } from "./use-core.js"
import Button from '@material-ui/core/Button';
// import { navigate } from "@reach/router"
import { useAuth } from "./use-auth.js"
import SearchBar from './SearchBar';

function Rental(props) {

    const auth = useAuth(); 
    const user = auth.user;
    const buyerId = user.id; 
    const listingId = props.id; 

    const handlePlaceOffer = async () => {
        fetch("http://localhost:8000/api/offer/createOffer", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Credentials': 'include'
        },
        body: JSON.stringify({buyerId, listingId})
      }).then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Unsuccessful Offer Placement');
        }
      })
      .catch(err => {
        if (err.status === 401) {
          return null;
        }
      });
    };

      return (
        <div className="Rental-card">
            <div>
                <div className="Image">
                    <img src="https://cdn.shopify.com/s/files/1/0228/1357/products/skiing_mask_c529e9d6-930c-4765-a5b5-1adccdd1bdec_1024x1024.jpg?v=1474786959" className="Rental-image" alt="oops"/>
                </div>
            </div>
            <div className="Rental-info">
                <div className="Title">
                    <span className="Title-value">{props.title}</span>
                </div>
                <div className="Description">
                    <span className="Description-value">{props.description}</span>
                </div>
                <div className="Price">
                    <span className="Price-field">Price: </span>
                    <span className="Price-value">{props.price}</span>
                </div>
            </div>
            <div className="Rental-offer">
                <Button onClick={handlePlaceOffer}>Place Offer!</Button>
            </div>
        </div>
      )
  }

function RentalList() {

    const [listings, setListings] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [input, setInput] = useState('');

    const updateInput = async (input) => {
        const filtered = listings.filter(listing => {
          let options = listing.title + ' ' + listing.description
          return options.toLowerCase().includes(input.trim().toLowerCase())
        })
        setInput(input);
        setSearchTerm(filtered);
      }

    useEffect(() => {
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
        }, [])

    return (
        <div>
            <div className="Search-bar-container">
                <SearchBar
                input={input}
                setKeyword={updateInput}
                />
            </div>
            <div className="Rental-list">
                {searchTerm ? 
                    searchTerm.map(listing => (
                        <div>
                            <Rental {...listing}/>
                        </div>
                    )) :
                    listings && listings.map(listing => (
                        <div>
                            <Rental {...listing}/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default RentalList;


    // const commonProps1 = { title: "Ski Goggles", description: "These ski goggles r great. I wear them all the time. They make me look good.", price: "$50", imageUrl: "https://cdn.shopify.com/s/files/1/0228/1357/products/skiing_mask_c529e9d6-930c-4765-a5b5-1adccdd1bdec_1024x1024.jpg?v=1474786959" };
    // const commonProps2 = { title: "Workout Weights", description: "If you want to up those gains, these are great. Colorful too.", price: "$20", imageUrl: "" };
    // const commonProps3 = { title: "Camping Tent - Sleeps 4", description: "Time 2 visit Joshua Tree. Take some ramen with you.", price: "$40", imageUrl: "" };
