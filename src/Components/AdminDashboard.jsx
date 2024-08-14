import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const AdminDashboard = () => {
    const [petsData, setPetsData] = useState([]);
    const [speciesData, setSpeciesData] = useState([]);

    const [users,setUsers] = useState([]);
    const [adoptionApplications , setAdoptionApplications] = useState([]);
    const [requests, setRequests] = useState([]);
    useEffect(() => {
        // Fetch pets data from your backend or database
        const fetchPetsData = async () => {
            // actual data fetching logic
            const response = await fetch('http://localhost:8080/petDetails/fetchAll');
            const data = await response.json();
            setPetsData(data);
        };

        const fetchUsersData = async () => {
            // actual data fetching logic
            const response = await fetch('http://localhost:8080/userDetails/fetchAll');
            const data = await response.json();
            setUsers(data);
        };

        const fetchAdoptionData = async () => {
            // actual data fetching logic
            const response = await fetch('http://localhost:8080/adoptionDetails/fetchAll');
            const data = await response.json();
            setAdoptionApplications(data);
        };

        const fetchRequestsData = async () => {
            // actual data fetching logic
            const response = await fetch('http://localhost:8080/requestDetails/fetchAll');
            const data = await response.json();
            setRequests(data);
        };

        fetchPetsData();
        fetchUsersData();
        fetchAdoptionData();
        fetchRequestsData();
    }, []);

    useEffect(() => {
        // Process pets data to get species counts
        const speciesCount = petsData.reduce((acc, pet) => {
            acc[pet.species] = (acc[pet.species] || 0) + 1;
            return acc;
        }, {});

        // Convert speciesCount object to an array suitable for the pie chart
        const formattedData = Object.entries(speciesCount).map(([name, value]) => ({
            name,
            value,
        }));

        setSpeciesData(formattedData);
    }, [petsData]);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div className="admin-dashboard-container">
            <div className="sidebar">
                <Link to={`/manage-user`}><button className="sidebar-button">Manage Users</button></Link>
                <Link to={`/manage-pet`}><button className="sidebar-button">Manage Pets</button></Link>
                <Link to={`/manage-adoption-application`}><button className="sidebar-button">Manage Adoption Application</button></Link>
                <Link to={`/manage-petpickup`}><button className="sidebar-button">Manage PetPickup Request</button></Link>
                <Link to={`/manage-payment`}><button className="sidebar-button">Manage Payment</button></Link>
            </div>
            <div className="dashboard-content">
                {/* <div className="dashboard-welcome">Welcome Back!!!</div> */}
                <div className="dashboard-cards">
                    <div className="dashboard-card">
                        <h3>Users</h3>
                        <p>{users.length}</p>
                    </div>
                    <div className="dashboard-card">
                        <h3>Pets</h3>
                        <p>{petsData.length}</p>
                    </div>
                    <div className="dashboard-card">
                        <h3>Adoption Applications</h3>
                        <p>{adoptionApplications.length}</p>
                    </div>
                    <div className="dashboard-card">
                        <h3>PetPickup Requests</h3>
                        <p>{requests.length}</p>
                    </div>
                </div>
                <div className="dashboard-chart">
                    <h3>Species Distribution</h3>
                    <PieChart width={400} height={400}>
                        <Pie
                            data={speciesData}
                            cx={200}
                            cy={200}
                            labelLine={false}
                            outerRadius={150}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {speciesData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
