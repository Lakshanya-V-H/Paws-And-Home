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

function App() {
  return (
    <div>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route index element={<Home/>}/>
        
        <Route exact path="/LoginE" element={<Login />} />
        <Route exact path="/Sign" element={<SignIn />} />
        <Route exact path='/Home' element={<Home/>} />
        <Route exact path='/Pets' element={<PetOverview/>} />
        <Route exact path='/Dog' element={<ShopCategory category="Dog"/>} />
        <Route exact path='/Cat' element={<ShopCategory category="Cat"/>} />
        <Route exact path='/Rabbit' element={<ShopCategory category="Rabbit"/>} />
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
