import React, {useState} from 'react'
import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import EventModal from './EventModal'

const localizer = momentLocalizer(moment)

const CalendarDisplay = ({events}) => {
  const calendarEvents = events.map((show) => {
    show.eventStart = moment(show.eventStart).toDate()
    show.eventEnd = moment(show.eventEnd).toDate()
    return show
  })

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

  const displayEventModal = (e) => {
    setModalDetails({
      title: e.showName,
      eventStart: moment(e.eventStart).format('MMMM Do YYYY, h:mm a'),
      eventEnd: moment(e.eventEnd).format('MMMM Do YYYY, h:mm a'),
      descrip: e.descrip,
      slug: e.showNameSlug,
      artists: e.artists,
      venue: e.venue
    })
    setModalShow(true)
  }

  return (
    <div>
      <Calendar 
        localizer={localizer}
        events={calendarEvents}
        startAccessor="eventStart"
        endAccessor="eventEnd"
        titleAccessor="showName"
        resourceAccessor="descrip"
        style={{ height: 500 }}
        onSelectEvent={displayEventModal}
        dayLayoutAlgorithm='no-overlap'
      />
      <EventModal 
        details={modalDetails}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  )
}

export default CalendarDisplay