import React, { useRef } from "react";
import { useSwipeable } from "react-swipeable";
import "./styles.css";

const Card = ({
  id,
  name,
  breed,
  age,
  healthCondition,
  price,
  imageUrl,
  onSwipe,
}) => {
  const cardRef = useRef();

  const swipeConfig = {
    onSwipedLeft: () => onSwipe(id, "left"),
    onSwipedRight: () => onSwipe(id, "right"),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  };
  const handlers = useSwipeable(swipeConfig);

  const handleButtonClick = (direction) => {
    const cardElement = cardRef.current;
    if (direction === "left") {
      cardElement.classList.add("swipe-left");
    } else if (direction === "right") {
      cardElement.classList.add("swipe-right");
    }
    onSwipe(id, direction);
  };

  return (
    <div ref={cardRef} className="card" {...handlers}>
      <img src={imageUrl} alt={name} />
      <div className="card-info">
        <h2>{name}</h2>
        <h4>{breed}</h4>
        <p>Age: {age}</p>
        <p>Health Condition: {healthCondition}</p>
        <p>Price: ${price}</p>
      </div>
      <div className="card-buttons">
        <button className="dislike-button" onClick={() => handleButtonClick("left")}>
          <i className="fas fa-times"></i>
        </button>
        <button className="like-button" onClick={() => handleButtonClick("right")}>
          <i className="fas fa-heart"></i>
        </button>
      </div>
    </div>
  );
};

export default Card;
