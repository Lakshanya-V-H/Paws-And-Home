import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './Navbar2.css'; // Import your CSS file
import { Link } from 'react-router-dom';

const DropdownMenu = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="navbar2">
      <div className="nav2-item" onClick={handleToggleDropdown}>
        <FontAwesomeIcon icon={faBars} className='bar-icon'/>
        Find by Species
      </div>
      {isDropdownOpen && (
        <div className="dropdown-content">
          <Link to={`/Dog`} className='a' onClick={handleToggleDropdown}>Dogs</Link>
          <Link to={`/Cat`} className='a' onClick={handleToggleDropdown}>Cats</Link>
          <Link to={`/Rabbit`} className='a' onClick={handleToggleDropdown}>Rabbits</Link>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
