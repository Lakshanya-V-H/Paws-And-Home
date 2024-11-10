import { Route,Routes } from 'react-router-dom';
import ScrollToTop from './Components/ScrollTop';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Login from './Components/LoginEmail';
import SignIn from './Components/SignIn';
import Footer from './Components/Footer';
import PetOverview from './Components/PetOverview'
import ShopCategory from './Components/ShopCategory';
import Product from './Components/Product';
import FAQs from './Components/FAQs';
import Privacy from './Components/Privacy';
import Terms from './Components/Terms';
import About from './Components/About';
import Contact from './Components/Contact';
import AdoptionForm from './Components/AdoptionForm';
import PetPickupRequest from './Components/PetPickUpForm';
import AdminDashboard from './Components/AdminDashboard';
import ManageAdoption from './Components/ManageAdoption';
import ManageUser from './Components/ManageUser';
import ManagePet from './Components/ManagePet';
import ManagePayment from './Components/ManagePayment';
import ManagePetPickup from './Components/ManagePetPickup';
import PaymentPage from './Components/Payment';
import Profile from './Components/Profile';
import AdoptionHistory from './Components/UserApplication';
import ThankYouPage from './Components/Thankyou';
import AdoptionQuestions from './Components/AdoptionQuestions';
import { useState , useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function App() {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [breed,setBreed] = useState('notDefined');
  const navigate = useNavigate();

    useEffect(() => {
        // Fetch the list of pets from the backend
        axios.get('http://localhost:8080/petDetails/fetchAll')
            .then(response => {
                setPets(response.data);
                setFilteredPets(response.data); // Initialize filteredPets with all pets
            })
            .catch(error => console.error('Error fetching pets:', error));
    }, []);

    const handleSearch = (searchTerm) => {
      const term = searchTerm.toLowerCase();
      const results = pets.filter(pet => 
          pet.breed.toLowerCase().includes(term)
      );
      setFilteredPets(results);
      // console.log("From app js",results[0].species);
      console.log("From app js",results);
      const available = results[0];
      if(available)
      {

        const species = results[0].species;
        console.log(species);
        setBreed(term);
        if(species === "Dog")
          {
            navigate(`/Dog`);
          }
        if(species === "Cat")
          {
            navigate(`/Cat`);
          }
        if(species === "Rabbit")
        {
          navigate(`/Rabbit`);
        }
      }
      else
      {
        //alert("Sorry the breed you search for is not available.");
      }
  };
  return (
    <div>
      <ScrollToTop />
      <Navbar onSearch={handleSearch} />
      <Routes>
        <Route index element={<Home/>}/>
        
        <Route exact path="/LoginE" element={<Login />} />
        <Route exact path="/Sign" element={<SignIn />} />
        <Route exact path='/Home' element={<Home/>} />
        <Route exact path='/Pets' element={<PetOverview/>} />
        <Route exact path='/Dog' element={<ShopCategory category="Dog" breed={breed}/>} />
        <Route exact path='/Cat' element={<ShopCategory category="Cat" breed={breed}/>} />
        <Route exact path='/Rabbit' element={<ShopCategory category="Rabbit" breed={breed}/>} />
        <Route path="/product" element={<Product />}>
          <Route path=':prod_no' element={<Product />} />
        </Route> 
        <Route exact path='/FAQ' element={<FAQs/>}/>
        <Route exact path='/Privacy' element={<Privacy/>}/>
        <Route exact path='Terms' element={<Terms />} />
        <Route exact path='/About' element={<About />} />
        <Route exact path='/Contact' element={<Contact />} />
        <Route exact path='/PetPickup' element={<PetPickupRequest />} />
        <Route path='/AdoptionApplication' element={<AdoptionForm />}>
          <Route path=':prod_no' element={<AdoptionForm />} />
        </Route>
        <Route path='/AdoptionQuestions' element ={<AdoptionQuestions />}>
          <Route path=':prod_no' element={<AdoptionQuestions/>}/>
        </Route>
        <Route exact path='/Payment' element={<PaymentPage />} />
        <Route exact path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/manage-adoption-application" element={< ManageAdoption/>} />
        <Route path="/manage-user" element={<ManageUser/>} />
        <Route path="/manage-pet" element={<ManagePet/>} />
        <Route path="/manage-petpickup" element={<ManagePetPickup/>} />
        <Route path='/manage-payment' element={<ManagePayment />} />
        <Route path='/ManageProfile' element={<Profile />}  />
        <Route path="/UserApplications" element={<AdoptionHistory />} />
        <Route path="/Thankyou" element={<ThankYouPage />} />
      </Routes>
      
    </div>
  );
}

export default App;
