import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ManageAdoption.css';
import axios from 'axios';

const ManageAdoption = () => {
  // const [applications, setApplications] = useState([
  //   { application_id: 1, user_id: 1, pet_id: 1, status: 'Pending', comments: 'Looking forward to adopting.', application_date: '2023-07-24' },
  //   { application_id: 2, user_id: 2, pet_id: 2, status: 'Accepted', comments: 'Great experience.', application_date: '2023-07-25' },
  //   { application_id: 3, user_id: 3, pet_id: 3, status: 'Declined', comments: 'Not ready yet.', application_date: '2023-07-26' },
  //   // Add more sample data as needed
  // ]);

  // const [users, setUsers] = useState([
  //   { user_id: 1, username: 'Lakshanya', email: 'lakshanya@gmail.com', address: '123 Main St', phone: '123-456-7890', date_of_creation: '2023-07-24' },
  //   { user_id: 2, username: 'Karthiga', email: 'karthiga@gmail.com', address: '456 Elm St', phone: '987-654-3210', date_of_creation: '2023-07-25' },
  //   { user_id: 3, username: 'Roashini', email: 'roashini@gmail.com', address: '789 Pine St', phone: '555-123-4567', date_of_creation: '2023-07-26' },
  //   // Add more sample data as needed
  // ]);

  // const [pets, setPets] = useState([
  //   { pet_id: 1, pet_name: 'Buddy', species: 'Dog', breed: 'Labrador', age: 3, photo: 'dog.jpg', gender: 'Male', description: 'Friendly dog', status: 'Available' },
  //   { pet_id: 2, pet_name: 'Mittens', species: 'Cat', breed: 'Siamese', age: 2, photo: 'cat.jpg', gender: 'Female', description: 'Calm and loving', status: 'Adopted' },
  //   { pet_id: 3, pet_name: 'Rex', species: 'Dog', breed: 'German Shepherd', age: 4, photo: 'dog2.jpg', gender: 'Male', description: 'Loyal and protective', status: 'Available' },
  //   // Add more sample data as needed
  // ]);

  const[applications,setApplications] = useState([]);
  const [pets,setPets] = useState([]);
  const [users,setUsers] = useState([]);
    

  useEffect(()=>{
    // Fetch users from the Spring Boot backend
    axios.get('http://localhost:8080/userDetails/fetchAll')
        .then(response => {
            setUsers(response.data);
        })
        .catch(error => {
            console.error('There was an error fetching the users!', error);
        });

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
},[])

  const [isViewUserPanelOpen, setIsViewUserPanelOpen] = useState(false);
  const [isViewPetPanelOpen, setIsViewPetPanelOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPet, setCurrentPet] = useState(null);
  const [filters, setFilters] = useState({ month: '', status: '', species: '' });

  const pendingApplications = applications.filter(app => app.status === 'Pending');
  const acceptedApplications = applications.filter(app => app.status === 'Accepted');
  const declinedApplications = applications.filter(app => app.status === 'Declined');

  const handleAccept = async (application_id) => {

    const formData = new FormData();
    formData.append('status', 'Accepted');
    try 
    {
      const response = await axios.put(`http://localhost:8080/adoptionDetails/updateStatus/${application_id}`, formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      });
      // to change the status immediately in UI . If we skipped this we have to refresh the page to view the updated status
      setApplications(applications.map(app => app.application_id === application_id ? { ...app, status: 'Accepted' } : app));
    } catch (error) {
      console.error("Error adoption request status:", error);
    }
  };

  const handleReject = async (application_id) => {
    // setApplications(applications.map(app => app.application_id === application_id ? { ...app, status: 'Declined' } : app));
    const formData = new FormData();
    formData.append('status', 'Rejected');
    try 
    {
      const response = await axios.put(`http://localhost:8080/adoptionDetails/updateStatus/${application_id}`, formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      });
      // to change the status immediately in UI . If we skipped this we have to refresh the page to view the updated status
      setApplications(applications.map(app => app.application_id === application_id ? { ...app, status: 'Rejected' } : app));
    } catch (error) {
      console.error("Error updating adoption status:", error);
    }
  };

  const openViewUserPanel = (user_id) => {
    const user = users.find(user => user.user_id === user_id);
    setCurrentUser(user);
    setIsViewUserPanelOpen(true);
    setIsViewPetPanelOpen(false);
  };

  const openViewPetPanel = (pet_id) => {
    const pet = pets.find(pet => pet.pet_id === pet_id);
    setCurrentPet(pet);
    setIsViewUserPanelOpen(false);
    setIsViewPetPanelOpen(true);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredApplications = applications.filter(app => {
    const monthMatch = filters.month ? new Date(app.application_date).getMonth() + 1 === parseInt(filters.month) : true;
    const statusMatch = filters.status ? app.status === filters.status : true;
    const speciesMatch = filters.species ? pets.find(pet => pet.pet_id === app.pet_id).species === filters.species : true;
    return monthMatch && statusMatch && speciesMatch;
  });

  return (
    <div className={`manage-adoption-container ${isViewUserPanelOpen || isViewPetPanelOpen ? 'dimmed' : ''}`}>
      <div className="sidebar">
        <button onClick={() => window.location.href='/admin-dashboard'}>Dashboard</button>
        <Link to={`/manage-user`}><button>Manage Users</button></Link>
        <Link to={`/manage-pet`}><button>Manage Pets</button></Link>
        <Link to={`/manage-adoption-application`}><button className="current-page">Manage Adoption Applications</button></Link>
        <Link to={`/manage-petpickup`}><button>Manage Pet Pickup Requests</button></Link>
        <Link to={`/manage-payment`}><button>Manage Payments</button></Link>
      </div>
      <div className="manage-adoption-content">
        <div className="adoption-cards">
          <div className="adoption-card">
            <h3>Pending</h3>
            <p>{pendingApplications.length}</p>
          </div>
          <div className="adoption-card">
            <h3>Accepted</h3>
            <p>{acceptedApplications.length}</p>
          </div>
          <div className="adoption-card">
            <h3>Declined</h3>
            <p>{declinedApplications.length}</p>
          </div>
        </div>
        <div className="filters">
          <select name="month" value={filters.month} onChange={handleFilterChange}>
            <option value="">All Months</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
          <select name="status" value={filters.status} onChange={handleFilterChange}>
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Accepted">Accepted</option>
            <option value="Declined">Declined</option>
          </select>
          <select name="species" value={filters.species} onChange={handleFilterChange}>
            <option value="">All Species</option>
            {Array.from(new Set(pets.map(pet => pet.species))).map(species => (
              <option key={species} value={species}>{species}</option>
            ))}
          </select>
        </div>
        <div className="application-list">
          <table>
            <thead>
              <tr>
                <th>Application ID</th>
                <th>User</th>
                <th>Pet</th>
                <th>Status</th>
                <th>Comments</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map(application => (
                <tr key={application.application_id}>
                  <td>{application.application_id}</td>
                  <td>
                    <button onClick={() => openViewUserPanel(application.user.user_id)} className='view-user-btn'>View User</button>
                  </td>
                  <td>
                    <button onClick={() => openViewPetPanel(application.pet_id)} className='view-pet-btn'>View Pet</button>
                  </td>
                  <td>{application.status}</td>
                  <td>{application.comments}</td>
                  <td>{application.applicationDate}</td>
                  <td>
                    {/* {application.status === 'Pending' && ( */}
                      <>
                        <button onClick={() => handleAccept(application.application_id)} className='accept-btn'>Accept</button>
                        <button onClick={() => handleReject(application.application_id)} className='reject-btn'>Reject</button>
                      </>
                    {/* )} */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isViewUserPanelOpen && (
        <div className="floating-panel">
          <h2>View User Details</h2>
          <p>User ID: {currentUser.user_id}</p>
          <p>Username: {currentUser.username}</p>
          <p>Email: {currentUser.email}</p>
          <p>Address: {currentUser.address}</p>
          <p>Phone: {currentUser.phone}</p>
          <p>Date of Creation: {currentUser.date_of_creation}</p>
          <button onClick={() => setIsViewUserPanelOpen(false)}>Close</button>
        </div>
      )}

      {isViewPetPanelOpen && (
        <div className="floating-panel">
          <h2>View Pet Details</h2>
          <p>Pet ID: {currentPet.pet_id}</p>
          <p>Pet Name: {currentPet.pet_name}</p>
          <p>Species: {currentPet.species}</p>
          <p>Breed: {currentPet.breed}</p>
          <p>Age: {currentPet.age}</p>
          <p>Gender: {currentPet.gender}</p>
          <p>Description: {currentPet.description}</p>
          <p>Status: {currentPet.status}</p>
          <img src={currentPet.photo} alt={currentPet.pet_name} />
          <button onClick={() => setIsViewPetPanelOpen(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default ManageAdoption;
