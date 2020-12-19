import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { BsEnvelope } from 'react-icons/bs';
import { FiPhone } from 'react-icons/fi';
import { Link } from 'react-router-dom';
// import { LinkContainer } from 'react-router-bootstrap'

const ArtistCard = ({ artist }) => {
  return (
    <Card className='my-3 p-3 rounded' border='primary'>
      <Card.Body>
        <Row>
          <Col>
            <Link to={`/artists/${artist.id}`}>
              <Card.Title as='div'>{artist.name}</Card.Title>
            </Link>
            <Card.Text>
              <a
                href={`mailto:${artist.email}?subject=SHOW%20REMINDER%3A&body=Hi%20${artist.name}%2C%0D%0A%0D%0AYour%20next%20show%20will%20be%20at%20TIME%20and%20PLACE.%0D%0A%0D%0A`}
              >
                <p>
                  <BsEnvelope /> {artist.email}
                </p>
              </a>
            </Card.Text>
            <Card.Text>
              <p>
                <FiPhone /> {artist.contact}
              </p>
              <a href='tel:+61409397074'>Phone Artist</a>
              <a href='sms://+61409397074'>Send a SMS</a>
            </Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ArtistCard;
