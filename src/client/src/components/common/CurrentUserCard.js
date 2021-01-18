import React from 'react';
import { Container, Card, Col, Row } from 'react-bootstrap';
import { BsEnvelope } from 'react-icons/bs';
import { FiPhone } from 'react-icons/fi';
import { HiLink } from 'react-icons/hi'
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
                  <BsEnvelope />: <a href={`mailto:${user.email}`}>{user.email}</a>
                </Card.Text>
                <Card.Text>
                  <FiPhone />: {user.contact || "N/A"}
                </Card.Text>
                <Card.Text>
                  <HiLink />: {user.link ? <span className='btn-link' onClick={() => {window.open("http://" + user.link)}}>{user.link}</span> : "N/A"}
                </Card.Text>
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
