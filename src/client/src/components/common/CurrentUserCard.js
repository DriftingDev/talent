import React from 'react';
import { Container, Card, Col, Row } from 'react-bootstrap';
import { BsEnvelope } from 'react-icons/bs';
import { FiPhone } from 'react-icons/fi';
import EditUserModal from './EditUserModal';

function CurrentUserCard({ user }) {
  return (
    <>
      <Container>
        <Card className='my-3 p-3 rounded' border='primary'>
          <Card.Body>
            <Row>
              <Col xs={8} className='noPadding '>
                <Card.Title>{user.accname}</Card.Title>
                <Card.Text className='truncate'>
                  <BsEnvelope /> {user.email}
                </Card.Text>
                <Card.Text>
                  <FiPhone /> {user.contact}
                </Card.Text>
                <Card.Text>{user.fringe_link}</Card.Text>
              </Col>
              <Col xs={4} className='noPadding '>
                <EditUserModal user={user}/>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default CurrentUserCard;
