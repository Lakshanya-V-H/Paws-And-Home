import Czesio from './images/PetOverview/Czesio.png';
import Fiona from './images/PetOverview/Fiona.jpg'
import Lilo from './images/PetOverview/Lilo.png';
import Lucy from './images/PetOverview/Lucy.png'
import Marshall from './images/PetOverview/Marshall.jpg';
import Merlin from './images/PetOverview/Merlin.png';
import Mia from './images/PetOverview/Mia.jpeg'
import Pigglee from './images/PetOverview/Pigglee.png';
import Ruby from './images/PetOverview/Ruby.jpg';
import ProductFrame from './ProductFrame';
import Navbar2 from './Navbar2';
import Footer from './Footer';

const Deals = () =>{
    let deal_products=[
        {
            id:"dog1",
            name:'Cizo',
            category:'Dog',
            image:Czesio,
            price:'Yrokshire Terrier',
            age:2,
            prod_no:1,
        },
        {
            id:"cat1",
            name:'Fiona',
            category:'Cat',
            image:Fiona,
            price:'American Whitehair',
            age : 8,
            prod_no:2,
        },
        {
            id:"dog2",
            name:'Lilo',
            category:'Dog',
            image:Lilo,
            price:'Labrador Retriever',
            age:2,
            prod_no:3,
        },
        {
            id:"cat2",
            name:'Lucy',
            category:'Cat',
            image:Lucy,
            price:'Mixed',
            age:1,
            prod_no:4,
        },
        {
            id:"dog3",
            name:'Marshall',
            category:'Dog',
            image:Marshall,
            price:'French Bulldog',
            age : 2,
            prod_no:5,
        },
        {
            id:"cat3",
            name:'Merlin',
            category:'Cat',
            image:Merlin,
            price:'Mixed',
            age:2,
            prod_no:6,
        },
        {
            id:"cat4",
            name:'Mia',
            category:'Cat',
            image:Mia,
            price:'British Shorthair',
            age:4,
            prod_no:7,
        },
        {
            id:"cat5",
            name:'Pigglee',
            category:'Cat',
            image:Pigglee,
            price:'Mixed',
            age:1,
            prod_no:8,
        },
        {
            id:"dog4",
            name:'Ruby',
            category:'Dog',
            image:Ruby,
            price:'German Shephered',
            age:8,
            prod_no:9,
        },
    
    ]
    
    return(
        <>
            {
            <div>
                <Navbar2 />
            <div className="product-page-container">
                <div className='heading'>
                <h1>New Comers</h1>
                </div>
                <div className="product-list">
                    {deal_products.map((product) => (
                    <ProductFrame key={product.id} product={product} />
                    ))}
                </div>
            </div>
            <Footer />
            </div>}
        </>
    
    );
    }
    
    export default Deals;