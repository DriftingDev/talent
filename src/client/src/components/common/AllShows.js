import React, {useContext, useEffect} from 'react'
import { useHistory } from 'react-router'
import { Container, Row, Col, Button, Alert } from 'react-bootstrap'
import NavBar from '../layout/NavBar'
import Loading from '../layout/Loading'
import ArtistNextShow from '../artist/ArtistNextShow'
import CalendarDisplay from '../common/CalendarDisplay'
import {ShowContext} from '../../store/show'
import {CurrentUserContext} from '../../store/currentUser'
import { CompanyContext } from '../../store/company'
import ShowAccordionFrame from '../layout/ShowAccordionFrame'
import { VenueContext } from '../../store/venue'

const AllShows = () => {

  const history = useHistory()
  const {state: ShowState, getShows, getShowsByUser} = useContext(ShowContext)
  const {state: CurrentUserState} = useContext(CurrentUserContext)
  const {state: CompanyState, fetchCurrentCompany } = useContext(CompanyContext)
  const { state: VenueState, getVenuesByCompany } = useContext(VenueContext)

  useEffect(() =>{
    if(!localStorage.getItem('currentCompany')) {
      history.push('/companies')
    }
    if(localStorage.getItem('currentCompany') && CompanyState.currentCompany === null) {
      fetchCurrentCompany()
    }
    if(ShowState.shows == null) {
      CurrentUserState.user.is_artist ? 
      getShowsByUser(CurrentUserState.user._id) : getShows()
    }
    if(!VenueState.loaded && !CurrentUserState.user.is_artist) {
      getVenuesByCompany()
    }
  }, [CurrentUserState, ShowState, VenueState, CompanyState])

  let artistsExist
  if(CompanyState.currentCompany != null){
    let artists = CompanyState.currentCompany.users.filter(user => user.is_artist)
    artistsExist = artists.length > 0 ? true : false
  }

  return (
    <>
      <NavBar/>
      {(ShowState.loaded && 
      (CurrentUserState.user.is_artist ? true : VenueState.loaded)  && 
      CompanyState.currentCompany != null) ?
      
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
          <Col className="d-flex flex-column justify-content-center">
            {(VenueState.venues.length > 0 && artistsExist) ?
            <Button onClick={() => {history.push("/shows/create")}}>
              Create New Show
            </Button>
            :
            VenueState.venues.length > 0 ? 
              <>
              <Button disabled={true} variant="secondary">
                Create New Show
              </Button>
              <br></br>
              <div>Create or add an artist to create a show</div>
              </>
              :
              <>
              <Button disabled={true} variant="secondary">
                Create New Show
              </Button>
              <br></br>
              <div>Create a venue to create a show</div>
              </>
            }
          </Col>
          }
          
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
        <ShowAccordionFrame 
        shows={ShowState.shows} 
        showOptions={{
          withTitle: true,
          withTime: true,
          withArtists: true,
          withVenue: true,
          withEndTime: false,
          withDescrip: true,
          withDeleteEdit: true,
          withAllShowsLink: true
        }}/>
      </Container>
      :
      <Loading />
      }
    </>
  )
}

export default AllShows