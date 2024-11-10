// import { useContext } from "react";
// import React  from "react";
// import { ShopContext } from "./Context/ShopContext";
// import ProductFrame from "./ProductFrame";
// import Navbar2 from './Navbar2';
// import Footer from './Footer';

// const ShopCategory = (props) => {
//     const {all_pets} = useContext(ShopContext);
    
//     return (
//         <div className='shop-category'>
//             <Navbar2 />
//             <div className='product-page-container'>
//                 <div className='heading'>
//                     <h1>{props.category}s</h1>
//                 </div>
//                 <div className='product-list'>
//                 {all_pets.map((item,i)=>{
//                     if(props.category === item.category)
//                     {
//                         return(                    
//                                 <ProductFrame key={item.id} product={item} />        
//                         )        
//                     }
//                     else{
//                         return null;
//                     }
//                 })}
//                 </div>
//             </div>
//             <Footer />
//         </div>
//       )  
// }

// export default ShopCategory;
import { useContext ,useState , useEffect} from "react";
import React  from "react";
import { ShopContext } from "./Context/ShopContext";
import ProductFrame from "./ProductFrame";
import Navbar2 from './Navbar2';
import Footer from './Footer';
import axios from "axios";


const ShopCategory = (props) => {
    const {all_pets} = useContext(ShopContext);
    const [displayed , setDisplayed] = useState(false);

    const [pets,setPets] = useState([]);
    useEffect(() => {
        // Fetch pets from the Spring Boot backend
        axios.get('http://localhost:8080/petDetails/fetchAll')
            .then(response => {
                setPets(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the pets!', error);
            });
    }, []);

    const {category , breed} = props;
    console.log({breed});

    
    return (
        <div className='shop-category'>
            <Navbar2 />
            <div className='product-page-container'>
                <div className='heading'>
                    <h1>{props.category}s</h1>
                </div>
                <div className='product-list'>
                {pets.map((item,i)=>{
                    if(props.category === item.species && (breed === "notDefined" || breed === ''))
                    {
                        return(                    
                                <ProductFrame key={item.pet_id} product={item} />         
                        )        
                    }
                    else if(props.category === item.species && item.breed.toLowerCase().includes(breed))
                    {
                        return(                    
                                <ProductFrame key={item.pet_id} product={item} />         
                        )        
                    }
                    
                    else{
                        return null;
                    }
                })}
                </div>
            </div>
            <Footer />
        </div>
      )  
}

export default ShopCategory;