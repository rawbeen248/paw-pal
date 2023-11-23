import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/Home";
import SplashScreen from "./components/SplashScreen";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Liked from "./components/Liked";
import Profile from "./components/Profile";
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import AddPet from './components/AddPet';
import YourListings from './components/YourListings';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/splash" />
        </Route>
        <Route path="/splash" component={SplashScreen} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/chat" exact component={ChatList} />
        <Route path="/chat/:id" component={ChatWindow} />
        <Route path="/home" component={Home} />
        <Route path="/liked" component={Liked} />
        <Route path="/profile" component={Profile} />
        <Route path="/add-pet" component={AddPet} />
        <Route path="/your-listings" component={YourListings} />
        
      </Switch>
    </Router>
  );
}

export default App;
