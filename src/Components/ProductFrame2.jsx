import React from "react";
import './ProductFrame.css';
import { Link } from "react-router-dom";

const Product = ({ product }) => {
    const {id,name,category,image,breed,age,prod_no} = product;
    return (
      <div key={id} className="product-container">
        <img src={image} alt={name} className="product-image" />
        <div className="product-details">
          <h3>{name}</h3>
          <p>Breed: {breed}</p>
          <p>Age: {age} years</p>
          <Link to={`/product/${prod_no}`}><button className='btn'>View Details</button></Link>
        </div>
      </div>
    );
  };

  export default Product;