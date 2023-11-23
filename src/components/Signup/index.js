import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { database } from '../../firebaseConfig.js';
import './styles.css';
import logo from '../../components/images/pawpal_logo.jpeg'; 

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const userRef = database.collection('users').doc();
      await userRef.set({
        name,
        email,
        password,
        gender,
        phone_number: phoneNumber,
        date_of_birth: dateOfBirth,
        liked_pets: {}
      });

      setErrorMessage('');
      history.push('/home');
    } catch (error) {
      console.error('Error creating user: ', error);
      setErrorMessage('Error signing up. Please try again later.');
    }
  };

  return (

    <div className="signupp">
          
      <div className="signupp-container">
      <div className="paw-logo-container">
        <img src={logo} alt="Logo" className="paw-logo" />
        </div>
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Date of Birth"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          required
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Sign Up</button>
        <button type="button" onClick={() => history.push('/login')}>
          Login
        </button>
  </form>
</div>
</div>
</div>
);
};

export default Signup;