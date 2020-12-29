// import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
//Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PrivateRoutes from './components/auth/ProtectedRoutes';
//Screens
import ArtistList from './screens/ArtistList';
//Router
import { Route, Switch } from 'react-router-dom';
import ArtistScreen from './screens/ArtistScreen';
//Context
import CurrentUserProvider from './store/currentUser'

function App() {

  return (
    <CurrentUserProvider>
      
      {/* <NavBar fixed='top' />
      <Container bg='dark' fluid style={{ paddingLeft: 0, paddingRight: 0 }}> */}
      <Switch>
            <Route path='/' component={Login} exact />
            <PrivateRoutes>
              <Route path='/register' component={Register} exact />
              <Route path='/artists' component={ArtistList} exact />
              <Route path='/redirect' render={"Poop"} exact />
              <Route path='/artists/:id' component={ArtistScreen} />
            </PrivateRoutes>
        {/* <NavTabs /> */}
      </Switch>
      {/* </Container> */}
      
    </CurrentUserProvider>
  );
}

export default App;
