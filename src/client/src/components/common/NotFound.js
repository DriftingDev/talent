import React from 'react';
import NavBar from '../layout/NavBar';
import { useHistory } from 'react-router'
import { Container } from 'react-bootstrap';

function NotFound() {
  const history = useHistory()

  return (
    <>
      <NavBar />
      <Container>
      <div className='login-form'>
        <h1>404</h1>
        <hr />
        <h2>Page not found =[</h2>
        <hr/>
        <h3 className='btn-link' onClick={() => history.push("/")}>Go Home</h3>
      </div>

          
      </Container>
    </>
  );
}

export default NotFound;
