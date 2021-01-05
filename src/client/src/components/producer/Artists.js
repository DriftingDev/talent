import React from 'react';
// import Link from 'react-router-dom'
// import { Row, Col,  } from 'react-bootstrap'
// import artists from '../data/artists'
import NavBar from '../layout/NavBar';
import ArtistList from './ArtistList';

const ArtistScreen = () => {
  return (
    <>
      <div>
        <NavBar />
        <ArtistList />
      </div>
    </>
  );
};

export default ArtistScreen;
