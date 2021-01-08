import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import NavBar from '../layout/NavBar';
import Loading from '../layout/Loading';
import ArtistNextShow from '../artist/ArtistNextShow';
import CalendarDisplay from '../common/CalendarDisplay';
import { ShowContext } from '../../store/show';
import { CurrentUserContext } from '../../store/currentUser';
import { CompanyContext } from '../../store/company';
import ShowAccordionFrame from '../layout/ShowAccordionFrame';
import { VenueContext } from '../../store/venue';
import ErrorModal from '../layout/ErrorModal';

const AllShows = () => {
  const history = useHistory();
  const { state: ShowState, getShows, getShowsByUser } = useContext(
    ShowContext
  );
  const { state: CurrentUserState } = useContext(CurrentUserContext);
  const { state: CompanyState, fetchCurrentCompany } = useContext(
    CompanyContext
  );
  const { state: VenueState, getVenuesByCompany } = useContext(VenueContext);
  const [errorState, setErrorState] = useState({ show: false, message: null });

  useEffect(() => {
    if (!localStorage.getItem('currentCompany')) {
      history.push('/companies');
    }
    if (
      localStorage.getItem('currentCompany') &&
      CompanyState.currentCompany === null
    ) {
      fetchCurrentCompany();
    }
    if (ShowState.shows == null) {
      CurrentUserState.user.is_artist
        ? getShowsByUser(CurrentUserState.user._id)
        : getShows();
    }
    if (!VenueState.loaded && !CurrentUserState.user.is_artist) {
      getVenuesByCompany();
    }
  }, [CurrentUserState, ShowState, VenueState, CompanyState]);

  let artistsExist;
  if (CompanyState.currentCompany != null) {
    let artists = CompanyState.currentCompany.users.filter(
      (user) => user.is_artist
    );
    artistsExist = artists.length > 0 ? true : false;
  }

  return (
    <>
      <NavBar />
      <ErrorModal
        errorMessage={errorState.message}
        modalState={errorState.show}
        handleClose={() => {
          setErrorState({ show: false, message: null });
        }}
      />
      {ShowState.loaded &&
      (CurrentUserState.user.is_artist ? true : VenueState.loaded) &&
      CompanyState.currentCompany != null ? (
        <Container bg='dark' fluid>
          {CurrentUserState.user.is_artist && ShowState.shows.length > 0 && (
            <Row>
              <Col>
                <ArtistNextShow shows={ShowState.shows} />
              </Col>
            </Row>
          )}
          <Row className='justify-content-center py-2'>
            <Col xs={6} className='pt-2'>
              <h1>SHOWS</h1>
            </Col>
            {!CurrentUserState.user.is_artist && (
              <Col className='float-right pt-2'>
                {VenueState.venues.length > 0 && artistsExist ? (
                  <Button
                    onClick={() => {
                      history.push('/shows/create');
                    }}
                    className='float-right'
                  >
                    Create New Show
                  </Button>
                ) : VenueState.venues.length > 0 ? (
                  <>
                    <Button
                      variant='secondary'
                      onClick={() => {
                        setErrorState({
                          show: true,
                          message:
                            'You must add an artist to the company before you can add a show',
                        });
                      }}
                    >
                      Create New Show
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant='secondary'
                      onClick={() => {
                        setErrorState({
                          show: true,
                          message:
                            'You must add a venue to the company before you can add a show',
                        });
                      }}
                    >
                      Create New Show
                    </Button>
                  </>
                )}
              </Col>
            )}
          </Row>
          {ShowState.shows.length === 0 && (
            <Row className='justify-content-around pt-2'>
              <Col className='d-flex justify-content-center'>
                <Alert variant='info'>
                  <h3>You don't have any shows with this company... yet.</h3>
                </Alert>
              </Col>
            </Row>
          )}
          {CurrentUserState.user.is_artist && ShowState.shows.length > 0 && (
            <Row>
              <Col>
                <CalendarDisplay events={ShowState.shows} />
              </Col>
            </Row>
          )}
          <ShowAccordionFrame
            shows={ShowState.shows}
            showOptions={{
              withTitle: true,
              withTime: true,
              withArtists: true,
              withVenue: true,
              withEndTime: false,
              withDescrip: true,
              withDeleteEdit: true,
              withAllShowsLink: true,
            }}
          />
        </Container>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default AllShows;
