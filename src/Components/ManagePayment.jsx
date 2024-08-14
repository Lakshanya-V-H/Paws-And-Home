import React, { useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import './ManagePayment.css';
import axios from 'axios';

const ManagePayment = () => {
  const [payments, setPayments] = useState([
    // { payment_id: 1, application_id: 1, amount: 1500, payment_date: '2023-07-24', status: 'Completed', transaction_id: 'TX123456' },
    // { payment_id: 2, application_id: 2, amount: 2000, payment_date: '2023-07-25', status: 'Completed', transaction_id: 'TX123457' },
    // { payment_id: 3, application_id: 3, amount: 3000, payment_date: '2023-07-26', status: 'Completed', transaction_id: 'TX123458' },
    
  ]);

  const [applications, setApplications] = useState([
    // { application_id: 1, user_id: 1, pet_id: 1 },
    // { application_id: 2, user_id: 2, pet_id: 2 },
    // { application_id: 3, user_id: 3, pet_id: 3 },
  ]);

  const [users, setUsers] = useState([
    // { user_id: 1, username: 'Lakshanya' },
    // { user_id: 2, username: 'Karthiga' },
    // { user_id: 3, username: 'Roashini' },
  ]);

  const [pets, setPets] = useState([
    // { pet_id: 1, pet_name: 'Buddy' },
    // { pet_id: 2, pet_name: 'Mittens' },
    // { pet_id: 3, pet_name: 'Rex' },
  ]);

      useEffect(()=>{

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

        axios.get('http://localhost:8080/userDetails/fetchAll')
        .then(response => {
            setUsers(response.data);
        })
        .catch(error => {
            console.error('There was an error fetching the user details!', error);
        });

        axios.get('http://localhost:8080/paymnetDetails/fetchAll')
        .then(response => {
            setPayments(response.data);
        })
        .catch(error => {
            console.error('There was an error fetching the user details!', error);
        });

    },[])


  const [isViewPanelOpen, setIsViewPanelOpen] = useState(false);
  const [currentApplication, setCurrentApplication] = useState(null);

  const totalRevenue = payments.reduce((acc, payment) => payment.status === 'Success' ? acc + payment.amount : acc, 0);

  const openViewPanel = (application_id) => {
    const application = applications.find(app => app.application_id === application_id);
    setCurrentApplication(application);
    setIsViewPanelOpen(true);
  };

  return (
    <div className={`manage-payment-container ${isViewPanelOpen ? 'dimmed' : ''}`}>
      <div className="sidebar">
      <button onClick={() => window.location.href='/admin-dashboard'}>Dashboard</button>
        <Link to={`/manage-user`}><button>Manage Users</button></Link>
        <Link to={`/manage-pet`}><button>Manage Pets</button></Link>
        <Link to={`/manage-adoption-application`}><button>Manage Adoption Applications</button></Link>
        <Link to={`/manage-petpickup`}><button>Manage Pet Pickup Requests</button></Link>
        <Link to={`/manage-payment`}><button className="current-page">Manage Payments</button></Link>
      </div>
      <div className="manage-payment-content">
        <div className="payment-cards">
          <div className="payment-card">
            <h3>Total Revenue</h3>
            <p>₹ {totalRevenue}</p>
          </div>
          {/* <div className="payment-card">
            <h3>Pending Payments</h3>
            <p>{payments.filter(payment => payment.status === 'Pending').length}</p>
          </div>
          <div className="payment-card">
            <h3>Failed Payments</h3>
            <p>{payments.filter(payment => payment.status === 'Failed').length}</p>
          </div> */}
        </div>
        <div className="payment-table">
          <table>
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Application ID</th>
                <th>Amount</th>
                <th>Payment Date</th>
                {/* <th>Status</th> */}
                <th>Transaction ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(payment => (
                <tr key={payment.payment_id}>
                  <td>{payment.payment_id}</td>
                  <td>{payment.adoptionApplication.application_id}</td>
                  <td>₹ {payment.amount}</td>
                  <td>{payment.payment_date}</td>
                  {/* <td>{payment.status}</td> */}
                  <td>{payment.transaction_id}</td>
                  <td>
                    <button onClick={() => openViewPanel(payment.adoptionApplication.application_id)}>View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isViewPanelOpen && currentApplication && (
        <div className="floating-panel">
          <h2>View Application Details</h2>
          <p>Application ID: {currentApplication.application_id}</p>
          <p>User ID: {currentApplication.user.user_id}</p>
          <p>User Name: {currentApplication.user.username}</p>
          <p>Pet ID: {currentApplication.pet_id}</p>
          <p>Pet Name: {pets.find(pet => pet.pet_id === currentApplication.pet_id).pet_name}</p>
          <button className="close-button" onClick={() => setIsViewPanelOpen(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default ManagePayment;
