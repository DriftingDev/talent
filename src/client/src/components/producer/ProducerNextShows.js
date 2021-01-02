import React, {useState} from 'react'
import { Alert } from 'react-bootstrap'
import { BiTime } from 'react-icons/bi'
import { AiFillSound } from "react-icons/ai"
import EventModal from '../common/EventModal'
import moment from 'moment'

const showArray = [
  {
    _id:1,
    eventStart: moment().format(),
    eventEnd: moment().add(1,'hours').format(),
    descrip: "This is a description",
    showName: "Show 1"
  },
  {
    _id:2,
    eventStart: moment().add(1,'hours').format(),
    eventEnd: moment().add(2,'hours').format(),
    descrip: "This is a description",
    showName: "Show 2"
  },
  {
    _id:1,
    eventStart: moment().add(2,'hours').format(),
    eventEnd: moment().add(3,'hours').format(),
    descrip: "This is a description",
    showName: "Show 2"
  }
]

const ProducerNextShows = () => {

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
      descrip: show.descrip
    })
    setModalShow(true)
  }

  const nextShows = showArray.map((show) => {
    
    return (
      <>
        <Alert key={show._id} variant="danger" className="px-1 py-2" onClick={() => {displayEventModal(show)}}>
          <div className='d-flex justify-content-between px-3'>
            <p className='px-2 m-0'>
              <BiTime /> {moment(show.eventStart).format('MMMM Do YYYY @ h:mm:ss a')} 
            </p>
            <p className='px-2 m-0'>
              <AiFillSound /> {show.showName}
            </p>
          </div>
        </Alert>
        
      </>
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