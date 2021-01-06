import { useContext, useEffect } from "react"
import { Container } from "react-bootstrap"
import { useHistory, useParams } from "react-router"
import { CurrentUserContext } from "../../store/currentUser"
import { ShowContext } from "../../store/show"
import { VenueContext } from "../../store/venue"
import Loading from "../layout/Loading"
import NavBar from "../layout/NavBar"
import ShowAccordionFrame from "../layout/ShowAccordionFrame"
import VenueAccordion from "./VenueAccordion"


const DisplayVenue = () => {

  const history = useHistory()

  const { id } = useParams()
  let venueById = null;
  let venueShows = null;

  const { state: CurrentUserState } = useContext(CurrentUserContext)
  const { state: VenueState, getVenuesByCompany } = useContext(VenueContext)
  const { state: ShowState, getShows, getShowsByUser } = useContext(ShowContext)

  useEffect(() => {
    if(!VenueState.loaded){
      getVenuesByCompany()
    }
    if(VenueState.loaded){
      if (!ShowState.loaded){
        CurrentUserState.user.is_artist ? getShowsByUser() : getShows()
      }
    }
  },[VenueState, ShowState])

  if(ShowState.loaded && VenueState.loaded) {
    venueById = VenueState.venues.filter(venue => venue._id === id)
    venueShows = ShowState.shows.filter(show => show.venue._id === id)
    // if(CurrentUserState.user.is_artist){
    //   venueShows = ShowState.hows.filter(show => show.artists.includes(CurrentUserState.user._id))
    // } else {
      
    // }
  }

  return(
    <>
    {console.log("in return",venueById)}
      <NavBar/>
      <Container bg='dark' fluid>
        { venueById === null ? 
        <Loading/>
        :
        <>
        <VenueAccordion venues={venueById} />
        <p>MAP HERE IF HAVE TIME</p>
          {venueShows === null ? 
          <Loading/>
          :
          <ShowAccordionFrame shows={venueShows} showOptions={{
            withTitle: true,
            withTime: true,
            withArtists: true,
            withVenue: false,
            withEndTime: true,
            withDescrip: true,
            withDeleteEdit: false,
            withAllShowsLink: true
          }}/>
          }
        </>
        }
      </Container>
    </>
  )

}

export default DisplayVenue