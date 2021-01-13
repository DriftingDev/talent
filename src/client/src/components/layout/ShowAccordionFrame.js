import moment from 'moment'
import { Col, Row } from 'react-bootstrap'
import ShowAccordion from '../common/ShowAccordion'

const ShowAccordionFrame = ({shows, showOptions}) => {

  let futureShows = shows.filter((show) => {
    return moment() < moment(show.eventEnd)
  })
  let pastShows = shows.filter((show) => {
    return moment() > moment(show.eventEnd)
  })

  return (
    <>
    {futureShows.length > 0 &&
      <>
        <Row>
          <Col className="d-flex justify-content-center"><h2>Upcoming/Occuring Shows</h2></Col>
        </Row>
        <Row>
          <Col>
            <ShowAccordion shows={futureShows} className='w-75' showOptions={showOptions} />
          </Col>
        </Row>
      </>
      }
      {pastShows.length > 0 &&
      <>
        <Row>
          <Col className="d-flex justify-content-center"><h2>Past Shows</h2></Col>
        </Row>
        <Row>
          <Col>
            <ShowAccordion shows={pastShows} className='w-75' showOptions={showOptions} />
          </Col>
        </Row>
      </>
    }
    </>
  )

}

export default ShowAccordionFrame