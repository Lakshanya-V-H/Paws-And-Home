import React, { useState } from 'react';
import './FAQs.css';
import Footer from './Footer';

const faqs = [
    { id: 1, question: "What is PawsAndHome?", answer: "PawsAndHome is an online platform that connects potential adopters with pets in need of homes. Our goal is to streamline the pet adoption process and make it easier for shelters to manage adoptions." },
    { id: 2, question: "How do I create an account on PawsAndHome?", answer: "To create an account, click on the 'Sign Up' button on the homepage. Fill in the required details and follow the instructions to complete your registration." },
    { id: 3, question: "How can I browse available pets?", answer: "Once you have an account, you can browse available pets by navigating to the 'Browse Pets' section. Use the filters to narrow down your search based on species, age, and other preferences." },
    { id: 4, question: "What information is included in a pet's profile?", answer: "A pet's profile includes photos, a description, age, breed, health status, and any other relevant information provided by the shelter." },
    { id: 5, question: "How do I submit an adoption application?", answer: "To submit an adoption application, click on the 'Adopt' button on the pet's profile page. Fill out the application form with the necessary details and submit it for review." },
    { id: 6, question: "Is there a fee for adopting a pet?", answer: "Yes, there is usually an adoption fee to help cover the costs of caring for the pet. The fee varies depending on the shelter and the pet." },
    { id: 7, question: "How do I pay the adoption fee?", answer: "Once your adoption application is approved, you can pay the adoption fee securely through our integrated payment gateway on the platform." },
    { id: 8, question: "Can I communicate with the shelter through PawsAndHome?", answer: "Yes, you can communicate with the shelter staff through the messaging feature on our platform. This allows you to ask any questions and receive updates on your adoption application." },
    { id: 9, question: "How long does it take to process an adoption application?", answer: "The processing time for adoption applications varies depending on the shelter's policies and the specific pet. You will be notified of the status of your application through the platform." },
    { id: 10, question: "Can I visit the shelter to meet the pet before adopting?", answer: "Yes, we encourage potential adopters to visit the shelter to meet the pet in person. Please contact the shelter to arrange a visit." },
    { id: 11, question: "What should I do if I encounter issues with the platform?", answer: "If you experience any issues with the platform, please contact our support team through the 'Contact Us' section. We are here to help!" },
    { id: 12, question: "How do I know if a pet is still available for adoption?", answer: "Our platform is updated regularly to ensure that the pet listings are accurate. However, availability can change quickly, so we recommend contacting the shelter directly for the most current information." },
    { id: 13, question: "What happens after I submit an adoption application?", answer: "After you submit an adoption application, the shelter will review your information. If approved, you will be contacted to proceed with the adoption process, which includes paying the adoption fee and possibly arranging a visit." },
    { id: 14, question: "Can I adopt more than one pet at a time?", answer: "Yes, you can adopt more than one pet if the shelter approves your application for multiple pets. Be sure to discuss this with the shelter during the application process." },
    { id: 15, question: "What should I do if I can no longer care for my adopted pet?", answer: "If you can no longer care for your adopted pet, please contact the shelter from which you adopted the pet. They can provide guidance on the next steps and help ensure the pet finds a new home." }
];

const FAQPage = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = index => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <>
        <div className="faq-container">
            <div className='heading'>
                <h1>Frequently Asked Questions</h1>
            </div>
            {faqs.map((faq, index) => (
                <div key={faq.id} className="faq-item">
                    <h2 onClick={() => toggleFAQ(index)} className="faq-question">
                        {faq.question}
                    </h2>
                    {activeIndex === index && <p className="faq-answer">{faq.answer}</p>}
                </div>
            ))}
        </div>
        <Footer />
        </>
    );
};

export default FAQPage;
