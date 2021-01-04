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

const AllShows = () => {

  const history = useHistory()
  const {state: ShowState, getShows, getShowsByUser} = useContext(ShowContext)
  const {state: CurrentUserState} = useContext(CurrentUserContext)

  useEffect(() =>{
    if(!localStorage.getItem('currentCompany')) {
      history.push('/companies')
    }
    if(ShowState.shows == null) {
      CurrentUserState.user.is_artist ? 
      getShowsByUser(CurrentUserState.user._id) : getShows()
    }
  }, [CurrentUserState, ShowState])

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
            <Button>
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
        <Row>
          <Col>
            <ShowAccordion shows={ShowState.shows} className='w-75' />
          </Col>
        </Row>
      </Container>
      :
      <Loading />
      }
    </>
  )
}

export default AllShows