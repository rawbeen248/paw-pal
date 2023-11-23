import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './styles.css';

const SplashScreen = () => {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.push('/login');
    }, 4000);
  }, [history]);

  return (
    <div className="splashh">
          
      <div className="splashh-container">

    <div className="splash-container">
      <img src="https://raw.githubusercontent.com/0ardneebwar0/React-Web-App/main/logo.jpg" alt="PawPal Logo" className="splash-logo" />
    </div>
    </div>
    </div>
  );
};

export default SplashScreen;