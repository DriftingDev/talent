import React from 'react';
import { Container, Row } from 'react-bootstrap';
import NavBar from '../layout/NavBar';
import artists from '../../data/artists';
import ArtistCard from './ArtistCard';
import { useParams } from 'react-router';

function DisplayArtist() {
  //current id from slug saved to variable declaration
  let { id } = useParams();

  console.log(`this is the slug: ${id}`);

  const filteredArtistArr = artists.filter((artist) => artist.id === 1);

  const artist = filteredArtistArr[0];

  console.log(`this is the artist object: ${artist}`);
  console.log(artist);

  return (
    <>
      <NavBar />
      <Container>
        <h1>Artists</h1>
        <Row>
          <ArtistCard artist={artist} />
        </Row>
      </Container>
    </>
  );
}

export default DisplayArtist;
