import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ManagePet.css';
import axios from 'axios';
import { useEffect } from 'react';


const ManagePet = () => {
  // const [pets, setPets] = useState([
  //   { pet_id: 1, pet_name: 'Buddy', species: 'Dog', breed: 'Labrador', age: 2, status: 'Available', description: 'Friendly and energetic' },
  //   { pet_id: 2, pet_name: 'Whiskers', species: 'Cat', breed: 'Siamese', age: 3, status: 'Adopted', description: 'Calm and loving' },
  //   // Add more sample data as needed
  // ]);

  const [pets,setPets] = useState([]);
  useEffect(() => {
    // Fetch users from the Spring Boot backend
    axios.get('http://localhost:8080/petDetails/fetchAll')
        .then(response => {
            setPets(response.data);
        })
        .catch(error => {
            console.error('There was an error fetching the pets!', error);
        });
}, []);


  

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [speciesFilter, setSpeciesFilter] = useState('All Species');
  const [breedFilter, setBreedFilter] = useState('All Breed');

  const [newPet, setNewPet] = useState({
    pet_name: '',
    species: '',
    breed: '',
    age: '',
    gender:'',
    image : null,    
    status: 'Available',
    description: '',
    fee:''
    
  });

  const [isAddPanelOpen, setIsAddPanelOpen] = useState(false);
  const [isUpdatePanelOpen, setIsUpdatePanelOpen] = useState(false);
  const [isRemovePanelOpen, setIsRemovePanelOpen] = useState(false);
  const [currentPet, setCurrentPet] = useState(null);

  const handleInputChange = (e) => {
    setNewPet({
      ...newPet,
      [e.target.name]: e.target.value
    });
  };


  const addPet = async () => {
    const { pet_name, species, breed, age, gender, image, fee, status, description } = newPet;
    if (!pet_name || !species || !breed || !age || !gender || !image || !fee || !status || !description) {
      alert("Data is incomplete. Please fill out all required fields.");
      return;
  }
  
  const formData = new FormData();
  formData.append('pet_name', newPet.pet_name);
  formData.append('species', newPet.species);
  formData.append('breed', newPet.breed);
  formData.append('age', newPet.age);
  
  // Convert base64 to Blob and append to formData
  if (newPet.image) {
    const base64Response = await fetch(`data:image/jpeg;base64,${newPet.image}`);
    const blob = await base64Response.blob();
    formData.append('image', blob, 'image.jpg'); // Specify file name and type
  } else {
    console.error('Image is not available or invalid base64 string:', newPet.image);
    return;
  }  
  formData.append('gender', newPet.gender);
  formData.append('description', newPet.description);
  formData.append('status', newPet.status);
  formData.append('fee', newPet.fee);
  
  try {
    const response = await axios.post(`http://localhost:8080/petDetails/insertPet`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    // Handle success (e.g., show a message or update UI)
    setPets([...pets, { ...newPet, pet_id: pets.length + 1 }]);
    } catch (error) {
      console.error("Error adding a new pet:", error);
    }
    // Reset form and close panel
    setNewPet({ pet_name: '', species: '', breed: '', age: '', gender: '', image: null, fee: '', status: 'Available', description: '' });
    setIsAddPanelOpen(false);
  };
  

  const deletePet = (id) => {
    setPets(pets.filter(pet => pet.pet_id !== id));
    setIsRemovePanelOpen(false);
  };

  const openUpdatePanel = (pet) => {
    setCurrentPet(pet);
    setIsUpdatePanelOpen(true);
  };

  const updatePet = async () => {
    setPets(pets.map(pet => (pet.pet_id === currentPet.pet_id ? currentPet : pet)));

    const formData = new FormData();
    formData.append('pet_name', currentPet.pet_name);
    formData.append('species', currentPet.species);
    formData.append('breed', currentPet.breed);
    formData.append('age', currentPet.age);
    
    // Convert base64 to Blob and append to formData
    if (currentPet.image) {
      const base64Response = await fetch(`data:image/jpeg;base64,${currentPet.image}`);
      const blob = await base64Response.blob();
      formData.append('image', blob, 'image.jpg'); // Specify file name and type
    } else {
      console.error('Image is not available or invalid base64 string:', currentPet.image);
      return;
    }  
    formData.append('gender', currentPet.gender);
    formData.append('description', currentPet.description);
    formData.append('status', currentPet.status);
    formData.append('fee', currentPet.fee);
  
    try {
      const response = await axios.put(`http://localhost:8080/petDetails/updatePet/${currentPet.pet_id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Handle success (e.g., show a message or update UI)
    } catch (error) {
      console.error("Error updating the pet details:", error);
    }
    setIsUpdatePanelOpen(false);
  };

  const openRemovePanel = (pet) => {
    setCurrentPet(pet);
    setIsRemovePanelOpen(true);
  };

  const handleUpdateInputChange = (e) => {
    setCurrentPet({
      ...currentPet,
      [e.target.name]: e.target.value
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onloadend = () => {
      setNewPet({
        ...newPet,
        image: reader.result.split(',')[1], // Extract base64 string after the comma
      });
    };
  
    if (file) {
      reader.readAsDataURL(file); // Read file as data URL (base64)
    }
  };
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onloadend = () => {
      setCurrentPet({
        ...currentPet,
        image: reader.result.split(',')[1], // Extract base64 string after the comma
      });
    };
  
    if (file) {
      reader.readAsDataURL(file); // Read file as data URL (base64)
    }
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   setCurrentPet({
  //     ...currentPet,
  //     image: file
  //   });
  // };
  

  const availablePetsCount = pets.filter(pet => pet.status === 'Available').length;
  const adoptedPetsCount = pets.filter(pet => pet.status === 'Adopted').length;

  const filteredPets = pets.filter(pet => {
    return (
      (statusFilter === 'All Status' || pet.status === statusFilter) &&
      (speciesFilter === 'All Species' || pet.species === speciesFilter) &&
      (breedFilter === 'All Breed' || pet.breed === breedFilter) &&
      (searchTerm === '' || pet.pet_name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div className="manage-pet-container">
      <div className="sidebar">
      <button onClick={() => window.location.href='/admin-dashboard'}>Dashboard</button>
        <Link to={`/manage-user`}><button>Manage Users</button></Link>
        <Link to={`/manage-pet`}><button className="current-page">Manage Pets</button></Link>
        <Link to={`/manage-adoption-application`}><button>Manage Adoption Applications</button></Link>
        <Link to={`/manage-petpickup`}><button>Manage Pet Pickup Requests</button></Link>
        <Link to={`/manage-payment`}><button>Manage Payments</button></Link>
      </div>
      <div className="manage-pet-content">
        <div className="pet-stats">
          <div className="pet-card">
            <h3>Pets Available</h3> 
            <p>{availablePetsCount}</p>
          </div>
          <div className="pet-card">
            <h3>Pets Adopted</h3> 
            <p>{adoptedPetsCount}</p>
          </div>
        </div>
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search pets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All Status">Pet Status</option>
            <option value="Available">Available</option>
            <option value="Adopted">Adopted</option>
          </select>
          <select value={speciesFilter} onChange={(e) => setSpeciesFilter(e.target.value)}>
            <option value="All Species">Pet Species</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            {/* Add more species as needed */}
          </select>
          <select value={breedFilter} onChange={(e) => setBreedFilter(e.target.value)}>
            <option value="All Breed">Pet Breed</option>
            <option value="American Whitehair">American Whitehair</option>
            <option value="Mini Lop">Mini Lop</option>
            {/* Add more breeds as needed */}
          </select>
          <button onClick={() => setIsAddPanelOpen(true)} className='add-pet-btn'>Add Pet</button>
        </div>
        <table className="pet-table">
          <thead>
            <tr>
              <th>Pet Id</th>
              <th>Name</th>
              <th>Species</th>
              <th>Breed</th>
              <th>Age</th>
              <th>Image</th>
              <th>Adoption Fee</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPets.map(pet => (
              <tr key={pet.pet_id}>
                <td>{pet.pet_id}</td>
                <td>{pet.pet_name}</td>
                <td>{pet.species}</td>
                <td>{pet.breed}</td>
                <td>{pet.age}</td>
                <td><center>{pet.image && (
                  <img src={`data:image/jpeg;base64,${pet.image}`} alt={pet.name} style={{maxWidth:'100px',height:'70px'}}/>
                )}</center></td>
                <td>₹ {pet.fee}</td>
                <td>
                  <button onClick={() => openUpdatePanel(pet)}>Update</button>
                  <button onClick={() => openRemovePanel(pet)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAddPanelOpen && (
        <div className="floating-panel">
          <h2>Add Pet</h2>
          <input type="text" name="pet_name" placeholder="Pet Name" value={newPet.pet_name} onChange={handleInputChange} />
          <input type="text" name="species" placeholder="Species" value={newPet.species} onChange={handleInputChange} />
          <input type="text" name="breed" placeholder="Breed" value={newPet.breed} onChange={handleInputChange} />
          <input type="number" name="age" placeholder="Age" value={newPet.age} onChange={handleInputChange} />
          <input type="text" name="gender" placeholder="Gender" value={newPet.gender} onChange={handleInputChange} />
          <input type="number" name="fee" placeholder="Adoption Fee" value={newPet.fee} onChange={handleInputChange} />
          <select name="status" value={newPet.status} onChange={handleInputChange}>
            <option value="Available">Available</option>
            <option value="Adopted">Adopted</option>
          </select>
          <textarea name="description" placeholder="Description" value={newPet.description} onChange={handleInputChange}></textarea>
          <input type="file" name="image" placeholder="Image"  onChange={handleFileUpload}/>
          <button onClick={addPet}>Submit</button>
          <button onClick={() => setIsAddPanelOpen(false)}>Cancel</button>
        </div>
      )}

      {isUpdatePanelOpen && (
        <div className="floating-panel">
          <h2>Update Pet</h2>
          <input type="text" name="pet_name" placeholder="Pet Name" value={currentPet.pet_name} onChange={handleUpdateInputChange} />
          <input type="text" name="species" placeholder="Species" value={currentPet.species} onChange={handleUpdateInputChange} />
          <input type="text" name="breed" placeholder="Breed" value={currentPet.breed} onChange={handleUpdateInputChange} />
          <input type="number" name="age" placeholder="Age" value={currentPet.age} onChange={handleUpdateInputChange} />
          <input type="text" name="gender" placeholder="Gender" value={currentPet.gender} onChange={handleUpdateInputChange} />
          <input type="number" name="fee" placeholder="Adoption Fee" value={currentPet.fee} onChange={handleUpdateInputChange} />
          <select name="status" value={currentPet.status} onChange={handleUpdateInputChange}>
            <option value="Available">Available</option>
            <option value="Adopted">Adopted</option>
          </select>
          <textarea name="description" placeholder="Description" value={currentPet.description} onChange={handleUpdateInputChange}></textarea>
          <input type="file" name="image" placeholder={currentPet.name} onChange={handleImageChange}/>
          <button onClick={updatePet}>Submit</button>
          <button onClick={() => setIsUpdatePanelOpen(false)}>Cancel</button>
        </div>
      )}

      {isRemovePanelOpen && (
        <div className="floating-panel">
          <h2>Confirm Remove</h2>
          <p>Are you sure you want to remove {currentPet.pet_name}?</p>
          <button onClick={() => deletePet(currentPet.pet_id)}>Confirm</button>
          <button onClick={() => setIsRemovePanelOpen(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default ManagePet;