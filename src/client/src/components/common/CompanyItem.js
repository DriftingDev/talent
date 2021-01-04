import React , {useContext} from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import CompanyEditModal from './CompanyEditModal';
import { useHistory } from 'react-router'
import {CurrentUserContext} from '../../store/currentUser'

const CompanyItem = ({ company }) => {

  const history = useHistory()
  const { state: currentUserState } = useContext(CurrentUserContext);

  const selectCompany = (company) => {
    if (localStorage.getItem('currentCompany')) {
      localStorage.removeItem('currentCompany')
    }
    localStorage.setItem('currentCompany',company._id)
    console.log(localStorage.getItem('currentCompany'))
    currentUserState.user.is_artist ? 
      history.push("/shows") :
      history.push("/calendar")
  }
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
            <Button 
              variant='primary'
              size='lg'
              type='submit'
              block
              onClick={() => {selectCompany(company)}}
            >Select</Button>
            <CompanyEditModal company={company} />
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default CompanyItem;
