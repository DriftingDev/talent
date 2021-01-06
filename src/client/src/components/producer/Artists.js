import React from 'react';
// import Link from 'react-router-dom'
import { Button, Container, Row } from 'react-bootstrap';
// import artists from '../data/artists'
import NavBar from '../layout/NavBar';
import ArtistList from './ArtistList';
import { useHistory } from 'react-router';

const Artists = () => {
  const history = useHistory();

  return (
    <>
      <NavBar />
      <Container>
        <Row className='d-flex justify-content-center'>
          <h1>Shows</h1>
        </Row>

        <Button
          onClick={() => {
            history.push('/artists/create');
          }}
          block
        >
          Create Artist
        </Button>

        <ArtistList />
      </Container>
    </>
  );
};

export default Artists;
