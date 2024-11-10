// import React from 'react'
// import {ShopContext} from './Context/ShopContext';
// import { useParams } from 'react-router-dom';
// import ProductDisplay from './ProductDisplay';
// import { useContext , useEffect , useState} from 'react';
// import Footer from './Footer';
// import axios from 'axios';


// const Product = () => {
// // const {all_pets} = useContext(ShopContext);
// const [pets,setPets] = useState([]);
// const {prod_no} = useParams();
// useEffect(() => {
//     // Fetch pets from the Spring Boot backend
//     axios.get('http://localhost:8080/petDetails/fetchAll')
//         .then(response => {
//             setPets(response.data);
//             console.log("Response");
//             console.log(response.data);
//         })
//         .catch(error => {
//             console.error('There was an error fetching the pets!', error);
//         });
// }, []);
// const pet = pets.find((e)=> e.pet_id === Number(prod_no));
//   return (
//     <div>
//         <ProductDisplay product={pet} />
//         <Footer />
//     </div>
//   )
// }

// export default Product

import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductDisplay from './ProductDisplay';
import Footer from './Footer';

const Product = () => {
    const [pets, setPets] = useState([]);
    const { prod_no } = useParams();

    useEffect(() => {
        // Fetch pets from the backend
        axios.get('http://localhost:8080/petDetails/fetchAll')
            .then(response => {
                setPets(response.data);
                console.log("Response:", response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the pets!', error);
            });
    }, []);

    const pet = pets.find(e => e.pet_id === Number(prod_no));
    console.log("Here it is .... ");
    console.log(pet);
    return (
        <div>
            {pet ? (
                <ProductDisplay product={pet} />
            ) : (
                <p>Loading or pet not found...</p>
            )}
            <Footer />
        </div>
    );
};

export default Product;