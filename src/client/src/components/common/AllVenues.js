import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router'
import {CurrentUserContext} from '../../store/currentUser'
import {CompanyContext} from '../../store/company'
import {VenueContext} from '../../store/venue' 
import Loading from '../layout/Loading'
import { Button, Col, Container, Row } from 'react-bootstrap'
import VenueAccordion from './VenueAccordion'
import NavBar from '../layout/NavBar'

const AllVenues = () => {

  const history = useHistory()
  const { state: CurrentUserState } = useContext(CurrentUserContext)
  const { state: CompanyState, fetchCurrentCompany } = useContext(CompanyContext)
  const { state: VenueState, getVenuesByCompany, getVenuesByUser } = useContext(VenueContext)

  useEffect(() => {
    if(!localStorage.getItem('currentCompany')){
      history.push('/companies')
    }
    if(CompanyState.currentCompany === null) {
      fetchCurrentCompany()
    }
    if(!VenueState.loaded){
      CurrentUserState.user.is_artist ? getVenuesByUser() : getVenuesByCompany()
    }
  },[VenueState, CompanyState])

  return(
    <>
      <NavBar />
      <Container bg='dark' fluid>
        { VenueState.loaded ?
        <>
        <Row>
          <Col>
            <h1>Venues</h1>
          </Col>
          {!CurrentUserState.user.is_artist && 
          <Button onClick={()=>{history.push('/venues/create')}}>
            Create Venues
          </Button>
          }
        </Row>
        <Row>
          <VenueAccordion venues={VenueState.venues}/>
        </Row>
        </>
        :
        <Loading />
        }
      </Container>
    </>
  )

}

export default AllVenues