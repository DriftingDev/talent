import React, { useContext, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router'
import { CompanyContext } from '../../store/company'
import { CurrentUserContext } from '../../store/currentUser'
import { ShowContext } from '../../store/show'
import Loading from '../layout/Loading'
import NavBar from '../layout/NavBar'
import ShowAccordionFrame from '../layout/ShowAccordionFrame'
import ShowCard from '../layout/ShowCard'

const DisplayShow = () => {

  const history = useHistory()

  let { slug } = useParams()

  const {state: CurrentUserState} = useContext(CurrentUserContext)
  const {state: ShowState, getShows} = useContext(ShowContext)
  const {state: CompanyState, fetchCurrentCompany} = useContext(CompanyContext)

  useEffect(() => {
    if(!localStorage.getItem('currentCompany')) {
      history.push('/companies')
    }
    if (!ShowState.loaded) {
      getShows()
    }
    if(CompanyState.currentCompany === null) (
      fetchCurrentCompany()
    )
  },[CurrentUserState, ShowState, CompanyState])

  let showsToDisplay = [];
  if(ShowState.loaded) {
    if (CurrentUserState.user.is_artist) {
      showsToDisplay = ShowState.shows.filter((show) => {
        return show.artists.map(artist => artist._id).includes(CurrentUserState.user._id)
      }).filter(show => show.showNameSlug === slug)
      if (showsToDisplay.length === 0) {
        history.push('/shows')
      } else {
        showsToDisplay.filter(show => show.showNameSlug === slug)
      }
    } else showsToDisplay = ShowState.shows.filter(show => show.showNameSlug === slug)
  }

  return (
    <>
      <NavBar/>
      <Container bg='dark' fluid>
      {showsToDisplay.length > 0 ? 
        <>
        <ShowCard 
        show={showsToDisplay[0]} 
        showOptions={{
          withTitle: true,
          withTime: false,
          withArtists: true,
          withVenue: true,
          withEndTime: false,
          withDescrip: true,
          withDeleteEdit: false,
          withAllShowsLink: false
        }}/>
        <hr></hr>
        <ShowAccordionFrame 
        shows={showsToDisplay} 
        showOptions={{
          withTitle: false,
          withTime: true,
          withArtists: false,
          withVenue: false,
          withEndTime: true,
          withDescrip: false,
          withDeleteEdit: true,
          withAllShowsLink: false
        }}/>
        </>
        :
        <Loading/>
      }
      </Container>
    </>
  )

}

export default DisplayShow