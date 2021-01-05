import React from 'react'
import {Card, Button} from 'react-bootstrap'
import moment from 'moment'
import {useHistory} from 'react-router'
import ShowEditModal from '../producer/ShowEditModal'

const ShowCard = ({show}) => {
  const history = useHistory()

  return(
    <Card border='info' bg='dark' >
      <Card.Title>{show.showName}</Card.Title>
      <Card.Subtitle>@ {moment(show.eventStart).format('h:mm a')}</Card.Subtitle>
      <Card.Text>
        <hr></hr>
        {show.artists.map((artist, index) => {
          return (
            <p onClick={() => {history.push(`/artist/${artist._id}`)}}>Artist {index}: {artist.accname}</p>
          )
        })}
      </Card.Text>
      <Card.Footer>
        <Button onClick={() => {history.push(`/show/${show.showNameSlug}`)}}>
          All Show times
        </Button>
        <ShowEditModal showObject={show}/>
      </Card.Footer>
    </Card>
  )
}

export default ShowCard