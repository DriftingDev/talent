import React, {useContext, useEffect} from 'react'
import { useHistory } from 'react-router'
import { Container, Row, Col, Alert } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../layout/NavBar'
import ProducerNextShows from './ProducerNextShows'
import {ShowContext} from '../../store/show'

const Calendar = () => {

  const history = useHistory()
  const {state: ShowState} = useContext(ShowContext)

  // useEffect(() =>{

  // })

  return (
    <>
      <NavBar/>
      <Container bg='dark' fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
        <Row class="d-flex justify-content-center">
          <Col className='col-9 col-md-10 col-xs-12'>
            <ProducerNextShows />
          </Col>
        </Row>
        <Row>
          <Col>
            {/* <CalendarDisplay/> */}
          </Col>
        </Row>
      </Container>
    </>
  )

}

export default Calendar