import React, { useState, useEffect } from "react";
import { database } from "../../firebaseConfig";
import Card from "../Card";
import "./styles.css";
import Layout from "../Layout";
import FilterButton from "../FilterButton";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from '../images/double_icon.png'

const Home = () => {
  const [pets, setPets] = useState([]);
  const [likedPets, setLikedPets] = useState([]);
  const [dislikedPets, setDislikedPets] = useState([]);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    const PetsRef = database.collection("pets");
    const snapshot = await PetsRef.get();
    setPets(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const handleSwipe = async (id, direction) => {
    if (direction === "left") {
      console.log("Disliked Pets:", id);
      setDislikedPets((prevDislikedPets) => [...prevDislikedPets, id]);
    } else {
      console.log("Liked Pets:", id);
      setLikedPets((prevLikedPets) => [...prevLikedPets, id]);
      const userRef = database.collection("users").doc("user1");
      const pet = pets.find((pet) => pet.id === id);

      const likedPetsDoc = await userRef.get();
      const likedPets = likedPetsDoc.data().liked_pets || {};
      const newLikedPet = {
        pet_id: id,
        name: pet.name,
        breed: pet.breed,
        age: pet.age,
        health_condition: pet.health_condition,
        price: pet.price,
        image_url: pet.image_url,
        seller_id: pet.seller_id,
      };

      await userRef.update({
        liked_pets: {
          ...likedPets,
          [id]: newLikedPet,
        },
      });
    }
    setPets((prevPets) => prevPets.filter((pet) => pet.id !== id));
  };

  return (
    <Layout>
      <div className='logocontainer'>
         <img src={logo} alt='Logo' className='logo' />
        </div>
      <div className="app">
        <FilterButton />
        <div className="card-container">
          {pets.length > 0 ? (
            <div className="card-content">
              <Card
                key={pets[0].id}
                id={pets[0].id}
                name={pets[0].name}
                breed={pets[0].breed}
                age={pets[0].age}
                healthCondition={pets[0].health_condition}
                price={pets[0].price}
                imageUrl={pets[0].image_url}
                onSwipe={handleSwipe}
              />
              <div className="buttons-container">
                <button
                  className="dislike-button"
                  onClick={() => handleSwipe(pets[0].id, "left")}
                >
                  X
                </button>
                <button
                  className="like-button"
                  onClick={() => handleSwipe(pets[0].id, "right")}
                >
                  <FontAwesomeIcon icon={faHeart} />
                </button>
              </div>
            </div>
          ) : (
            <p>No more pets to show.</p>
          )}
        </div>
      </div>

    </Layout>
  );
};

export default Home;