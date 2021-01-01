import React, {useContext, useEffect} from 'react'
import { useHistory } from 'react-router'
import { Container, Row, Col } from 'react-bootstrap'
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
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={9} className='pt-4'>
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