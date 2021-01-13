import { useContext, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import { CurrentUserContext } from '../../store/currentUser';
import { ShowContext } from '../../store/show';
import { VenueContext } from '../../store/venue';
import Loading from '../layout/Loading';
import NavBar from '../layout/NavBar';
import ShowAccordionFrame from '../layout/ShowAccordionFrame';
import VenueAccordion from './VenueAccordion';

const DisplayVenue = () => {
  const { id } = useParams();
  let venueById = null;
  let venueShows = null;

  const { state: CurrentUserState } = useContext(CurrentUserContext);
  const { state: VenueState, getVenuesByCompany } = useContext(VenueContext);
  const { state: ShowState, getShows, getShowsByUser } = useContext(
    ShowContext
  );

  useEffect(() => {
  }, [VenueState, ShowState, CurrentUserState]);
  
  if (!VenueState.loaded) {
    getVenuesByCompany();
  }
  if (VenueState.loaded) {
    if (!ShowState.loaded) {
      CurrentUserState.user.is_artist ? getShowsByUser() : getShows();
    }
  }

  if (ShowState.loaded && VenueState.loaded) {
    venueById = VenueState.venues.filter((venue) => venue._id === id);
    venueShows = ShowState.shows.filter((show) => show.venue._id === id);
  }

  return (
    <>
      {console.log('in return', venueById)}
      <NavBar />
      <Container bg='dark'>
        <Row className='py-2 align-items-center'></Row>
        {venueById === null ? (
          <Loading />
        ) : (
          <>
            <VenueAccordion venues={venueById} withLink={false} />
            {/* <p>MAP HERE IF HAVE TIME</p> */}
            {venueShows === null ? (
              <Loading />
            ) : venueShows.length === 0 ? (
              <h4 className='no-records'>
                This venue has no shows attached to it
              </h4>
            ) : (
              <ShowAccordionFrame
                shows={venueShows}
                showOptions={{
                  withTitle: true,
                  withTime: true,
                  withArtists: true,
                  withVenue: false,
                  withEndTime: true,
                  withDescrip: true,
                  withDeleteEdit: false,
                  withAllShowsLink: true,
                }}
              />
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default DisplayVenue;
