import React from 'react';
import NavBar from '../layout/NavBar';
import { Container, Row, Col } from 'react-bootstrap';

function NotFound() {
  return (
    <>
      <NavBar />
      <Container>
        <Col>
          <Row>
            <h1>Page Not Found</h1>
          </Row>
        </Col>
      </Container>
    </>
  );
}

export default NotFound;
