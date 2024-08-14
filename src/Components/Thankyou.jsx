import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Thankyou.css';
import ThankyouImage from './images/cat-in-basket.jpg'
import Footer from './Footer';

const ThankYouPage = () => {
    const navigate = useNavigate();
    const paymentDate = new Date();
    
    // Calculate the delivery date (7 days after payment)
    const deliveryDate = new Date(paymentDate);
    deliveryDate.setDate(deliveryDate.getDate() + 7);
    
    return (
        <>
        <center>
        <div className="thank-you-container">
            <img src={ThankyouImage} alt="Pet" className="pet-image" />
            <div className="text-container">
                <h2>Thank You for Adopting a Pet!</h2>
                <p>
                    Congratulations on your new companion! Your pet will be available for pickup within the next 7 days. 
                    Our shelter will contact you a day before the pet reaches your destination. Your estimated delivery 
                    date is <strong>{deliveryDate.toDateString()}</strong>. We hope you enjoy many happy moments together!
                    Contact the shelter via <span>pawandhome@gmail.com</span> in case of any queries.
                </p>
                <button className="back-button" onClick={() => navigate('/UserApplications')}>Back</button>
            </div>
        </div>
        </center>
        <Footer />
        </>
    );
};

export default ThankYouPage;