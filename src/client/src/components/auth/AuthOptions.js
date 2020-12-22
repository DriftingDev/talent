import React from 'react';
import { Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';


export default function AuthOptions() {
  return (
    <Nav className='ml-auto'>
      <Nav.Link as={Link} to='/'>
        Login
      </Nav.Link>
      <Nav.Link as={Link} to='/signup'>
        Sign Up
      </Nav.Link>
      <Nav.Link as={Link} to='/artists'>
        Artists
      </Nav.Link>
    </Nav>
  );
}