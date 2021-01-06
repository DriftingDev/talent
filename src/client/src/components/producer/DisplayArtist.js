import React from 'react';
import { Container, Row } from 'react-bootstrap';
import NavBar from '../layout/NavBar';
import artists from '../../data/artists';
import ArtistCard from './ArtistCard';
import { useParams } from 'react-router';

function DisplayArtist() {
  //current id from slug saved to variable declaration
  let { id } = useParams();

  const artist = artists.filter(function (artist) {
    return artist.id === id;
  });

  // console.log(artist);

  return (
    <>
      <NavBar />
      <Container>
        <h1>Artists</h1>
        <Row>
          <ArtistCard artist={artist[0]} />
        </Row>
      </Container>
    </>
  );
}

export default DisplayArtist;
