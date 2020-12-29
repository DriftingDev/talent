import React from 'react';
import { useHistory } from 'react-router'
import { Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ArtistOptions = () => {

  const history = useHistory()

  return (
    <Navbar fixed='bottom' bg='dark' variant='dark'>
      <Nav className='ml-auto'>
        <Nav.Link onClick={() => {history.push('/artist/shows')}}>
          Shows
        </Nav.Link>
        <Nav.Link onClick={() => {history.push('/artist/venues')}}>
          Venues
        </Nav.Link>
        <Nav.Link onClick={() => {history.push('/artist/team')}}>
          Team
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}



export default ArtistOptions