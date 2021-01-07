import React, { useContext, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import NavBar from '../layout/NavBar';
import ArtistCard from './ArtistCard';
import { useHistory, useParams } from 'react-router';
import { CompanyContext } from '../../store/company'
import { CurrentUserContext } from '../../store/currentUser'
import Loading from '../layout/Loading';
import ShowAccordionFrame from '../layout/ShowAccordionFrame'
import { ShowContext } from '../../store/show';

function DisplayArtist() {

  const history = useHistory()

  //current id from slug saved to variable declaration
  let { id } = useParams();

  const { state: CompanyState, fetchCurrentCompany } = useContext(CompanyContext)
  const { state: CurrentUserState } = useContext(CurrentUserContext)
  const { state: ShowState, getShows } = useContext(ShowContext)

  useEffect(() => {
    if(CurrentUserState.user.is_artist && CurrentUserState.user._id !== id){
      history.push('/shows')
    }
    if(CompanyState.currentCompany === null && localStorage.getItem('currentCompany')){
      fetchCurrentCompany()
    } else if (CompanyState.currentCompany === null && !localStorage.getItem('currentCompany')) {
      history.push('/companies')
    }
    if(!ShowState.loaded){
      getShows()
    }
  })

  let artist;
  let artistShows = []

  if(CompanyState.currentCompany != null){
    artist = CompanyState.currentCompany.users.filter(user => user._id === id)
    if(artist.length === 0){
      history.push('/artists')
    }
  }

  if(ShowState.loaded){
    ShowState.shows.forEach((show) => {
      let idArray = show.artists.map(showArtist => showArtist._id)
      if(idArray.includes(id)){
        artistShows.push(show)
      }
    })
  }
  
  return (
    <>
    {CompanyState.currentCompany != null ?
    <>
      <NavBar />
      <Container>
        <h1>Artists</h1>
        <Row>
          <ArtistCard artist={artist[0]} />
        </Row>
        <Row>
          <Col>
            <ShowAccordionFrame shows={artistShows} showOptions={{
              withTitle: true,
              withTime: true,
              withArtists: true,
              withVenue: true,
              withEndTime: true,
              withDescrip: false,
              withDeleteEdit: false,
              withAllShowsLink: false
            }} />
          </Col>
        </Row>
      </Container>
    </>
    :
    <Loading />
    }
    </>
  );
}

export default DisplayArtist;
