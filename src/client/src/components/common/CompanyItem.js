import React from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import CompanyEditModal from './CompanyEditModal';

const CompanyItem = ({ company }) => {
  // console.log(company);
  return (
    <>
      <Card className='card'>
        <Card.Body>
          <Card.Title key={company._id}> {company.name}</Card.Title>
          <Row>
            <Col>
              <h4>Shows: {company.shows.length}</h4>
              <h4>Venues: {company.venues.length}</h4>
              <h4>Users: {company.users.length}</h4>
              <h4>ID: {company._id}</h4>
            </Col>
          </Row>
          <Row>
            <CompanyEditModal company={company} />
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default CompanyItem;
