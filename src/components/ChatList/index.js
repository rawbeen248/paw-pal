import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import Layout from '../Layout';
import logo from '..//images/chatting.png'

const ChatList = () => {
  // Mock data for users
  const users = [
    { id: 1, name: 'Ken Dower' },
    { id: 2, name: 'Robert Polding' },
    { id: 3, name: 'ONELOVE Shelter' },
    { id: 4, name: 'Barack Obama' },
    { id: 5, name: 'El gato muy grande' },
    { id: 6, name: 'Majd Barghouti' },
    { id: 7, name: 'Pet Seller #4455' },
    { id: 5, name: 'El gato muy grande' },
    { id: 6, name: 'Majd Barghouti' },
    { id: 7, name: 'Pet Seller #4455' },
    { id: 5, name: 'El gato muy grande' },
    { id: 6, name: 'Majd Barghouti' },
    { id: 7, name: 'Pet Seller #4455' },
  ];

  return (
    <Layout>
    <div className='app'>
    <div className='logocontainer_chat'>
         <img src={logo} alt='Logo' className='logo_chat' />
        </div>
    <div className="chat-list">
      <div className="conversations">
        {users.map((user) => (
          <Link key={user.id} to={`/chat/${user.id}?name=${encodeURIComponent(user.name)}`} className="user-box">
            <div className="user-info">
              <h2>{user.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
    </div>
    </Layout>
  );
};

export default ChatList;
