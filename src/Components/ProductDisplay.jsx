import React from 'react'
import './ProductDisplay.css';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
const ProductDisplay = ({product}) => {
    const {pet_id , pet_name , species , breed , age , image , gender , description , status , fee} = product;
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
                <img className='productdisplay-main-img' src={`data:image/jpeg;base64,${image}`} alt={product.pet_name} />
            </div>
        </div>
        <div className='productdisplay-right'>
            <h1>{pet_name}</h1>
                <div className="productdisplay-right-description">
                    <div className='productdisplay-right-description-details'> 
                        {/* <span>Meet your new companion! This lovable pet is full of charm and personality, ready to bring joy and affection into your home. With a playful spirit and a heart full of love, this pet is looking for a forever family to share countless moments of happiness. Adopt today and experience unconditional love and companionship</span> */}
                        <span>{description}</span>
                    </div>
                    <div className="productdisplay-right-description-details">
                        <h2>Additional Details</h2>
                        <div className="productdisplay-right-size">
                            <div>Age    : {age} Years</div>
                            {/* <div>Size : Medium</div> */}
                            <div>Breed  : {breed}</div>
                            <div>Gender : {gender}</div>
                            <div>Status : {status}</div>
                            <div><i><FontAwesomeIcon icon={faCircleCheck} /></i>Can Live With Other Dogs </div>
                            <div><i><FontAwesomeIcon icon={faCircleCheck} /></i>Can Live With Other Cats</div>
                            <div><i><FontAwesomeIcon icon={faCircleCheck} /></i>Can Live With Children Of Any  Age</div>
                            <div><i><FontAwesomeIcon icon={faCircleCheck} /></i>Shots upto date</div>
                        </div>
                    </div>
                    <div className='productdisplay-right-description-details'>
                        <h2>Adoption Fee</h2>
                        <div className="productdisplay-right-price-new">
                            ₹ {fee}
                        </div>
                    </div>
                </div>
                <Link to={`/AdoptionApplication/${pet_id}`}><button className='btn'>Adopt</button></Link>                
        </div>
    </div>
    
  )
}

export default  ProductDisplay;