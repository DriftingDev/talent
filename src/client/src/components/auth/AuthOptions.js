import React, { useContext } from 'react';
import { Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../store/currentUser'


export default function AuthOptions() {

  const {state: currentUserState} = useContext(CurrentUserContext)

  return (
    <Nav className='ml-auto'>
      {currentUserState.user ? 
      <>
        <Nav.Link as={Link} to='/'>
          Login
        </Nav.Link>
        <Nav.Link as={Link} to='/register'>
          Sign Up
        </Nav.Link>
      </>
      :
        <Nav.Link as={Link} to='/logout'>
          Logout
        </Nav.Link>
      }
      <Nav.Link as={Link} to='/artists'>
        Artists
      </Nav.Link>
    </Nav>
  );
}