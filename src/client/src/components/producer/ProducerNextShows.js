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
    descrip: ""
  }
  const [modalShow, setModalShow] = useState(false);
  const [modalDetails, setModalDetails] = useState(modalStateShape)

  const displayEventModal = (show) => {
    
    setModalDetails({
      title: show.showName,
      eventStart: moment(show.eventStart).format('MMMM Do YYYY, h:mm a'),
      eventEnd: moment(show.eventEnd).format('MMMM Do YYYY, h:mm a'),
      descrip: show.descrip,
      slug: show.showNameSlug
    })
    setModalShow(true)
  }

  const nextShows = shows.filter((show) => {
    //if the current moment is "smaller" than the event moment, it is in the future
    if(moment() < moment(show.eventEnd)){
      return true
    }
  }).slice(0,3).map((show) => {
    return (
      <div key={show._id} >
        <Alert variant="danger" className="px-1 py-2" onClick={() => {displayEventModal(show)}}>
          <div className='d-flex justify-content-between px-3'>
            <p className='px-2 m-0'>
              <BiTime /> {moment(show.eventStart).format('MMMM Do YYYY @ h:mm:ss a')} 
            </p>
            <p className='px-2 m-0'>
              <AiFillSound /> {show.showName}
            </p>
          </div>
        </Alert>
      </div>
    )
  })

  

  return (
    <>
    {nextShows}
    <EventModal 
        details={modalDetails}
        show={modalShow}
        onHide={() => setModalShow(false)}
    />
    </>
  )

}

export default ProducerNextShows