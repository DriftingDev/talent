import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import artists from '../../data/artists';
import ArtistCard from './ArtistCard';

function ArtistList() {
  return (
    <>
      <Container>
        <h1>Artists</h1>
        <Row>
          {artists.map((artist) => (
            <Col sm={12} md={6} lg={4} xl={4}>
              <ArtistCard artist={artist} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default ArtistList;
