import React from "react";
import './ProductFrame.css';
import { Link } from "react-router-dom";

const Product = ({ product }) => {
    const { pet_id, pet_name,species,image,breed,age} = product;
    return (
      <div key={pet_id} className="product-container">
        <img src={`data:image/jpeg;base64,${image}`} alt={pet_name} className="product-image" />
        <div className="product-details">
          <h3>{pet_name}</h3>
          <p>Breed: {breed}</p>
          <p>Age: {age} years</p>
          <Link to={`/product/${pet_id}`}><button className='btn'>View Details</button></Link>
        </div>
      </div>
    );
  };

  export default Product;