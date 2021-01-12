import { useContext, useEffect } from 'react';
import { Accordion, Card, Button, Badge, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { CurrentUserContext } from '../../store/currentUser';
import { ShowContext } from '../../store/show';
import { VenueContext } from '../../store/venue';
import DeleteModal from '../common/DeleteModal';
import EditVenueModal from '../producer/EditVenueModal';
import { ImLocation2, ImPhone } from 'react-icons/im';
import { MdEmail } from 'react-icons/md';

const VenueAccordion = ({ venues, withLink }) => {
  const history = useHistory();

  const { dispatch: venueDispatch, deleteVenue } = useContext(VenueContext);
  const { state: CurrentUserState } = useContext(CurrentUserContext);
  const { state: ShowState, getShows } = useContext(ShowContext);

  useEffect(() => {
    if (ShowState.shows === null && !CurrentUserState.user.is_artist) {
      getShows();
    }
  }, [ShowState, CurrentUserState]);

  const AccordionVenues = venues.map((venue, index) => {
    let canDelete = false;
    if (ShowState.loaded) {
      canDelete = true;
      ShowState.shows.forEach((show) => {
        if (show.venue._id === venue._id) {
          canDelete = false;
          return;
        }
      });
    }

    return (
      <Card key={index}>
        <Card.Header>
          <Row className='align-items-center'>
            <Col>
              <Accordion.Toggle
                as={Button}
                // variant='link'
                eventKey={`${index + 1}`}
              >
                {' '}
                {venue.name}{' '}
              </Accordion.Toggle>
            </Col>
            <Col className='d-flex'>
              <Badge pill variant='Info' className='ml-auto'>
                <span className='white'>
                  Capacity {venue.capacity && <> {venue.capacity}</>}
                </span>
              </Badge>
            </Col>
          </Row>
        </Card.Header>
        <Accordion.Collapse eventKey={`${index + 1}`}>
          <Card.Body className='accordian-custom d-flex'>
            <Row>
              <Col>
                {venue.address && (
                  <p>
                    <ImLocation2 /> {venue.address}
                  </p>
                )}
                {venue.contactEmail && (
                  <p>
                    <MdEmail /> {venue.contactEmail}
                  </p>
                )}
                {venue.contactPhone && (
                  <p>
                    <ImPhone /> {venue.contactPhone}
                  </p>
                )}
                {venue.details && (
                  <>
                    <hr></hr>
                    <p>Details</p>
                    <p>{venue.details}</p>
                  </>
                )}
                { !history.location.pathname.slice(8) &&
                <Button
                  variant='info'
                  onClick={() => {
                    history.push(`venues/${venue._id}`);
                  }}
                  className='mr-1'
                >
                  View Venue
                </Button>
                }
              </Col>
            </Row>
            <div className='ml-auto'>
              {!CurrentUserState.user.is_artist && (
                <>
                  {ShowState.loaded && canDelete && (
                    <DeleteModal
                      object={venue}
                      name={'venue'}
                      deleteFunc={deleteVenue}
                      dispatch={() => {
                        venueDispatch({ type: 'clearVenues' });
                      }}
                    />
                  )}
                  <EditVenueModal venue={venue} />
                </>
              )}
            </div>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    );
  });

  return <Accordion defaultActiveKey={'1'}>{AccordionVenues}</Accordion>;
};

export default VenueAccordion;
