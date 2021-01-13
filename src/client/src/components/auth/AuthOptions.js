import React, { useContext } from 'react';
import { useHistory } from 'react-router'
import { Nav } from 'react-bootstrap';
import { CurrentUserContext } from '../../store/currentUser';

export default function AuthOptions() {

  const history = useHistory()

  const {state: currentUserState, dispatch: currentUserDispatch} = useContext(CurrentUserContext)

  const logoutFunc = () => {
    currentUserDispatch({
      type: "clearUser"
    })
    localStorage.removeItem('token')
    localStorage.removeItem('currentCompany')
    history.push('/')
  }

  return (
    <>
    { !currentUserState.user &&
    <Nav className='ml-auto'>
      <Nav.Link onClick={() => {history.push('/')}}>
        Login
      </Nav.Link>
      <Nav.Link onClick={() => {history.push('/register')}}>
        Sign Up
      </Nav.Link>
    </Nav>
    }
    {(currentUserState.user && !localStorage.getItem('currentCompany')) &&
    <Nav className='ml-auto'>
      <Nav.Link onClick={logoutFunc}>
        Logout
      </Nav.Link>
    </Nav>
    }
    </>
  );
}