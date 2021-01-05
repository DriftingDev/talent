import React, {useContext} from 'react'
import {Card, Button} from 'react-bootstrap'
import moment from 'moment'
import {useHistory} from 'react-router'
import ShowEditModal from '../producer/ShowEditModal'
import DeleteModal from '../common/DeleteModal'
import {ShowContext} from '../../store/show'

const ShowCard = ({show, showOptions}) => {
  
  const history = useHistory()

  const { deleteShow } = useContext(ShowContext)

  return(
    <Card border='info' bg='dark' >
      {showOptions.withTitle &&
      <Card.Title>{show.showName}</Card.Title>
      } 
      {showOptions.withTime && 
      <Card.Subtitle>@ {moment(show.eventStart).format('MMMM Do, h:mm a')}</Card.Subtitle>
      }
      {showOptions.withEndTime && 
      <Card.Subtitle>until {moment(show.eventStart).format('MMMM Do, h:mm a')}</Card.Subtitle>
      }
      <Card.Text>
        <hr></hr>
        {showOptions.withVenue &&
        <p>Venue: {show.venue.name} {show.venue.address && "@ " + show.venue.address}</p>
        }
        {showOptions.withArtists &&
        show.artists.map((artist, index) => {
          return (
            <p key={index} onClick={() => {history.push(`/artist/${artist._id}`)}}>Artist {index + 1}: {artist.accname}</p>
          )
        })}
      { (showOptions.withDescrip && show.descrip) &&
      <p>{show.descrip}</p>
      }  
      </Card.Text>
      <Card.Footer>
      { showOptions.withAllShowsLink && 
        <>
        <Button variant={'info'} onClick={() => {history.push(`/shows/${show.showNameSlug}`)}}>
          All show times
        </Button>
        <hr></hr>
        </>
      }
      { showOptions.withDeleteEdit &&
        <>
        <DeleteModal object={show} name='show' deleteFunc={deleteShow} />
        <ShowEditModal showObject={show}/>
        </>
      }
      </Card.Footer>
    </Card>
  )
}

export default ShowCard