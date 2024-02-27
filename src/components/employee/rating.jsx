import React, { useState } from 'react';

const Rating = ({ maxRating, initialRating, onChange }) => {
  const [rating, setRating] = useState(initialRating || 0);
  const [disabled, setDisabled] = useState(false);
  const [message, setMessage] = useState('');

  const handleClick = (value) => {
    if (!disabled) {
      setRating(value);
      setDisabled(true);
      if (onChange) {
        onChange(value);
      }
      setMessage('Thank You for Rating.');
    }
  };

  const stars = [];
  for (let i = 1; i <= maxRating; i++) {
    stars.push(
      <span
        key={i}
        onClick={() => handleClick(i)}
        style={{ cursor: disabled ? 'default' : 'pointer', color: i <= rating ? 'gold' : 'gray' }}
      >
        ★
      </span>
    );
  }

  return (
    <div>
      {stars}
      <p style={{color:"FAEF9B"}}>{message || 'Please rate:'}</p>
    </div>
  );
};

const App = () => {
  const [selectedRating, setSelectedRating] = useState(0);

  const handleRatingChange = (value) => {
    setSelectedRating(value);
    // You can do additional actions here when the rating changes
  };

  return (
    <div>
      <h1 style={{color:"#FFDD95"}}>Give Your Rating </h1>
      <Rating maxRating={5} initialRating={selectedRating} onChange={handleRatingChange} />
    </div>
  );
};

export default App;
