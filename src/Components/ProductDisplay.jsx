import React from 'react'
import './ProductDisplay.css';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
const ProductDisplay = (props) => {
    const {product} = props;
  return (
    <div className='productdisplay'>
        <div className="productdisplay-left">
            {/* <div className="productdisplay-img-list">
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
            </div> */}
            <div className="productdisplay-img">
                <img className='productdisplay-main-img'src={product.image} alt="" />
            </div>
        </div>
        <div className='productdisplay-right'>
            <h1>{product.name}</h1>
                <div className="productdisplay-right-description">
                    <div className='productdisplay-right-description-details'> 
                        <span>Meet your new companion! This lovable pet is full of charm and personality, ready to bring joy and affection into your home. With a playful spirit and a heart full of love, this pet is looking for a forever family to share countless moments of happiness. Adopt today and experience unconditional love and companionship</span>
                    </div>
                    <div className="productdisplay-right-description-details">
                        <h2>Additional Details</h2>
                        <div className="productdisplay-right-size">
                            <div>Age  : {product.age} Years</div>
                            {/* <div>Size : Medium</div> */}
                            <div>Breed: {product.price}</div>
                            <div><i><FontAwesomeIcon icon={faCircleCheck} /></i>Can Live With Other Dogs </div>
                            <div><i><FontAwesomeIcon icon={faCircleCheck} /></i>Can Live With Other Cats</div>
                            <div><i><FontAwesomeIcon icon={faCircleCheck} /></i>Can Live With Children Of Any  Age</div>
                            <div><i><FontAwesomeIcon icon={faCircleCheck} /></i>Shots upto date</div>
                        </div>
                    </div>
                    <div className='productdisplay-right-description-details'>
                        <h2>Adoption Fee</h2>
                        <div className="productdisplay-right-price-new">
                            ₹ 3000
                        </div>
                    </div>
                </div>
                <Link to={`/AdoptionApplication/${product.prod_no}`}><button className='btn'>Adopt</button></Link>                
        </div>
    </div>
    
  )
}

export default  ProductDisplay;