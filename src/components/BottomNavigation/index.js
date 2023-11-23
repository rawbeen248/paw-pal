import React from 'react';
import { useHistory } from 'react-router-dom';
import {useLocation } from 'react-router-dom';

import { BottomNavigation as MuiBottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';
import PersonIcon from '@mui/icons-material/Person';
import './styles.css';

const BottomNavigation = () => {
  const location = useLocation();
  const history = useHistory();

  const tabs = [
    { label: 'Home', icon: <HomeIcon />, path: '/home' },
    { label: 'Liked', icon: <FavoriteIcon />, path: '/liked' },
    { label: 'Chat', icon: <ChatIcon />, path: '/chat' },
    { label: 'Profile', icon: <PersonIcon />, path: '/profile' },
  ];

  const activeTab = tabs.findIndex(tab => location.pathname.startsWith(tab.path));

  const handleChange = (event, newValue) => {
    history.push(tabs[newValue].path);
  };

  return (
    <MuiBottomNavigation value={activeTab} onChange={handleChange} className="bottom-navigation">
      {tabs.map((tab, index) => (
        <BottomNavigationAction key={index} label={tab.label} icon={tab.icon} />
      ))}
    </MuiBottomNavigation>
  );
};

export default BottomNavigation;