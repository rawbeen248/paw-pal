import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import BottomNavigation from '../BottomNavigation';
import logo from '../images/pawpal_logo.jpeg'; // import your logo image file here

const Layout = ({ children }) => {
  return (
    <div className="app">
      <div className="page-container">
        
        <div className="content-container">
        <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
        </div>
          <div className="content-container:before">
            <div className="page-content">{children}</div>
          </div>
          <BottomNavigation />
        </div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;