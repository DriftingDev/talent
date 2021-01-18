import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import moment from 'moment';
import { BsPersonLinesFill } from 'react-icons/bs'
import { GiFamilyHouse } from 'react-icons/gi'
import { IoMdMicrophone } from 'react-icons/io'
import { useHistory } from 'react-router';
import ShowEditModal from '../producer/ShowEditModal';
import DeleteModal from '../common/DeleteModal';
import { ShowContext } from '../../store/show';
import { CurrentUserContext } from '../../store/currentUser';

const ShowCard = ({ show, showOptions }) => {
  const history = useHistory();

  const { dispatch: showDispatch, deleteShow } = useContext(ShowContext)
  const { state: currentUserState } = useContext(CurrentUserContext)

  return (
    <Card border='info' bg='dark' className='px-3 py-2 mb-2'>
      <Card.Title className="font-weight-bold d-flex justify-content-between">
      {showOptions.withTitle && 
      <div><IoMdMicrophone /> {show.showName}</div>}

      { showOptions.withAllShowsLink && 
        <>
        <Button variant={'info'} onClick={() => {history.push(`/shows/${show.showNameSlug}`)}}>
          All show times
        </Button>
        
        </>
      }
      { (showOptions.withDeleteEdit && !currentUserState.user.is_artist) &&
        <span>
        <DeleteModal object={show} name='show' deleteFunc={deleteShow} dispatch={() => {showDispatch({type: "clearShows"})}} />
        <ShowEditModal showObject={show}/>
        </span>
      }
      </Card.Title>
      
      {showOptions.withTime && (
        <Card.Subtitle className="font-weight-bold">
          From: {moment(show.eventStart).format(' h:mm a')}
        </Card.Subtitle>
      )}
      
      {showOptions.withEndTime && (
        <>
        <hr></hr>
        <Card.Subtitle className="font-weight-bold">
          Until: {moment(show.eventEnd).format('h:mm a, MMMM Do')}
        </Card.Subtitle>
        </>
      )}
      
      <hr></hr>
      {showOptions.withVenue && (
        <div>
          <span className="font-weight-bold"><GiFamilyHouse /> Venue:</span> {show.venue.name}{' '}
          {show.venue.address && '@ ' + show.venue.address}
        </div>
      )}
      {showOptions.withArtists &&
        show.artists.map((artist, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                history.push(`/artists/${artist._id}`);
              }}
            >
              <span className="font-weight-bold"><BsPersonLinesFill /> Artist {index + 1}:</span> {artist.accname}
            </div>
          );
        })}
      {showOptions.withDescrip && show.descrip && <p>{show.descrip}</p>}
      
    </Card>
  );
};

export default ShowCard;
