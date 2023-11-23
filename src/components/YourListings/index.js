import React, { useState, useEffect } from 'react';
import { database } from '../../firebaseConfig';
import Layout from '../Layout';
import './styles.css';

const YourListings = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      const petsRef = database.collection('pets');
      const snapshot = await petsRef.where('seller_id', '==', 'user1').get(); // Replace 'user1' with the current user's ID

      setListings(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    fetchListings();
  }, []);

  return (
    <Layout>
      
      <div className="app">
      <div className="yourpets">
      <h2>Your Pets</h2>
      </div>
      
        <div className="your-listings-container">
          
          <div className="listings">
            {listings.map((listing) => (
              <div key={listing.id} className="listing">
                <img src={listing.image_url} alt={listing.name} />
                <div className="listing-info">
                  <h3>{listing.name}</h3>
                  <p>Breed: {listing.breed}</p>
                  <p>Age: {listing.age}</p>
                  <p>Health Condition: {listing.health_condition}</p>
                  <p>Price: ${listing.price}</p>
                  <p>Type: {listing.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default YourListings;