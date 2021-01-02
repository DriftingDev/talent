import React from 'react'
import {Card} from 'react-bootstrap'
import moment from 'moment'
import {useHistory} from 'react-router'

const ShowCard = ({show}) => {
  const history = useHistory()

  return(
    <Card border='info' bg='dark' onClick={() => {history.push(`/show/${show._id}`)}}>
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
    </Card>
  )
}

export default ShowCard