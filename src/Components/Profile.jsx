import React, { useEffect, useState } from 'react'
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProfilePic from './images/Profile/profile-pic2.png';
import './Profile.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        user_id:'',
        username:'',
        email:'',
        phone:'',
        password:'',
        address:'',

    })

    const [isLoggedIn, setIsLoggedIn] = useState(true); 
    // const navigate = useNavigate();

    useEffect(() =>{
        try{
            const storedUser = localStorage.getItem('user');
            const user = JSON.parse(storedUser);

            if(user)
            {
                setProfileData({
                    user_id : user.user_id,
                    username:user.username,
                    email:user.email,
                    phone:user.phone,
                    password:user.password,
                    address:user.address,

                })
            }
        }
        catch(error){
            console.log("Error fetchning the data from local storage.")
        }
    },[])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prevData => ({ ...prevData, [name]: value }));
      };
    
    const handleEditClick = () => {
    setIsEditing(true);
    };

    const handleSaveClick = async() => {
        setIsEditing(false);
        try {
            console.log('Updating profile data:', profileData); // Log profile data
            const updateResponse = await axios.put(`http://localhost:8080/userDetails/updateUser/${profileData.user_id}`, profileData); // Use backticks here
            console.log('Update response:', updateResponse);

            if (updateResponse) {
            console.log('Profile data saved:', profileData);
            localStorage.setItem('user', JSON.stringify(profileData));
            } else {
            console.error('Error updating profile:', updateResponse.statusText);
            }
        } catch (error) {
            console.error('Error saving profile data:', error);
        }
    }


  return (
    <div  className="profile-container">
        <div className="profile-banner">
            <img src={ProfilePic} alt="Profile" />
        </div>
        <div className="profile-background">
            <div className="profile-content">
                <div className="profile-details">
                    <>
                    <div className="profile-header">
                        <FontAwesomeIcon icon={faUser} />
                        {/* <button  > */}
                        <FontAwesomeIcon icon={faPen} onClick={handleEditClick}/>
                        {/* </button> */}
                        <div className='profile-header-text'>
                            <h4> Hello {profileData.username} !!</h4>
                        </div>
                    </div>
                    <div className="profile-info">
                        <input
                            placeholder="User Name"
                            name="username"
                            value={profileData.username}
                            onChange={handleChange}
                            disabled={!isEditing}
                            />
                            <br></br>
                        <input
                            placeholder="Email"
                            name="email"
                            value={profileData.email}
                            onChange={handleChange}
                            disabled={!isEditing}
                            />
                            <br></br>

                        <input
                            placeholder="Phone"
                            name="phone"
                            value={profileData.phone}
                            onChange={handleChange}
                            disabled={!isEditing}
                             />
                            <br></br>

                        <input
                            placeholder="Password"
                            name="password"
                            type="password"
                            value={profileData.password}
                            onChange={handleChange}
                            disabled={!isEditing}
                            />
                            <br></br>

                        <input
                            placeholder="Address"
                            name="address"
                            value={profileData.address}
                            onChange={handleChange}
                            disabled={!isEditing}
                             />
                        <br />
                        <div className="profile-actions">
                            {isEditing && (
                                <button onClick={handleSaveClick}  className="action-button">
                                    Save
                                </button>
                            )}
                            <Link to={`/UserApplications`} >
                            <button className="action-button" id="view-applications">
                                View Application Status
                            </button>
                            </Link>
                        </div>
                    </div>
                    </>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Profile