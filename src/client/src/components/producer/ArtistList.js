import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import artists from '../../data/artists';
import ArtistCard from './ArtistCard';

function ArtistList() {
  return (
    <>
      <Col>
        <Row>
          {artists.map((artist) => (
            <Col sm={12} md={6} lg={4} xl={4} key={artist.id}>
              <ArtistCard artist={artist} />
            </Col>
          ))}
        </Row>
      </Col>
    </>
  );
}

export default ArtistList;
