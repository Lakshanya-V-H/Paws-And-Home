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
import { useContext } from "react";
import React  from "react";
import { ShopContext } from "./Context/ShopContext";
import ProductFrame from "./ProductFrame";
import Navbar2 from './Navbar2';
import Footer from './Footer';

const ShopCategory = (props) => {
    const {all_pets} = useContext(ShopContext);
    
    return (
        <div className='shop-category'>
            <Navbar2 />
            <div className='product-page-container'>
                <div className='heading'>
                    <h1>{props.category}s</h1>
                </div>
                <div className='product-list'>
                {all_pets.map((item,i)=>{
                    if(props.category === item.category)
                    {
                        return(                    
                                <ProductFrame key={item.id} product={item} />        
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