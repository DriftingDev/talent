import React, {useState} from 'react'
import { Alert } from 'react-bootstrap'
import { BiTime } from 'react-icons/bi'
import { AiFillSound } from "react-icons/ai"
import EventModal from '../common/EventModal'
import moment from 'moment'

const ProducerNextShows = ({ shows }) => {

  const modalStateShape = {
    title: "",
    eventStart: "",
    eventEnd: "",
    descrip: "",
    slug: "",
    venue: null,
    artists: []
  }
  const [modalShow, setModalShow] = useState(false);
  const [modalDetails, setModalDetails] = useState(modalStateShape)

  const displayEventModal = (show) => {
    
    setModalDetails({
      title: show.showName,
      eventStart: moment(show.eventStart).format('MMMM Do YYYY, h:mm a'),
      eventEnd: moment(show.eventEnd).format('MMMM Do YYYY, h:mm a'),
      descrip: show.descrip,
      slug: show.showNameSlug,
      artists: show.artists,
      venue: show.venue
    })
    setModalShow(true)
  }

  const nextShows = shows.filter((show) => {
    return moment() < moment(show.eventEnd)
  }).sort((a,b) => a.eventStart > b.eventStart).slice(0,3).map((show) => {
    return (
      <div key={show._id} >
        <Alert variant="danger" className="px-1 py-2" onClick={() => {displayEventModal(show)}}>
          <div className='d-flex justify-content-between px-3'>
            <h5 className='px-2 m-0'>
              <BiTime /> {moment(show.eventStart).format('MMMM Do YYYY @ h:mm a')} 
            </h5>
            <h5 className='px-2 m-0'>
              <AiFillSound /> {show.showName}
            </h5>
          </div>
        </Alert>
      </div>
    )
  })

  

  return (
    <>
    {nextShows.length > 0 ?
    <>
    <h2>
      Next Shows:
    </h2>
    {nextShows}
    <EventModal 
        details={modalDetails}
        show={modalShow}
        onHide={() => setModalShow(false)}
    />
    </>
    :
    <h2>No upcoming shows</h2>
    }
    </>
  )

}

export default ProducerNextShows