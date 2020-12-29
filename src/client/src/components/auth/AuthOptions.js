import React from 'react';
import { useHistory } from 'react-router'
import { Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AuthOptions() {

  const history = useHistory()

  return (
    <Nav className='ml-auto'>
      <Nav.Link onClick={() => {history.push('/')}}>
        Login
      </Nav.Link>
      <Nav.Link onClick={() => {history.push('/register')}}>
        Sign Up
      </Nav.Link>
    </Nav>
  );
}