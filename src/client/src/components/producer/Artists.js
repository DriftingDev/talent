import React, { useContext, useEffect } from 'react';
// import Link from 'react-router-dom'
import { Button, Container, Row, Col } from 'react-bootstrap';
// import artists from '../data/artists'
import NavBar from '../layout/NavBar';
import ArtistList from './ArtistList';
import { useHistory } from 'react-router';
import { CurrentUserContext } from '../../store/currentUser';

const Artists = () => {
  const history = useHistory();

  const { state: CurrentUserState } = useContext(CurrentUserContext);

  useEffect(() => {
    if (CurrentUserState.user.is_artist) {
      history.push('/shows');
    }
  });

  return (
    <>
      <NavBar />
      <Container>
        <Row className='py-2 align-items-center'>
          <Col xs={6}>
            <h1 className='title-font'>ARTISTS</h1>
          </Col>
          <Col xs={6}>
            <Button
              onClick={() => {
                history.push('/artists/create');
              }}
              className='float-right'
            >
              Create Artist
            </Button>
          </Col>
        </Row>
        <ArtistList />
      </Container>
    </>
  );
};

export default Artists;
