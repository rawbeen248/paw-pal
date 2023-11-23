import React, { useState, useEffect } from "react";
import { database } from "../../firebaseConfig";
import BottomNavigation from '../BottomNavigation';
import "./styles.css";
import Layout from '../Layout'

const Liked = () => {
  const [likedPets, setLikedPets] = useState([]);

  useEffect(() => {
    fetchLikedPets();
  }, []);

  const fetchLikedPets = async () => {
    const userRef = database.collection("users").doc("user1"); // Needs to be changed
    const snapshot = await userRef.get();
    const likedPets = Object.values(snapshot.data().liked_pets);
    setLikedPets(likedPets);
  };

  return (
    <Layout>
      <div className="app">
        <div className="app-container">
        <div className="heart-icon"></div>
          <div className="pet-list">
            {likedPets.length > 0 ? (
              likedPets.map((pet) => (
                <div className="pet-item" key={pet.pet_id}>
                  <img src={pet.image_url} alt={pet.name} />
                  <div className="pet-info">
                    <h2>{pet.name}</h2>
                    <h4>{pet.breed}</h4>
                    <p>Age: {pet.age}</p>
                    <p>Health Condition: {pet.health_condition}</p>
                    <p>Price: ${pet.price}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>You have not liked any pets yet.</p>
            )}
          </div>
        </div>
        <BottomNavigation />
    </div>
    </Layout>
  );
};

export default Liked;