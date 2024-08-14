import React, { useState } from 'react';
import './ManagePetPickup.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

const ManagePetPickupRequests = () => {
  // const [requests, setRequests] = useState([
  //   { request_id: 1, user_id: 101, pet_type: 'Dog', pet_condition: 'Abandoned', location: 'New York', status: 'Pending', description: 'Found near park' },
  //   { request_id: 2, user_id: 102, pet_type: 'Cat', pet_condition: 'Injured', location: 'Los Angeles', status: 'Accepted', description: 'Injured leg' },
  //   // Add more sample data as needed
  // ]);

  const [requests,setRequests] = useState([]);
  useEffect(() => {
    // Fetch users from the Spring Boot backend
    axios.get('http://localhost:8080/requestDetails/fetchAll')
        .then(response => {
            setRequests(response.data);
            console.log(response.data);
        })
        .catch(error => {
            console.error('There was an error fetching the request details!', error);
        });
}, []);

  const [currentRequest, setCurrentRequest] = useState(null);
  const [currentPanel, setCurrentPanel] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [petDetails, setPetDetails] = useState(null);

  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const fetchUserDetails = (user) => {
    // Mock user data, need to replace with actual API call
    // const userData = { user_id : 1 , user_name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' };
    setUserDetails(user);

  //   const user_id = user.user_id; // To pick the user id from the user

  //    axios.get(`http://localhost:8080/userDetails/fetchById/${user_id}`)
  //   .then(response => {
  //     setUserDetails(response.data);
  // })
  // .catch(error => {
  //     console.error('There was an error fetching the request details!', error);
  // });
    
  };

  const handleViewUserDetails = (request) => {
    fetchUserDetails(request.user);
    setCurrentPanel('user');
    setCurrentRequest(request);
    setIsPanelOpen(true);
  };

  const handleViewPetDetails = (request) => {
    setPetDetails({ pet_type: request.pet_type, pet_condition: request.pet_condition, description: request.description });
    setCurrentPanel('pet');
    setCurrentRequest(request);
    setIsPanelOpen(true);
  };

  const closePanel = () => {
    setIsPanelOpen(false);
    setCurrentPanel(null);
  };

  const acceptRequest = async (id) => {
  //   setRequests(requests.map(request => (request.request_id === id ? { ...request, status: 'Accepted' } : request)));
  //   try{
  //   // Make a PUT request to update the status on the backend
  //   // It failed because the function which I created in springboot accepted the requests only in the as form-data and not as raw.
  //   await axios.put(`http://localhost:8080/requestDetails/updateStatus/${id}`, {
  //     status: 'Accepted'
  //   });

  //   console.log('Request status updated successfully.');
  // } catch (error) {
  //   console.error('Error updating request status:', error);
  //   // Handle error accordingly
  // }

  const formData = new FormData();
  formData.append('status', 'Accepted');

  try {
      const response = await axios.put(`http://localhost:8080/requestDetails/updateStatus/${id}`, formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      });
      // to change the status immediately in UI . If we skipped this we have to refresh the page to view the updated status
      setRequests(requests.map(request => (request.request_id === id ? { ...request, status: 'Accepted' } : request)));
  } catch (error) {
      console.error("Error updating request status:", error);
  }

  };

  const declineRequest =  async(id) => 
  {
    // setRequests(requests.map(request => (request.request_id === id ? { ...request, status: 'Declined' } : request)));
    
    const formData = new FormData();
    formData.append('status', 'Declined');

    try 
    {
      const response = await axios.put(`http://localhost:8080/requestDetails/updateStatus/${id}`, formData, 
        {
          headers: 
          {
              'Content-Type': 'multipart/form-data',
          },
        });
      // to change the status immediately in UI . If we skipped this we have to refresh the page to view the updated status
      setRequests(requests.map(request => (request.request_id === id ? { ...request, status: 'Declined' } : request)));
    } 
    catch (error) 
    {
      console.error("Error updating request status:", error);
    }
  };

  const pendingRequestsCount = requests.filter(request => request.status === 'Pending').length;
  const acceptedRequestsCount = requests.filter(request => request.status === 'Accepted').length;
  const declinedRequestsCount = requests.filter(request => request.status === 'Declined').length;

  return (
    <div className="manage-pet-pickup-container">
      <div className="sidebar">
        <button onClick={() => window.location.href='/admin-dashboard'}>Dashboard</button>
        <Link to={`/manage-user`}><button>Manage Users</button></Link>
        <Link to={`/manage-pet`}><button>Manage Pets</button></Link>
        <Link to={`/manage-adoption-application`}><button className="current-page">Manage Adoption Applications</button></Link>
        <Link to={`/manage-petpickup`}><button>Manage Pet Pickup Requests</button></Link>
        <Link to={`/manage-payment`}><button>Manage Payments</button></Link>
      </div>
      <div className="manage-pet-pickup-content">
        <div className="pickup-stats">
          <div className="pickup-card">
            <h3>Pending Requests</h3> 
            <p>{pendingRequestsCount}</p>
          </div>
          <div className="pickup-card">
            <h3>Accepted Requests</h3> 
            <p>{acceptedRequestsCount}</p>
          </div>
          <div className="pickup-card">
            <h3>Declined Requests</h3>
            <p>{declinedRequestsCount}</p>
          </div>
        </div>
        <div className="request-list">
          <table>
            <thead>
              <tr>
                <th>Request ID</th>
                <th>User</th>
                <th>Pet Detail</th>
                <th>Location</th>
                <th>Status</th>
                <th>Request Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(request => (
                <tr key={request.request_id}>
                  <td>{request.request_id}</td>
                  <td><button onClick={() => handleViewUserDetails(request)}>View User</button></td>
                  <td><button onClick={() => handleViewPetDetails(request)}>View Pet Details</button></td>
                  <td>{request.location}</td>
                  <td>{request.status}</td>
                  <td>{request.request_date}</td>
                  <td>
                    <button onClick={() => acceptRequest(request.request_id)}>Accept</button>
                    <button onClick={() => declineRequest(request.request_id)}>Decline</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isPanelOpen && currentPanel === 'user' && (
        <div className="floating-panel">
          <div className="panel-content">
            <h2>User Details</h2>
            <p>User ID: {userDetails.user_id}</p>
            <p>User Name: {userDetails.username}</p>
            <p>Email: {userDetails.email}</p>
            <p>Phone: {userDetails.phone}</p>
            <p>Address: {userDetails.address}</p>
            <button onClick={closePanel}>Close</button>
          </div>
          {/* <div className="dimmed-background" onClick={closePanel}></div> */}
        </div>
      )}

      {isPanelOpen && currentPanel === 'pet' && (
        <div className="floating-panel">
          <div className="panel-content">
            <h2>Pet Details</h2>
            <p>Pet Type: {petDetails.pet_type}</p>
            <p>Pet Condition: {petDetails.pet_condition}</p>
            <p>Description: {petDetails.description}</p>
            <button onClick={closePanel}>Close</button>
          </div>
          {/* <div className="dimmed-background" onClick={closePanel}></div> */}
        </div>
      )}
    </div>
  );
};

export default ManagePetPickupRequests;
