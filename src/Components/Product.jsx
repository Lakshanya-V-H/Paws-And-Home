import React from 'react'
import {ShopContext} from './Context/ShopContext';
import { useParams } from 'react-router-dom';
import ProductDisplay from './ProductDisplay';
import { useContext } from 'react';
import Footer from './Footer';

const Product = () => {
const {all_pets} = useContext(ShopContext);
const {prod_no} = useParams();
const pet = all_pets.find((e)=> e.prod_no === Number(prod_no));
  return (
    <div>
        <ProductDisplay product={pet} />
        <Footer />
    </div>
  )
}

export default Product