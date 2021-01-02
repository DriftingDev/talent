import React, {useContext, useEffect} from 'react'
import { useHistory } from 'react-router'
import { Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../layout/NavBar'
import ProducerNextShows from './ProducerNextShows'
import CalendarDisplay from '../common/CalendarDisplay'
import {ShowContext} from '../../store/show'
import {CurrentUserContext} from '../../store/currentUser'

const Calendar = () => {

  const history = useHistory()
  const {state: ShowState} = useContext(ShowContext)
  const {state: CurrentUserState} = useContext(CurrentUserContext)

  useEffect(() =>{
    if(CurrentUserState.user.is_artist) {
      history.push('/companies')
    }
  }, [CurrentUserState])

  return (
    <>
      <NavBar/>
      <Container bg='dark' fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={9} className='pt-4'>
            <ProducerNextShows />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={9} className='pt-4'>
            <CalendarDisplay/>
          </Col>
        </Row>
      </Container>
    </>
  )

}

export default Calendar