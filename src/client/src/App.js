// import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
//Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
//Screens
import ArtistList from './screens/ArtistList';
//Router
import { Route, Switch } from 'react-router-dom';
import ArtistScreen from './screens/ArtistScreen';
import PrivateRoutes from './components/auth/ProtectedRoutes';
import ArtistRoutes from './components/auth/ArtistRoutes';
//Context
import CurrentUserProvider from './store/currentUser'

function App() {

  return (
    <CurrentUserProvider>
      <Switch>
        <Route path='/' component={Login} exact />
        <Route path='/register' component={Register} exact />
        <PrivateRoutes>
          <Route path='/companies' exact />
          <ArtistRoutes>
            <Route path='/artists' component={ArtistList} exact />
          </ArtistRoutes>
          <Route path='/artists/:id' component={ArtistScreen} />
        </PrivateRoutes>
      </Switch>
    </CurrentUserProvider>
  );
}

export default App;
