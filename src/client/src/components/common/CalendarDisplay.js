import React, {useState} from 'react'
import {Calendar, momentLocalizer} from 'react-big-calendar'
import { randomColor, contrastingColor } from '../../data/calendarUtils'
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

  let colour
  let contrast
  let artist_no = 0
  let artist_id = ""

  const artistColorControl = (event) => {
    if(event.artists.length !== artist_no || event.artists[0]._id !== artist_id) {
      if(event.artists.length !== artist_no){
        artist_no = event.artists.length
      }
      if(event.artists[0]._id !== artist_id) {
        artist_id = event.artists[0]._id
      }

      colour = randomColor()
      contrast = contrastingColor(colour.slice(1))
    }
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
        eventPropGetter={
          (event, start, end, isSelected) => {
            artistColorControl(event)
            let newStyle = {
              backgroundColor: colour,
              color: contrast,
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