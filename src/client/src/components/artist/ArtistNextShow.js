import React from 'react'
import moment from 'moment'
import { Alert, Row, Col} from 'react-bootstrap'
import { BiTime } from 'react-icons/bi'
import { BsHouseDoor } from "react-icons/bs"

const ArtistNextShow = ({shows}) => {
  const nextShows = shows.filter((show) => {
    return moment() < moment(show.eventEnd)
  }).sort((a, b) => a.eventStart > b.eventStart)

  
  return (
    <>
    <Alert variant='danger' className='py-3'>
    { nextShows.length > 0 ?
      <>
        <Row>
          <Col className="d-flex justify-content-center">NEXT SHOW:</Col>
          <Col className="d-flex justify-content-center">{nextShows[0].showName}</Col>
        </Row>
        <hr/>
        <Row>
          <Col className="d-flex justify-content-center"><BiTime/>{moment(nextShows[0].eventStart).format('MMMM Do YYYY @ h:mm:ss a')} </Col>
        </Row>
        <hr/>
        <Row>
          <Col className="d-flex justify-content-center"><BsHouseDoor/>{nextShows[0].venue.name} </Col>
        </Row> 
      </>
      :
      <Row>
        <Col>You don't have any upcoming shows</Col>
      </Row>
    }
    </Alert>
    </>
  )
}

export default ArtistNextShow