import React from 'react';
// import Link from 'react-router-dom'
import { Button } from 'react-bootstrap';
// import artists from '../data/artists'
import NavBar from '../layout/NavBar';
import ArtistList from './ArtistList';
import { useHistory } from 'react-router';

const Artists = () => {
  const history = useHistory();

  return (
    <>
      <div>
        <NavBar />
        <Button
          onClick={() => {
            history.push('/artists/create');
          }}
        >
          Create Artist
        </Button>
        <ArtistList />
      </div>
    </>
  );
};

export default Artists;
