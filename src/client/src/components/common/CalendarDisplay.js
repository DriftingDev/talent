import React, {useState} from 'react'
import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import EventModal from './EventModal'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import $ from 'jquery';

const localizer = momentLocalizer(moment)

const start = new Date(moment().format())
const end = new Date(moment().add(3, 'hours').format())

console.log(start)
console.log(end)

const dummyData = [
  {
    title: "event 1",
    start: start,
    end: end,
    resources: "This is an event that happens"
  }
]

const CalendarDisplay = (props) => {
  const modalStateShape = {
    title: "",
    eventStart: "",
    eventEnd: "",
    descrip: ""
  }
  const [modalShow, setModalShow] = useState(false);
  const [modalDetails, setModalDetails] = useState(modalStateShape)

  const displayEventModal = (e) => {
    setModalDetails({
      title: e.title,
      eventStart: moment(e.start).format('MMMM Do YYYY, h:mm a'),
      eventEnd: moment(e.end).format('MMMM Do YYYY, h:mm a'),
      descrip: e.resources
    })
    setModalShow(true)
  }

  return (
    <div>
      <Calendar 
        localizer={localizer}
        events={dummyData}
        startAccessor="start"
        endAccessor="end"
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