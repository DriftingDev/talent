import React, { useContext } from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import CompanyEditModal from './CompanyEditModal';
import { useHistory } from 'react-router';
import { CurrentUserContext } from '../../store/currentUser';

const CompanyItem = ({ company }) => {
  const history = useHistory();
  const { state: currentUserState } = useContext(CurrentUserContext);

  const selectCompany = (company) => {
    if (localStorage.getItem('currentCompany')) {
      localStorage.removeItem('currentCompany');
    }
    localStorage.setItem('currentCompany', company._id);
    console.log(localStorage.getItem('currentCompany'));
    currentUserState.user.is_artist
      ? history.push('/shows')
      : history.push('/calendar');
  };
  // console.log(company);
  return (
    <>
      <Card className='company-card' style={{ fontWeight: 200 }}>
        <Card.Body className='py-1 '>
          <Row>
            <Col xs={5} className='noPadding '>
              <div className='px-1 '>
                <p>{company.name}</p>
              </div>
              <CompanyEditModal company={company} />
              <Button
                variant='primary'
                size='sm'
                type='submit'
                onClick={() => {
                  selectCompany(company);
                }}
              >
                Select
              </Button>
            </Col>
            <Col className='light-gray-box text-center noPadding'>
              <div className='py-3'>
                <p>Shows</p>
                <h3>{company.shows.length}</h3>
              </div>
            </Col>
            <Col className='light-gray-box text-center noPadding'>
              <div className='py-3'>
                <p>Venues</p>
                <h3> {company.venues.length}</h3>
              </div>
            </Col>
            <Col className='light-gray-box text-center noPadding'>
              <div className='py-3'>
                <p>Artists</p>
                <h3>{company.users.length}</h3>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={5}></Col>
            <Col className='noPadding'></Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default CompanyItem;
