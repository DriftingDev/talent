import React, {useContext, useEffect} from 'react'
import { useHistory } from 'react-router'
import { Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../layout/NavBar'
import ProducerNextShows from './ProducerNextShows'
import CalendarDisplay from '../common/CalendarDisplay'
import Loading from '../layout/Loading'
import {ShowContext} from '../../store/show'
import {CurrentUserContext} from '../../store/currentUser'

const Calendar = () => {

  const history = useHistory()
  const {state: ShowState, getShows} = useContext(ShowContext)
  const {state: CurrentUserState} = useContext(CurrentUserContext)

  useEffect(() =>{
    // add below when localStorage is implemented
    //if(CurrentUserState.user.is_artist || !localStorage.getItem('currentCompany'))
    if(CurrentUserState.user.is_artist) {
      history.push('/companies')
    }
    if(ShowState.shows == null) {
      getShows()
    }

  }, [CurrentUserState, ShowState])

  return (
    <>
      <NavBar/>
      {ShowState.loaded ? 
      <Container bg='dark' fluid >
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={9} className='pt-4'>
            <ProducerNextShows shows={ShowState.shows}/>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={9} className='py-4'>
            <CalendarDisplay events={ShowState.shows}/>
          </Col>
        </Row>
        <Row className='py-4'>
        </Row>
      </Container>
      :
      <Loading />
      }
    </>
  )

}

export default Calendar