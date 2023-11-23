import React, { useState } from 'react';
import { database } from '../../firebaseConfig';
import Layout from '../Layout'
import BottomNavigation from '../BottomNavigation';
import './styles.css';
import { useHistory } from 'react-router-dom';

const AddPet = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [breed, setBreed] = useState('');
  const [healthCondition, setHealthCondition] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [type, setType] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const petData = {
      name,
      age,
      breed,
      health_condition: healthCondition,
      price,
      image_url: imageUrl,
      type,
      seller_id: 'user1', // Replace with the current user's ID
    };

    await database.collection('pets').add(petData);

    alert('Pet added successfully!');
    history.push('/profile');
  };

  return (
    <Layout>
      <div className="app">
      <div className="add-pet-container">
        <h2>Add Pet</h2>
        <form className="add-pet-form" onSubmit={handleSubmit}>
          {/* Other form inputs */}
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Health Condition"
            value={healthCondition}
            onChange={(e) => setHealthCondition(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Type (e.g. Dog, Cat)"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
          <button type="submit">Add Pet</button>
        </form>
      </div>
      </div>
    </Layout>
  );
};

export default AddPet;