import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { BsEnvelope } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
import { FiPhone } from 'react-icons/fi';

// import { LinkContainer } from 'react-router-bootstrap'

const ArtistCard = ({ artist }) => {
  let history = useHistory();

  function handleNameClick(artist) {
    history.push(`/artists/1`);
  }

  return (
    <Card className='my-3 p-3 rounded' border='primary'>
      <Card.Body>
        <Row>
          <Col xs={4} className='noPadding '>
            <h5>left hand side</h5>
            <p>Shows:</p>
            <p>Upcoming: </p>
            <p>Past: </p>
          </Col>
          <Col xs={8} className='noPadding '>
            <Card.Title onClick={handleNameClick}>{artist.name}</Card.Title>
            <Card.Text>
              <p className='truncate'>
                <BsEnvelope /> {artist.email}
              </p>
            </Card.Text>
            <Card.Text>
              <FiPhone /> {artist.contact}
            </Card.Text>
            <Card.Text>{artist.fringe_link}</Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ArtistCard;
