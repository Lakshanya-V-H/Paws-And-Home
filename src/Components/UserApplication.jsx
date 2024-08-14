import React, { useState } from 'react';
import './UserApplication.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
const AdoptionHistory = () => {
    // const [applications] = useState([
    //     {
    //         application_id: 1,
    //         pet_id:1,
    //         user_id:3,
    //         status: "Accepted",
    //         applicationDate: "2024-08-10",
    //     },
    //     {
    //         application_id: 2,
    //         pet_id:2,
    //         user_id:1,        
    //         status: "Accepted",
    //         applicationDate: "2024-08-10",
    //     },
    //     {
    //         application_id: 3,
    //         pet_id:3,
    //         user_id:1,
    //         status: "Pending",
    //         applicationDate: "2024-08-10",
            
    //     },
    //     {
    //         application_id: 4,
    //         pet_id:1,
    //         user_id:2,
    //         status: "Declined",
    //         applicationDate: "2024-08-10",
            
    //     },
    //     // Add more sample applications if needed
    // ]);

    const[applications,setApplications] = useState([]);
    const [pets,setPets] = useState([]);
    const [user,setUser] = useState([]);
    const [payments,setPayments] = useState([]);
    
    useEffect(()=>{
        const storedUser = localStorage.getItem('user');
        const user = JSON.parse(storedUser)
        setUser(user);

        // Fetch pets from the Spring Boot backend        
        axios.get('http://localhost:8080/petDetails/fetchAll')
        .then(response => {
            setPets(response.data);
        })
        .catch(error => {
            console.error('There was an error fetching the pets!', error);
        });

        // Fetch applications from the Spring Boot backend
        axios.get('http://localhost:8080/adoptionDetails/fetchAll')
        .then(response => {
            setApplications(response.data);
        })
        .catch(error => {
            console.error('There was an error fetching the adoption applications!', error);
        });

        axios.get('http://localhost:8080/paymnetDetails/fetchAll')
        .then(response => {
            setPayments(response.data);
        })
        .catch(error => {
            console.error('There was an error fetching the paymnet details!', error);
        });

    },[])


    const filteredApplications = applications.filter(app => app.user.user_id === user.user_id);
    const getPetDetails = (pet_id) => pets.find(pet => pet.pet_id === pet_id);

    // const [payments] = useState([
    //     {
    //         application_id: 1,
    //         payment_date: "2024-08-12",
    //         status: "Success",
    //     },
    //     // Add more sample payments if needed
    // ]);

    const getPaymentStatus = (applicationId) => {
        const payment = payments.find(pay => pay.adoptionApplication.application_id === applicationId);
        return payment ? "Paid" : "Pending";
    };

    const getPaymentDate = (applicationId) => {
        const payment = payments.find(pay => pay.adoptionApplication.application_id === applicationId);
        return payment ? payment.payment_date : null;
    };

    const handlePay = (applicationId , adoptionFee) => {
        localStorage.setItem('app-data', JSON.stringify({id : applicationId , fee : adoptionFee}));
        // const appData =JSON.parse(localStorage.getItem('app-data'));
        // console.log(appData);
        console.log("Application Data stored successfully in localstorage");

    }
    const renderAction = (applicationId, status , adoptionFee) => {
        const paymentStatus = getPaymentStatus(applicationId);
        if (status === "Accepted" && paymentStatus === "Pending") {
            console.log(adoptionFee);
            return( 
                <Link to={`/Payment`}> 
                    {/* <Link to={{ pathname: '/Payment', state: { fee: adoptionFee, applicationId: applicationId } }}> */}
                        <button onClick={handlePay(applicationId , adoptionFee)}>Pay</button> 
                   </Link>
            );
        } else if (status === "Accepted" && paymentStatus === "Paid") {
            return <span>Paid</span>;
        }
        return null;
    };

    return (
        <div className="adoption-history-container">
            <h2>Adoption Application History</h2>
            <table className="adoption-history-table">
                <thead>
                    <tr>
                        <th>Serial Number</th>
                        <th>Pet Name</th>
                        <th>Species</th>
                        <th>Pet Image</th>
                        <th>Breed</th>
                        <th>Date of Application</th>
                        <th>Adoption Fee</th>
                        <th>Status</th>
                        <th>Action</th>
                        <th>Payment Date</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredApplications.map((application, index) => {
                        const petDetails = getPetDetails(application.pet_id);
                        return(
                        <tr key={application.application_id}>
                            <td><center>{index + 1}</center></td>
                            <td>{petDetails ? petDetails.pet_name : 'Unknown'}</td>
                            <td>{petDetails ? petDetails.species : 'Unknown'}</td>
                            <td><center>{petDetails ? 
                            <img src={`data:image/jpeg;base64,${petDetails.image}`} alt={petDetails.name} style={{maxWidth:'100px',height:'70px'}}/>
                            : 'Unknown'}</center></td>
                            <td>{petDetails ? petDetails.breed : 'Unknown'}</td>
                            <td>{application.applicationDate}</td>
                            <td>₹ {petDetails ? petDetails.fee : 'Unknown'}</td>
                            <td>{application.status}</td>
                            <td>{renderAction(application.application_id, application.status ,petDetails ? petDetails.fee : 'Unknown' )}</td>
                            <td>{getPaymentDate(application.application_id)}</td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default AdoptionHistory;
