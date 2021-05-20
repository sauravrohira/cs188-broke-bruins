import './App.css';
import React, {useEffect, useState} from 'react'
// import { useCore } from "./use-core.js"
import Button from '@material-ui/core/Button';
// import { navigate } from "@reach/router"
import { useAuth } from "./use-auth.js"
import SearchBar from './SearchBar';
import Empty from './empty-object.png';
// import Dialog from '@material-ui/core/Dialog';

function Rental(props) {

    const auth = useAuth(); 
    const user = auth.user;
    const buyerId = user.id; 
    const listingId = props.id;

    const [offerPlaced, setOfferPlaced] = useState(props.offerPlaced);

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
            setOfferPlaced(true);
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
                    <img src={props.imageUrl || Empty} className="Rental-image" alt="oops"/>
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
                    <span className="Price-field">Price: $</span>
                    <span className="Price-value">{props.price}</span>
                </div>
            </div>
            <div className="Rental-offer">
                {!offerPlaced ?
                    <Button onClick={handlePlaceOffer}>Place Offer!</Button> :
                    <span>Offer Placed!</span>
                }
            </div>
        </div>
      )
  }

function RentalList() {


    const auth = useAuth(); 
    const userId = auth.user.id;

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

    const setFilteredListings = (result) => {
        const filteredListings = result.filter(result => result.sellerId !== userId)
        setListings(filteredListings);
    }

    useEffect(() => {
        fetch(`http://localhost:8000/api/rental/getAllButUserListings?userId=${userId}`)
            .then(res => res.json())
            .then(
            (result) => {
                setFilteredListings(result);
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
