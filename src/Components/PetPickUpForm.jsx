import React, { useState, useEffect } from 'react';
import './PetPickUpForm.css';
import image1 from './images/Petpickup/pet-pickup-img3.jpg';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PetPickupRequest = () => {
  const [formData, setFormData] = useState({
    pet_type: '',
    pet_condition: {
      abandoned: false,
      injured: false,
      stray: false
    },
    location: '',
    description: '',
    user:'',
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();

  useEffect(()=>{
    try{

      const storedUser = localStorage.getItem('user');
      
      if(!storedUser)
      {
        setIsLoggedIn(false);
        navigate('/LoginE');
        return ;
      }
      const user = JSON.parse(storedUser);

      setFormData((prevData) => ({
        ...prevData, // Spread the existing formData to keep other fields
        user: user, // Update only the user_id
      }));

      console.log(formData);

    }
    catch(error){
      console.log("Error occurred ",error);
    }
  },[isLoggedIn,navigate])

  useEffect(() => {
    const checkFormValidity = () => {
      const { pet_type, pet_condition, location, description } = formData;
      const isAnyConditionChecked = Object.values(pet_condition).some(Boolean);
      if (pet_type && isAnyConditionChecked && location && description) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    };
    checkFormValidity();
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        pet_condition: { ...prevData.pet_condition, [name]: checked }
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert petCondition object to comma-separated string
    const selectedConditions = Object.keys(formData.pet_condition)
      .filter(condition => formData.pet_condition[condition])
      .join(',');

    // Create the data to be sent to the backend
    const submissionData = {
      ...formData,
      pet_condition: selectedConditions
    };

    try
    {
      const response = await axios.post("http://localhost:8080/requestDetails/insertRequest", submissionData);
          // Submit form logic here
          alert("Form Submitted");
          console.log(submissionData);
          console.log(response.data);
    }
    catch(error)
    {
        console.log("An error occured while submitting request " ,error);
    }



    setFormData({
      pet_type: '',
      pet_condition: [],
      location: '',
      description: '',

  })};

  return (
    <>
    <div className="pet-pickup-request-container">
      <div className="pet-pickup-request">
        <div className="form-section">
          <span className='notice'>Important Notice : </span>
          <span className='notice-info'>Our pet pickup service is currently available exclusively for abandoned pets and stray animals.
            If you have found a stray or need assistance with an abandoned pet, please submit a pickup request through our platform.
            We appreciate your support and dedication to helping animals in need.</span>
          <h1>Pet Pickup Request</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="petType">Pet Type</label>
              <input
                type="text"
                id="petType"
                name="pet_type"
                value={formData.pet_type}
                onChange={handleChange}
                className="pet-pickup-input"
                required
              />
            </div>
            <div className="form-group">
              <label>Pet Condition</label>
              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="abandoned"
                    checked={formData.pet_condition.abandoned}
                    onChange={handleChange}
                    className="pet-pickup-checkbox"
                  />
                  Abandoned
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="injured"
                    checked={formData.pet_condition.injured}
                    onChange={handleChange}
                    className="pet-pickup-checkbox"
                  />
                  Injured
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="stray"
                    checked={formData.pet_condition.stray}
                    onChange={handleChange}
                    className="pet-pickup-checkbox"
                  />
                  Stray
                </label>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="pet-pickup-input"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="pet-pickup-input"
                required
              />
            </div>
            <button type="submit" className="pet-pickup-submit" disabled={!isFormValid}>Submit Request</button>
          </form>
          <p className="contact-info">
            The shelter may contact you through phone in case of any queries regarding the pick up request.
          </p>
        </div>
        <div className="image-section">
          <img src={image1} alt="Pet" className="pet-image" />
        </div>
      </div>
    </div>
    <Footer />
  </>
  );
};

export default PetPickupRequest;
