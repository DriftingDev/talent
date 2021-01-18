import React from 'react'
import moment from 'moment'
import { useHistory } from 'react-router'
import { Alert, Row, Col} from 'react-bootstrap'
import { BiTime } from 'react-icons/bi'
import { BsHouseDoor } from "react-icons/bs"
import { IoMdMicrophone } from 'react-icons/io'

const ArtistNextShow = ({shows}) => {
  const nextShows = shows.filter((show) => {
    return moment() < moment(show.eventEnd)
  }).sort((a, b) => a.eventStart > b.eventStart)

  const history = useHistory()

  return (
    <>
    <Alert variant='danger' className='py-3'>
    { nextShows.length > 0 ?
      <>
        <Row>
          
          <Col className="d-flex justify-content-center"><h4 className="text-dark" onClick={()=>{history.push(`shows/${nextShows[0].showNameSlug}`)}}><IoMdMicrophone/><u>NEXT SHOW:</u> {nextShows[0].showName}</h4></Col>
        </Row>
        <hr/>
        <Row>
          <Col className="d-flex justify-content-center"><h4 className="text-dark"><BiTime/>{" "}{moment(nextShows[0].eventStart).format('MMMM Do YYYY @ h:mm a')} </h4></Col>
        </Row>
        <hr/>
        <Row>
          <Col className="d-flex justify-content-center"><h4 className="text-dark" onClick={()=>{history.push(`venues/`)}}><BsHouseDoor/>{" "}{nextShows[0].venue.name}</h4> </Col>
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