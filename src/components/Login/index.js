import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { database } from '../../firebaseConfig.js';
import './styles.css';
import logo from '../../components/images/pawpal_logo.jpeg'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const usersRef = database.collection('users');
      const snapshot = await usersRef.where('email', '==', email).get();
      if (snapshot.empty) {
        setErrorMessage('Invalid email or password');
        return;
      }
  
      let validUser = false;
      snapshot.forEach((doc) => {
        const user = doc.data();
        if (user.password === password) {
          validUser = true;
        }
      });
  
      if (validUser) {
        setErrorMessage('');
        history.push('/Home');
      } else {
        setErrorMessage('Invalid email or password');
      }
    } catch (error) {
      console.error('Error logging in: ', error);
      setErrorMessage('Error logging in. Please try again later.');
    }
  };
  

  return (

    <div className="loginn">
          
      <div className="loginn-container">
      <div className="paw-logo-container">
        <img src={logo} alt="Logo" className="paw-logo" />
        </div>
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
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
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Login</button>
        <button type="button" onClick={() => history.push('/signup')}>
          Sign Up
        </button>
      </form>
      </div>
</div>
</div>
  );
};

export default Login;