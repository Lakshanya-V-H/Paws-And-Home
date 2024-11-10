// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
// import { faUser } from '@fortawesome/free-regular-svg-icons';
// import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
// import { faColumns } from '@fortawesome/free-solid-svg-icons';
// import { faPaw } from '@fortawesome/free-solid-svg-icons';
// import { useNavigate } from 'react-router-dom';
// import { useState , useEffect } from 'react';
// import './Style.css';

// function Navigation(){
//        const [isLoggedIn, setIsLoggedIn] = useState(false);
//        const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//        const navigate = useNavigate();

//        useEffect(() => {
//         const user = JSON.parse(localStorage.getItem('user'));
//         if (user) {
//             setIsLoggedIn(true);
//         }

//         const handleStorageChange = () => {
//             const user = JSON.parse(localStorage.getItem('user'));
//             if (user) {
//                 setIsLoggedIn(true);
//             } else {
//                 setIsLoggedIn(false);
//             }
//         };

//         window.addEventListener('storage', handleStorageChange);

//         return () => {
//             window.removeEventListener('storage', handleStorageChange);
//         };
//     }, []);
//         const handleLogout = () => {
//             localStorage.removeItem('user');
//             setIsLoggedIn(false);
//             setIsDropdownOpen(false);
//             navigate('/Home');
//         };
    
//         const handleToggleDropdown = () => {
//             setIsDropdownOpen(!isDropdownOpen);
//         };

//         return(
//             <div className='header'>
//                 <div className='navbar'>
//                 {/*<li>LV</li>*/}
//                 <li id='logo'><i class="fas fa-shopping-basket"><FontAwesomeIcon icon={faPaw} /></i> PawsAndHome</li>
//                     <li><Link to={`/Home`} style={{color:'#666'}}>Home</Link></li>
//                     <li><Link to={`/Pets`} style={{color:'#666'}}>Pets</Link></li>
//                     <li><Link to={`/About`} style={{color:'#666'}}>About</Link></li>
//                     {/* <li><Link to={`/Blog`} style={{color:'#666'}}>Blog</Link></li> */}
//                     <li><Link to={`/PetPickup`} style={{color:'#666'}}>Pet Pickup</Link></li>
//                 </div>
//                 <form action="" className="search-form">
//                     <input type="search" placeholder="Search here..." id="search-box" />
//                 </form>
//                 <div class="icons">
//                     <div id="search-btn" className="fas fa-search"></div>
//                     <div id="user-dropdown" class="fas fa-user" onClick={handleToggleDropdown}>
//                         <FontAwesomeIcon icon={faUser} />
//                         <div className={`dropdown-content ${isDropdownOpen ? 'show' : ''}`}>
//                             {!isLoggedIn ? (
//                             <Link to={`/LoginE`}>Login / Sign up</Link>
//                         ) : (
//                             <>
//                                 <Link to={`/ManageProfile`}>Manage Profile</Link>
//                                 <a href="#!" onClick={handleLogout}>Logout</a>
//                             </>
//                         )}
//                     </div>
//                     </div>
//                     {/*<div id="login-btn" class="fas fa-user"><Link href="/Sign"><FontAwesomeIcon icon={faColumns} /></Link></div>*/}
//                 </div>
//             </div>
//         )
//     }

// export default Navigation;

import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPaw } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Style.css';

function Navigation({onSearch}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false); // New state to track admin status
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setIsLoggedIn(true);
            setIsAdmin(user.username === 'Admin'); // Check if the user is an admin
        }

        const handleStorageChange = () => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                setIsLoggedIn(true);
                setIsAdmin(user.username === 'Admin'); // Check if the user is an admin
            } else {
                setIsLoggedIn(false);
                setIsAdmin(false);
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setIsAdmin(false);
        setIsDropdownOpen(false);
        navigate('/Home');
    };

    const handleToggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const[searchTerm , setSearchTerm] = useState('');
    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        // Pass the search term to the parent component
        // onSearch(searchTerm); // searches as you type -- very important
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(searchTerm);
        onSearch(searchTerm); // searches after you press enter


    }


    return (
        <div className='header'>
            <div className='navbar'>
                <li id='logo'>
                    <i className="fas fa-shopping-basket"><FontAwesomeIcon icon={faPaw} /></i> PawsAndHome
                </li>
                <li><Link to={`/Home`} style={{ color: '#666' }}>Home</Link></li>
                <li><Link to={`/Pets`} style={{ color: '#666' }}>Pets</Link></li>
                <li><Link to={`/About`} style={{ color: '#666' }}>About</Link></li>
                <li><Link to={`/PetPickup`} style={{ color: '#666' }}>Pet Pickup</Link></li> 
            </div>
            <form onSubmit={handleSubmit} className="search-form">
                <input type="search" placeholder="Search breed..." id="search-box" 
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </form>
            <div className="icons">
                <div id="search-btn" className="fas fa-search"></div>
                <div id="user-dropdown" className="fas fa-user" onClick={handleToggleDropdown}>
                    <FontAwesomeIcon icon={faUser} />
                    <div className={`dropdown-content ${isDropdownOpen ? 'show' : ''}`}>
                        {!isLoggedIn ? (
                            <Link to={`/LoginE`}>Login / Sign up</Link>
                        ) : (
                            <>
                                <Link to={`/ManageProfile`}>Manage Profile</Link>
                                {isAdmin && <Link to={`/admin-dashboard`}>View Dashboard</Link>} {/* Conditional rendering for admin */}
                                <a href="#!" onClick={handleLogout}>Logout</a>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navigation;
