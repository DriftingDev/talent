import React, {useContext, useEffect} from 'react'
import { useHistory } from 'react-router'
import { Container, Row, Col, Button, Alert } from 'react-bootstrap'
import NavBar from '../layout/NavBar'
import Loading from '../layout/Loading'
import ArtistNextShow from '../artist/ArtistNextShow'
import ShowAccordion from '../common/ShowAccordion'
import CalendarDisplay from '../common/CalendarDisplay'
import {ShowContext} from '../../store/show'
import {CurrentUserContext} from '../../store/currentUser'
import { CompanyContext } from '../../store/company'
import moment from 'moment'

const AllShows = () => {

  const history = useHistory()
  const {state: ShowState, getShows, getShowsByUser} = useContext(ShowContext)
  const {state: CurrentUserState} = useContext(CurrentUserContext)
  const { state: CompanyState, fetchCurrentCompany } = useContext(CompanyContext)

  useEffect(() =>{
    if(!localStorage.getItem('currentCompany')) {
      history.push('/companies')
    }
    if(localStorage.getItem('currentCompany') && CompanyState.currentCompany === null) {
      fetchCurrentCompany()
    }
    if(ShowState.shows == null) {
      console.log("ping")
      CurrentUserState.user.is_artist ? 
      getShowsByUser(CurrentUserState.user._id) : getShows()
    }
  }, [CurrentUserState, ShowState])

  let futureShows;
  let pastShows;

  if (ShowState.loaded) {
    futureShows = ShowState.shows.filter((show) => {
      //if the current moment is "smaller" than the event moment, it is in the future
      return moment() < moment(show.eventEnd)
    })
    pastShows = ShowState.shows.filter((show) => {
      //if the current moment is "larger" than the event moment, it is in the past
      return moment() > moment(show.eventEnd)
    }) 
  }

  return (
    <>
      <NavBar/>
      {ShowState.loaded ?
      
      <Container bg='dark' fluid >
        {(CurrentUserState.user.is_artist && ShowState.shows.length > 0) &&
        <Row>
          <Col>
            <ArtistNextShow shows={ShowState.shows} />
          </Col>
        </Row>
        }
        <Row className="justify-content-around pt-2">
          <Col className="d-flex justify-content-center"><h1>Shows</h1></Col>
          {!CurrentUserState.user.is_artist && 
          <Col className="d-flex justify-content-center">
            <Button onClick={() => {history.push("/shows/create")}}>
              Create New Show
            </Button>
          </Col>}
        </Row>
        {ShowState.shows.length === 0 &&
            <Row className="justify-content-around pt-2">
              <Col className="d-flex justify-content-center"><Alert variant='info'>You don't have any shows with this company... yet.</Alert></Col>
            </Row>
          }
        {(CurrentUserState.user.is_artist && ShowState.shows.length > 0) &&
        <Row>
          <Col>
            <CalendarDisplay events={ShowState.shows} />
          </Col>
        </Row>
        }
        {futureShows.length > 0 &&
        <>
          <Row>
            <Col className="d-flex justify-content-center"><h2>Upcoming/Occuring Shows</h2></Col>
          </Row>
          <Row>
            <Col>
              <ShowAccordion shows={futureShows} className='w-75' />
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
              <ShowAccordion shows={pastShows} className='w-75' />
            </Col>
          </Row>
        </>
        }
      </Container>
      :
      <Loading />
      }
    </>
  )
}

export default AllShows