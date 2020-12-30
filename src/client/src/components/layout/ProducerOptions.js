import React from 'react';
import { useHistory } from 'react-router'
import { Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProducerOptions = () => {

  const history = useHistory()

  return (
    <Navbar fixed='bottom' bg='dark' variant='dark'>
      <Nav className='ml-auto'>
        <Nav.Link onClick={() => {history.push('/calendar')}}>
          Calendar
        </Nav.Link>
        <Nav.Link onClick={() => {history.push('/shows')}}>
          Shows
        </Nav.Link>
        <Nav.Link onClick={() => {history.push('/artists')}}>
          Artists
        </Nav.Link>
        <Nav.Link onClick={() => {history.push('/venues')}}>
          Venues
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}



export default ProducerOptions