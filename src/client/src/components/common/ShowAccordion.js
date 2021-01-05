import React from 'react'
import { useHistory } from 'react-router'
import {Accordion, Card, Button} from 'react-bootstrap'
import ShowCard from '../layout/ShowCard'
import moment from 'moment'

const ShowAccordion = ({shows, showOptions}) => {

  const history = useHistory()

  var groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  let showsToMap =
    shows.map((show) => {
      show.accordionDate = moment(show.eventStart).format("MMMM Do YYYY")
      return show
    })
  
  showsToMap = groupBy(showsToMap,'accordionDate')
  const AccordionShows = Object.keys(showsToMap)
    .map((date, index) => {
      return (
        <Card key={index}>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey={index + 1}>
            {date}
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey={index + 1}>
            <Card.Body>
              {showsToMap[date].map(show => (
                <ShowCard show={show} showOptions={showOptions}/>
              )
              )}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      )
    })

  return (
    <Accordion defaultActiveKey="1">
      {AccordionShows}
    </Accordion>
  )

}

export default ShowAccordion