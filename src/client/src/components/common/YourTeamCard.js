import React from 'react';
import { Container, Card, Col, Row, Button } from 'react-bootstrap';
import { BsEnvelope } from 'react-icons/bs';
import { FiPhone } from 'react-icons/fi';

function YourTeamCard({ user }) {
  return (
    <>
      <Container>
        <Card className='my-3 p-3 rounded' border='primary'>
          <Card.Body>
            <Row>
              <Col xs={12} className='noPadding '>
                <Card.Title>{user.accname}</Card.Title>
                <Card.Text>
                  <p className='truncate'>
                    <BsEnvelope /> {user.email}
                  </p>
                </Card.Text>
                <Card.Text>
                  <FiPhone /> {user.contact}
                </Card.Text>
                <Card.Text>{user.fringe_link}</Card.Text>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default YourTeamCard;
