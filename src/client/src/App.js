import React, { useContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
//Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Loading from './components/layout/Loading';
import Calendar from './components/producer/Calendar';
import Companies from './components/common/Companies';
import AllShows from './components/common/AllShows';
import CreateShows from './components/producer/CreateShows';
import RegisterArtist from './components/producer/RegisterArtist';
import DisplayArtist from './components/producer/DisplayArtist';
import DisplayShow from './components/common/DisplayShow';
import NotFound from './components/common/NotFound';
//Router
import { Route, Switch } from 'react-router-dom';
import Artists from './components/producer/Artists';
import PrivateRoutes from './components/auth/ProtectedRoutes';
//Context
import { CurrentUserContext } from './store/currentUser';
//Data Provider
import DataProvider from './store/DataProvider';

function App() {
  const { state: currentUserState, fetchUser } = useContext(CurrentUserContext);
  const unloadedUser = localStorage.getItem('token') && !currentUserState.user;

  if (unloadedUser) {
    fetchUser();
  }

  useEffect(() => {}, [currentUserState]);

  return (
    <>
      {unloadedUser ? (
        <Loading />
      ) : (
        <Switch>
          <Route path='/' component={Login} exact />
          <Route path='/register' component={Register} exact />
          <PrivateRoutes>
            <DataProvider>
              <Switch>
                <Route path='/companies' component={Companies} exact />
                <Route path='/calendar' component={Calendar} exact />
                <Route path='/shows' component={AllShows} exact />
                <Route path='/shows/create' component={CreateShows} exact />
                <Route path='/shows/:slug' component={DisplayShow} exact />
                <Route path='/artists' component={Artists} exact />
                <Route
                  path='/artists/create'
                  component={RegisterArtist}
                  exact
                />
                <Route path='/artists/:id' component={DisplayArtist} exact />
                {/* <Route path='*' component={NotFound} /> */}
              </Switch>
            </DataProvider>
          </PrivateRoutes>
        </Switch>
      )}
    </>
  );
}

export default App;
