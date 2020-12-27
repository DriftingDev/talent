// import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import './App.scss';
//Components
import NavBar from './components/layout/NavBar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import NavTabs from './components/layout/NavTabs';
//Screens
import ArtistList from './screens/ArtistList';
//Router
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ArtistScreen from './screens/ArtistScreen';
//Context
import UserContext from './context/UserContext';

function App() {

  return (
    <Router>
        <NavBar fixed='top' />
        <Container bg='dark' fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
          <Route path='/' component={Login} exact />
          <Route path='/register' component={Register} exact />
          <Route path='/artists' component={ArtistList} exact />
          <Route path='/artists/:id' component={ArtistScreen} />
        </Container>
      <NavTabs />
    </Router>
  );
}

export default App;
