import React, { useContext } from 'react';
import { Card, Button, Col } from 'react-bootstrap';
import moment from 'moment';
import { BsPersonLinesFill } from 'react-icons/bs';
import { GiFamilyHouse } from 'react-icons/gi';
import { IoMdMicrophone } from 'react-icons/io';
import { HiPencilAlt } from 'react-icons/hi'
import { useHistory } from 'react-router';
import ShowEditModal from '../producer/ShowEditModal';
import DeleteModal from '../common/DeleteModal';
import { ShowContext } from '../../store/show';
import { CurrentUserContext } from '../../store/currentUser';

const ShowCard = ({ show, showOptions }) => {
  const history = useHistory();

  const { dispatch: showDispatch, deleteShow } = useContext(ShowContext);
  const { state: currentUserState } = useContext(CurrentUserContext);

  return (
    <>
      <div className='pt-4'></div>
      <Card border='light' bg='dark' className='px-3 py-2 white'>
        <Card.Title className='font-weight-bold d-flex justify-content-between'>
          <Col className='noPadding'>
            {showOptions.withTitle && (
              <div>
                <IoMdMicrophone /> {show.showName}
              </div>
            )}
          </Col>
        </Card.Title>

        {showOptions.withTime && (
          <Card.Subtitle className='font-weight-bold'>
            From: {moment(show.eventStart).format(' h:mm a')}
          </Card.Subtitle>
        )}

        {showOptions.withEndTime && (
          <>
            <Card.Subtitle className='font-weight-bold mt-1'>
              Until: {moment(show.eventEnd).format('h:mm a, MMMM Do')}
            </Card.Subtitle>
          </>
        )}

        <hr></hr>
        {showOptions.withVenue && (
          <div>
            <span className='font-weight-bold'>
              <GiFamilyHouse /> Venue:
            </span>{' '}
            {show.venue.name} {show.venue.address && '@ ' + show.venue.address}
          </div>
        )}
        {showOptions.withArtists &&
          show.artists.map((artist, index) => {
            return (
              <div
                key={index}
                className='btn-link'
                onClick={() => {
                  history.push(`/artists/${artist._id}`);
                }}
              >
                <span className='font-weight-bold'>
                  <BsPersonLinesFill /> Artist {index + 1}:
                </span>{' '}
                {artist.accname}
              </div>
            );
          })}
        {showOptions.withDescrip && show.descrip && 
        <>
        <span className='font-weight-bold pb-1'><HiPencilAlt/>{" "}Description:</span>
        <span>{show.descrip}</span>
        </>}
        <Col className='noPadding mt-2 d-flex justify-content-end'>
          {showOptions.withAllShowsLink && (
            <>
              <Button
                variant={'info'}
                className='mx-1 mr-2'
                onClick={() => {
                  history.push(`/shows/${show.showNameSlug}`);
                }}
              >
                All show times
              </Button>
            </>
          )}
          {showOptions.withDeleteEdit && !currentUserState.user.is_artist && (
            <span>
              <DeleteModal
                object={show}
                name='show'
                deleteFunc={deleteShow}
                dispatch={() => {
                  showDispatch({ type: 'clearShows' });
                }}
              />
              <ShowEditModal showObject={show} />
            </span>
          )}
        </Col>
      </Card>
    </>
  );
};

export default ShowCard;
