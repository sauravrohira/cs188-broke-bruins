import './App.css';
import React from 'react'
// import { useCore } from "./use-core.js"
// import Button from '@material-ui/core/Button';
// import { navigate } from "@reach/router"
// import { useAuth } from "./use-auth.js"

export class Rental extends React.Component {
    render() {
      return (
        <div className="Rental-card">
            <div className="Rental-info">
                <div className="Title">
                    <span className="Title-field">Title: </span> 
                    <span className="Title-value">{this.props.title}</span>
                </div>
                <div className="PhoneNumber">
                    <span className="Contact-fields">Description: </span>
                    <span className="Contact-values">{this.props.description}</span>
                </div>
                <div className="PhoneNumber">
                    <span className="Contact-fields">Price: </span>
                    <span className="Contact-values">{this.props.price}</span>
                </div>
            </div>
            <div>
                <div className="PhoneNumber">
                    <img src={this.props.imageUrl} className="Rental-image" alt="oops"/>
                </div>
            </div>
        </div>
      )
    }
  }

function RentalList() {

    const commonProps1 = { title: "Ski Goggles", description: "These ski goggles r great. I wear them all the time. They make me look good.", price: "$50", imageUrl: "https://cdn.shopify.com/s/files/1/0228/1357/products/skiing_mask_c529e9d6-930c-4765-a5b5-1adccdd1bdec_1024x1024.jpg?v=1474786959" };
    const commonProps2 = { title: "Workout Weights", description: "If you want to up those gains, these are great. Colorful too.", price: "$20", imageUrl: "" };
    const commonProps3 = { title: "Camping Tent - Sleeps 4", description: "Time 2 visit Joshua Tree. Take some ramen with you.", price: "$40", imageUrl: "" };

    return (
        <div>
            <div className="Rental-list">
                <Rental {...commonProps1} />
                <Rental {...commonProps2} />
                <Rental {...commonProps3} />
                <Rental {...commonProps1} />
            </div>
        </div>
    )
}

export default RentalList;
