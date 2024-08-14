import React, { useContext, useState } from 'react';
import './AdoptionForm.css';
import { ShopContext } from './Context/ShopContext';
import { useNavigate, useParams} from 'react-router-dom';
import { useEffect } from 'react';
import Footer from './Footer';
import axios from 'axios';
const SimpleAdoptionForm = () => {
  const {all_pets} = useContext(ShopContext);
  const {prod_no} = useParams();
  const pet = all_pets.find((e) => e.prod_no === Number(prod_no));
  const [assuranceText, setAssuranceText] = useState('');
  const [comment, setComment] = useState('');
  const [isAssured, setIsAssured] = useState(false);
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [formData , setFormData] = useState({
    user:'',
    pet_id:null,
    comment:'',
  });

  useEffect(()=>{
    try{

      const storedUser = localStorage.getItem('user');
      if(!storedUser)
      {
        setIsLoggedIn(false);
        navigate('/LoginE');
        return ;
      }
      else
      {
        const loguser = JSON.parse(storedUser);
        setFormData((prevData) => ({
          ...prevData, // Spread the existing formData to keep other fields
          user: loguser, // Update only the user_id
        }));
        console.log(formData);
      }
    }
    catch(error){
      console.log("Error occurred ",error);
    }
  },[isLoggedIn,navigate])

  const handleAssuranceChange = (e) => {
    const value = e.target.value;
    setAssuranceText(value);
    setIsAssured(value.toLowerCase() === 'i assure');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isAssured) {
      // Handle form submission logic
      try
      {
          const petdata = await axios.get(`http://localhost:8080/petDetails/fetchById/${Number(prod_no)}`)
          console.log(petdata.data);
          console.log(petdata.data.pet_id);

          const updatedFormData = {
            ...formData,
            pet_id: petdata.data.pet_id, // Update pet_id
            comment: comment // Update comment
          }
          
          try
          {
              const response = await axios.post("http://localhost:8080/adoptionDetails/insertApplication" , updatedFormData);
              console.log(response.data);
              console.log(updatedFormData);
          }
          catch(error)
          {
              console.log("Error occured while posting the application" , error);
          }          
      }
      catch(error)
      {
        console.log("Error ocurred while fetching pet detail", error)
      }
      // console.log('Form submitted:', { assuranceText, comment });
      alert("You can track your application status in your profile");
      window.history.back();
      // navigate('/payment');
    } else {
      alert('Please type "I assure" to proceed.');
    }
  };

  return (
    <>
    <div className="simpleAdoptionForm__container">
      <div className="simpleAdoptionForm__formSection">
        <h2 className="simpleAdoptionForm__title">Adoption Application</h2>
        <div className="simpleAdoptionForm__commitment">
          <p className="simpleAdoptionForm__text">
          Welcoming a new pet into your home is a significant and joyful commitment. It requires time, patience, and a genuine love for animals. Our shelter is dedicated to ensuring that every pet finds a caring and responsible owner. We appreciate your interest in adopting and taking the step to provide a safe and loving environment for these wonderful creatures. Pets bring immense joy and companionship, but they also depend on you for their well-being and happiness. Your decision to adopt demonstrates a willingness to meet these responsibilities and contribute positively to the lives of these animals.
          </p>
          <p className="simpleAdoptionForm__text">
            By typing "I assure" below, you commit to taking care of the pet responsibly and providing a loving home.
          </p>
          <div className="simpleAdoptionForm__assuranceGroup">
            <input 
              type="text" 
              value={assuranceText} 
              onChange={handleAssuranceChange} 
              placeholder="Type 'I assure'" 
              className="simpleAdoptionForm__input"
            />
          </div>
        </div>
        <div className="simpleAdoptionForm__group">
          <label className="simpleAdoptionForm__label">Comments</label>
          <textarea 
            value={comment} 
            onChange={(e) => setComment(e.target.value)} 
            className="simpleAdoptionForm__textarea"
            placeholder="Leave a comment"
          />
        </div>
        <button 
          type="submit" 
          onClick={handleSubmit} 
          className="simpleAdoptionForm__submitButton"
          disabled={!isAssured}
        >
          Submit Adoption Application
        </button>
      </div>
      <div className="simpleAdoptionForm__petDetails">
        <img src={pet.image} alt={pet.name} className="simpleAdoptionForm__petImage" />
        <h2 className="simpleAdoptionForm__petName">{pet.name}</h2>
        <p className="simpleAdoptionForm__petDescription">{pet.price}</p>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default SimpleAdoptionForm;
