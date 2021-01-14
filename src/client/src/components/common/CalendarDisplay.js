import React, {useState} from 'react'
import {Calendar, momentLocalizer} from 'react-big-calendar'
import { contrastingColor, hexAverage } from '../../data/calendarUtils'
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

  const artistColorControl = (event) => {
    colour = event.artists[0].colour
    if (event.artists.length > 1){
      event.artists.forEach((artist, i, arr) => {
        colour = hexAverage(colour, artist.colour)
      })
    }
  }

  let colour;

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
        eventPropGetter={
          (event, start, end, isSelected) => {
            artistColorControl(event)
            let newStyle = {
              backgroundColor: colour,
              color: contrastingColor(colour),
              borderRadius: "0px",
              border: "none"
            };
      
            return {
              className: "",
              style: newStyle
            };
          }
        }
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