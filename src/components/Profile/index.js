import React, { useState, useEffect } from 'react';
import { database } from '../../firebaseConfig';
import './styles.css';
import Layout from '../Layout'
import BottomNavigation from '../BottomNavigation';
import { useHistory } from 'react-router-dom';
import logo from '../images/profile_icon.jpeg';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [phone_number, setPhone] = useState('');
  const [date_of_birth, setDate_of_Birth] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const userRef = database.collection('users').doc('user1');
      const doc = await userRef.get();
      if (doc.exists) {
        const userData = doc.data();
        setName(userData.name);
        setEmail(userData.email);
        setGender(userData.gender);
        setPhone(userData.phone_number);
        setDate_of_Birth(userData.date_of_birth);
      }
    };
    fetchData();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const userRef = database.collection('users').doc('user1');
    await userRef.update({
      name,
      email,
      gender,
      phone_number,
      date_of_birth,
    });
    setIsEditing(false);
  };

  const history = useHistory();

  const goToAddPet = () => {
    history.push('/add-pet');
  };

  const goToYourListings = () => {
    history.push('/your-listings');
  };

  return (
    <Layout>
      <div className="logo-container-profile">
        <img src={logo} alt="Logo" className="logo" />
        </div>
    <div className="profile-container">
      <div className="profile-header">
        <img className="profile-picture" src="https://via.placeholder.com/100" alt="Profile" />
        <h2 className="profile-name">{name}</h2>
      </div>
      <div className="profile-info">
        <p className="info-item">Email: {email}</p>
        <p className="info-item">Gender: {gender}</p>
        <p className="info-item">Phone: {phone_number}</p>
        <p className="info-item">Date of Birth: {date_of_birth}</p>
        {isEditing ? (
          <div className="edit-form">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="gender">Gender:</label>
            <input type="gender" id="gender" value={gender} onChange={(e) => setGender(e.target.value)} />
            <label htmlFor="phone_number">Phone:</label>
            <input type="text" id="phone_number" value={phone_number} onChange={(e) => setPhone(e.target.value)} />
            <label htmlFor="date_of_birth">Date of Birth:</label>
            <input type="date" id="date_of_birth" value={date_of_birth} onChange={(e) => setDate_of_Birth(e.target.value)} />
            <button className="save-button" onClick={handleSave}>Save</button>
          </div>
        ) : (
          <button className="edit-button" onClick={handleEdit}>Edit</button>
        )
        
        }
      </div>
      <BottomNavigation />
      <div className="profile-buttons">
        <button onClick={goToAddPet}>Add Pet</button>
        <button onClick={goToYourListings}>Your Pets</button>
      </div>
    </div>
    
    </Layout>
  );
};

export default Profile;