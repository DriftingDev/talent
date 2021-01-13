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
            <h1>404</h1>
            <hr />
            <h2>Page not found =[</h2>
          </Row>
        </Col>
      </Container>
    </>
  );
}

export default NotFound;
