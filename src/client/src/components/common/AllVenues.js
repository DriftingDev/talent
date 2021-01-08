import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { CurrentUserContext } from '../../store/currentUser';
import { CompanyContext } from '../../store/company';
import { VenueContext } from '../../store/venue';
import Loading from '../layout/Loading';
import { Button, Col, Container, Row } from 'react-bootstrap';
import VenueAccordion from './VenueAccordion';
import NavBar from '../layout/NavBar';

const AllVenues = () => {
  const history = useHistory();
  const { state: CurrentUserState } = useContext(CurrentUserContext);
  const { state: CompanyState, fetchCurrentCompany } = useContext(
    CompanyContext
  );
  const { state: VenueState, getVenuesByCompany, getVenuesByUser } = useContext(
    VenueContext
  );

  useEffect(() => {
    if (!localStorage.getItem('currentCompany')) {
      history.push('/companies');
    }
    if (CompanyState.currentCompany === null) {
      fetchCurrentCompany();
    }
    if (!VenueState.loaded) {
      CurrentUserState.user.is_artist
        ? getVenuesByUser()
        : getVenuesByCompany();
    }
  }, [VenueState, CompanyState, CurrentUserState]);

  return (
    <>
      <NavBar />
      <Container bg='dark'>
        {VenueState.loaded ? (
          <>
            <Row className='py-2 align-items-center'>
              <Col xs={6}>
              <h1 className='title-font'>VENUES</h1>
              </Col>
              {!CurrentUserState.user.is_artist && (
                <Col xs={6}>
                  <Button
                    onClick={() => {
                      history.push('/venues/create');
                    }}
                    className='float-right'
                  >
                    Create Venues
                  </Button>
                </Col>
              )}
            </Row>
            <Row >
              <Col xs={12} md={10} lg={9}>
                {VenueState.venues.length > 0 ? (
                  <VenueAccordion venues={VenueState.venues} withLink={true} />
                ) : (
                  <h2>No Venues have been created yet.</h2>
                )}
              </Col>
            </Row>
          </>
        ) : (
          <Loading />
        )}
      </Container>
    </>
  );
};

export default AllVenues;
