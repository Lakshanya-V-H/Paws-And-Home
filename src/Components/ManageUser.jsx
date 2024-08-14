import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ManageUser.css';
import axios from 'axios';

const ManageUser = () => {
  // const [users, setUsers] = useState([
  //   { user_id: 1, username: 'Lakshanya', email: 'lakshanya@gmail.com', phone: '123-456-7890' },
  //   { user_id: 2, username: 'Karthiga', email: 'karthiga@gmail.com', phone: '987-654-3210' },
  //   { user_id: 3, username: 'Roashini', email: 'roashini@gmail.com', phone: '987-654-7241' },
  //   // Add more sample data as needed
  // ]);

  const [users,setUsers] = useState([]);
  useEffect(() => {
    // Fetch users from the Spring Boot backend
    axios.get('http://localhost:8080/userDetails/fetchAll')
        .then(response => {
            setUsers(response.data);
        })
        .catch(error => {
            console.error('There was an error fetching the users!', error);
        });
}, []);

  const [adoptionApplications, setAdoptionApplications] = useState([
    { application_id: 1, user_id: 1, status: 'Accepted' },
    { application_id: 2, user_id: 1, status: 'Pending' },
        // Add more sample data as needed
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [isViewPanelOpen, setIsViewPanelOpen] = useState(false);
  const [isRemovePanelOpen, setIsRemovePanelOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const totalUsers = users.length;
  const usersAppliedForAdoption = new Set(adoptionApplications.map(app => app.user_id)).size;
  const usersWithAcceptedApplications = new Set(adoptionApplications.filter(app => app.status === 'Accepted').map(app => app.user_id)).size;

  const openViewPanel = (user) => {
    setCurrentUser(user);
    setIsViewPanelOpen(true);
  };

  const openRemovePanel = (user) => {
    setCurrentUser(user);
    setIsRemovePanelOpen(true);
  };

  const deleteUser = (user_id) => {
    setUsers(users.filter(user => user.user_id !== user_id));
    setIsRemovePanelOpen(false);
  };

  const appliedUserIds = new Set(adoptionApplications.map(app => app.user_id));

  const filteredUsers = users.filter(user => {
    if (searchTerm && !user.username.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    if (filter === 'applied' && !appliedUserIds.has(user.user_id)) {
      return false;
    }
    if (filter === 'not-applied' && appliedUserIds.has(user.user_id)) {
      return false;
    }
    return true;
  });

  return (
    <div className="manage-user-container">
      <div className="sidebar">
      <button onClick={() => window.location.href='/admin-dashboard'}>Dashboard</button>
        <Link to={`/manage-user`}><button className="current-page">Manage Users</button></Link>
        <Link to={`/manage-pet`}><button>Manage Pets</button></Link>
        <Link to={`/manage-adoption-application`}><button>Manage Adoption Applications</button></Link>
        <Link to={`/manage-petpickup`}><button>Manage Pet Pickup Requests</button></Link>
        <Link to={`/manage-payment`}><button>Manage Payments</button></Link>
      </div>
      <div className="manage-user-content">
        <div className="user-cards">
          <div className="user-card">
            <h3>Total Users</h3>
            <p>{totalUsers}</p>
          </div>
          <div className="user-card">
            <h3>Users Applied for Adoption</h3>
            <p>{usersAppliedForAdoption}</p>
          </div>
          <div className="user-card">
            <h3>Accepted Applications</h3>
            <p>{usersWithAcceptedApplications}</p>
          </div>
        </div>
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Users</option>
            <option value="applied">Applied for Adoption</option>
            <option value="not-applied">Not Applied for Adoption</option>
          </select>
        </div>
        <div className="user-table">
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.user_id}>
                  <td>{user.user_id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <button onClick={() => openViewPanel(user)}>View Details</button>
                    <button onClick={() => openRemovePanel(user)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isViewPanelOpen && currentUser && (
        <div className="floating-panel">
          <h2>View User Details</h2>
          <p>User ID: {currentUser.user_id}</p>
          <p>Username: {currentUser.username}</p>
          <p>Email: {currentUser.email}</p>
          <p>Phone: {currentUser.phone}</p>
          <p>Address: {currentUser.address}</p>
          <p>Date of Registration: {currentUser.date_of_creation}</p>
          <button onClick={() => setIsViewPanelOpen(false)}>Close</button>
        </div>
      )}

      {isRemovePanelOpen && currentUser && (
        <div className="floating-panel">
          <h2>Confirm Remove</h2>
          <p>Are you sure you want to remove {currentUser.username}?</p>
          <button onClick={() => deleteUser(currentUser.user_id)}>Confirm</button>
          <button onClick={() => setIsRemovePanelOpen(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default ManageUser;