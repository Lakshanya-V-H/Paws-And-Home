import React from "react";
import './ProductFrame.css';
import { Link } from "react-router-dom";

const Product = ({ product }) => {
    const { id, name,category,image,price,age,prod_no } = product;
    // const {addToCart} = useContext(ShopContext);
    return (
      <div key={id} className="product-container">
        <img src={image} alt={name} className="product-image" />
        <div className="product-details">
          <h3>{name}</h3>
          <p>Breed: {price}</p>
          <p>Age: {age} years</p>
          {/* <button className='btn' onClick={()=>addToCart(prod_no)}>View Details</button> */}
          <Link to={`/product/${prod_no}`}><button className='btn'>View Details</button></Link>
        </div>
      </div>
    );
  };

  export default Product;