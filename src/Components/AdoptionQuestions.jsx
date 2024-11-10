import React, { useState } from 'react';
import './AdoptionQuestions.css';
import Footer from './Footer';
import img1 from './images/rabbit_peek.jpg'
import { useEffect } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
function AdoptionQuestionnaire() {
    const {prod_no} = useParams();
    const [formData, setFormData] = useState({
        user:'',
        pet_id:null,
        numberOfAdults: 0,
        numberOfChildren: 0,
        agesOfChildren: '',
        householdAgreement: '',
        allergiesToPets: '',
        residenceType: '',
        rentOrOwn: '',
        leaseAllowsPets: '',
        landlordName: '',
        landlordContact: '',
        ownedPetsBefore: '',
        previousPetsOutcome: '',
        otherPetsDetails: '',
        primaryCaretaker: '',
        hoursAlone: '',
        daytimeLocation: '',
        sleepLocation: '',
        exercisePlan: '',
        financialPreparedness: '',
        meetAndGreet: "", // New field for meet and greet session preference
        meetAndGreetDate: "", // New field for preferred date of meet and greet
    });

  const navigate = useNavigate();

    useEffect(()=>{
        try
        {
          const storedUser = localStorage.getItem('user');
            const loguser = JSON.parse(storedUser);
            setFormData((prevData) => ({
              ...prevData, // Spread the existing formData to keep other fields
              user: loguser, // Update only the user_id
            }));
            console.log(formData);
        }
        catch(error){
          console.log("Error occurred ",error);
        }
      },[])

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        let formErrors = {};

        // Validate required fields
        if (!formData.numberOfAdults) formErrors.adults = "Number of adults is required.";
        if (formData.numberOfChildren && formData.agesOfChildren==="") formErrors.agesOfChildren = "Age of children is required.";
        if (formData.householdAgreement === "") formErrors.householdAgreement = "Agreement to adoption is required.";
        if (formData.allergiesToPets === "") formErrors.petAllergies = "Allergy information is required.";
        if (!formData.residenceType) formErrors.residenceType = "Type of residence is required.";
        if (formData.rentOrOwn === "") formErrors.rentOrOwn = "Please specify if you rent or own your home.";

        // Conditional field validations
        if (formData.rentOrOwn === "rent" && !formData.leaseAllowsPets) {
            formErrors.leaseAllowsPets = "Please specify if your lease allows pets.";
        }
        if (formData.rentOrOwn === "rent" && !formData.landlordName) {
            formErrors.landlordName = "Landlord's name is required.";
        }
        if (formData.rentOrOwn === "rent" && !formData.landlordContact) {
            formErrors.landlordContact = "Landlord's contact is required.";
        }

        if(formData.ownedPetsBefore === "") formErrors.previousPets = "Please specify if you have owned pets or not."

        // Conditional field validations
        if(formData.ownedPetsBefore === "yes" && !formData.previousPetsOutcome){
            formErrors.petStatus = "Please mention about your previous pets.";
        }

        if(formData.ownedPetsBefore === "yes" && !formData.otherPetsDetails){
            formErrors.otherPets = "Please type No if you don't have pets currently or else give the details of the current pet.";
        }

        if(formData.primaryCaretaker === "") formErrors.caretaker = "Please mention the primary care taker of the pet.";
        if(formData.hoursAlone === "") formErrors.hoursAlone = "Please mention the hours.";
        if(formData.daytimeLocation === "") formErrors.daytimeLocation = "Please mention where the pet will be kept during daytime.";
        if(formData.sleepLocation === "") formErrors.sleepingLocation = "Please mention where the pet will sleep.";
        if(formData.financialPreparedness === "") formErrors.financialResponsibility = "Please mention about the financial responsibility.";
        if(formData.meetAndGreet === "") formErrors.meetAndGreet = "Please mention if you are interested for a meet and greet session.";

        //Conditional validation
        if(formData.meetAndGreet === "yes" && formData.meetAndGreetDate === ""){
            formErrors.meetAndGreetDate = "Please specify the preferred date for meet and greet session.";
        }

        // Final form validation
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    }


    const generateOptions = (max) => {
      return Array.from({ length: max + 1 }, (_, i) => (
          <option key={i} value={i}>{i}</option>
      ));
  };

    // Get today's date in the format YYYY-MM-DD to set as the minimum date
    const today = new Date().toISOString().split("T")[0];

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Perform form submission actions
            try
            {
                const petdata = await axios.get(`http://localhost:8080/petDetails/fetchById/${Number(prod_no)}`)
                console.log(petdata.data);
                console.log(petdata.data.pet_id);

                const updatedFormData = {
                    ...formData,
                    pet_id: petdata.data.pet_id, // Update pet_id
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
            alert("Form submitted successfully! You can track your application status in your profile.");
            navigate(`/product/${prod_no}`);
            // window.history.back();
            console.log("Form Data Submitted:", formData);
        }
        else
        {
            console.log("Error ocuured while submitting form data");
            
        }
    };

    return (
        <>
        <div className="adoption-questionnaire_container">
        <div className="adoption-questionnaire">
            <h2>Adoption Questionnaire</h2>
            <form onSubmit={handleSubmit}>
                <section className="household-info">
                    <h3>Household Information</h3>
                    <label>
                        Number of Adults in Household:
                        <select name="numberOfAdults" value={formData.numberOfAdults} onChange={handleChange}>
                            {generateOptions(10)} {/* Adjust the max number as needed */}
                        </select>
                        {errors.adults && <p className="error">{errors.adults}</p>}
                    </label>
                    <label>
                        Number of Children in Household:
                        <select name="numberOfChildren" value={formData.numberOfChildren} onChange={handleChange}>
                            {generateOptions(10)} {/* Adjust the max number as needed */}
                        </select>
                        
                    </label>
                    <label>
                        Ages of Children:
                        <input type="text" name="agesOfChildren" value={formData.agesOfChildren} onChange={handleChange} placeholder="e.g., 5, 10, 15" />
                        {errors.agesOfChildren && <p className="error">{errors.agesOfChildren}</p>}
                    </label>
                    <label>
                        Do all household members agree to the adoption?
                        <div>
                            <input type="radio" name="householdAgreement" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="householdAgreement" value="no" onChange={handleChange} /> No
                        </div>
                        {errors.householdAgreement && <p className="error">{errors.householdAgreement}</p>}
                    </label>
                    <label>
                        Does anyone in the household have allergies to pets?
                        <div>
                            <input type="radio" name="allergiesToPets" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="allergiesToPets" value="no" onChange={handleChange} /> No
                        </div>
                        {errors.petAllergies && <p className="error">{errors.petAllergies}</p>}
                    </label>
                </section>

                <section className="housing-info">
                    <h3>Housing Information</h3>
                    <label>
                        Type of Residence:
                        <input type="text" name="residenceType" value={formData.residenceType} onChange={handleChange} placeholder="House, Apartment, Condo, etc." />
                        {errors.residenceType && <p className="error">{errors.residenceType}</p>}
                    </label>
                    <label>
                        Do you rent or own your home?
                        <div>
                            <input type="radio" name="rentOrOwn" value="rent" onChange={handleChange} /> Rent
                            <input type="radio" name="rentOrOwn" value="own" onChange={handleChange} /> Own
                        </div>
                        {errors.rentOrOwn && <p className="error">{errors.rentOrOwn}</p>}
                    </label>
                    {formData.rentOrOwn === "rent" && (
                        <>
                            <label>
                                If renting, does your lease allow pets?
                                <div>
                                    <input type="radio" name="leaseAllowsPets" value="yes" onChange={handleChange} /> Yes
                                    <input type="radio" name="leaseAllowsPets" value="no" onChange={handleChange} /> No
                                </div>
                                {errors.leaseAllowsPets && <p className="error">{errors.leaseAllowsPets}</p>}
                            </label>
                            <label>
                                Landlord's Name:
                                <input type="text" name="landlordName" value={formData.landlordName} onChange={handleChange} />
                                {errors.landlordInfo && <p className="error">{errors.landlordName}</p>}
                            </label>
                            <label>
                                Landlord's Contact Information:
                                <input type="text" name="landlordContact" value={formData.landlordContact} onChange={handleChange} />
                                {errors.landlordInfo && <p className="error">{errors.landlordName}</p>}
                            </label>
                        </>
                    )}
                </section>

                <section className="pet-experience">
                    <h3>Pet Care Experience</h3>
                    <label>
                        Have you owned pets before?
                        <div>
                            <input type="radio" name="ownedPetsBefore" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="ownedPetsBefore" value="no" onChange={handleChange} /> No
                        </div>
                        {errors.previousPets && <p className='error'>{errors.previousPets}</p>}
                    </label>
                    <label>
                        What happened to your previous pets?
                        <input type="text" name="previousPetsOutcome" value={formData.previousPetsOutcome} onChange={handleChange} />
                        {errors.petStatus && <p className='error'>{errors.petStatus}</p>}
                    </label>
                    <label>
                        Do you currently have other pets? If yes, provide details
                        <textarea name="otherPetsDetails" value={formData.otherPetsDetails} onChange={handleChange} placeholder="Species, age, spayed/neutered, etc." />
                        {errors.otherPets && <p className='error'>{errors.otherPets}</p>}
                    </label>
                </section>

                <section className="care-responsibility">
                    <h3>Care and Responsibility</h3>
                    <label>
                        Who will be the primary caretaker of the pet?
                        <input type="text" name="primaryCaretaker" value={formData.primaryCaretaker} onChange={handleChange} />
                        {errors.caretaker && <p className='error'>{errors.caretaker}</p>}
                    </label>
                    <label>
                        How many hours per day will the pet be left alone?
                        <input type="number" name="hoursAlone" value={formData.hoursAlone} onChange={handleChange} />
                        {errors.hoursAlone && <p className='error'>{errors.hoursAlone}</p>}
                    </label>
                    <label>
                        Where will the pet be kept during the day?
                        <input type="text" name="daytimeLocation" value={formData.daytimeLocation} onChange={handleChange} />
                        {errors.daytimeLocation && <p className='error'>{errors.daytimeLocation}</p>}
                    </label>
                    <label>
                        Where will the pet sleep?
                        <input type="text" name="sleepLocation" value={formData.sleepLocation} onChange={handleChange} />
                        {errors.sleepingLocation && <p className='error'>{errors.sleepingLocation}</p>}
                    </label>
                    <label>
                        How do you plan to exercise the pet? (for dogs)
                        <input type="text" name="exercisePlan" value={formData.exercisePlan} onChange={handleChange} />
                    </label>
                    <label>
                        Are you prepared for the financial responsibilities of pet ownership?
                        <div>
                            <input type="radio" name="financialPreparedness" value="yes" onChange={handleChange} /> Yes
                            <input type="radio" name="financialPreparedness" value="not sure" onChange={handleChange} /> Not Sure
                        </div>
                        {errors.financialResponsibility && <p className='error'>{errors.financialResponsibility}</p>}
                    </label>
                </section>
                <section className='meet-and-greet'>
                  <h3>Meet and Greet Session</h3>
                  <label>
                      Would you like to have a meet and greet session with the pet at the animal shelter?
                      <select name="meetAndGreet" value={formData.meetAndGreet} onChange={handleChange}>
                          <option value="">Select</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                      </select>
                      {errors.meetAndGreet && <p className='error'>{errors.meetAndGreet}</p>}
                  </label>
                  {/* Conditionally render the date input if "Yes" is selected */}
                  {formData.meetAndGreet === "yes" && (
                      <label>
                          Preferred Date for Meet and Greet:
                          <input
                              type="date"
                              name="meetAndGreetDate"
                              value={formData.meetAndGreetDate}
                              onChange={handleChange}
                              min={today}
                              className="meet-and-greet-date" // Optional unique class for styling
                          />
                          {errors.meetAndGreetDate && <p className='error'>{errors.meetAndGreetDate}</p>}
                      </label>
                  )}
                </section>

                <button type="submit">Submit Adoption Application</button>
            </form>
        </div>
        <div className='adoption-questionnaire-image'>
            <img src={img1} alt="image loading" className="simpleAdoptionForm__petImage" />
        </div>
        </div>
        <Footer />
        </>
    );
}

export default AdoptionQuestionnaire;