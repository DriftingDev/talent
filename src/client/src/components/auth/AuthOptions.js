import React, { useContext } from 'react';
import { useHistory } from 'react-router'
import { Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CurrentUserContext } from '../../store/currentUser';

export default function AuthOptions() {

  const history = useHistory()

  const {state: currentUserState} = useContext(CurrentUserContext)

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
    </>
  );
}