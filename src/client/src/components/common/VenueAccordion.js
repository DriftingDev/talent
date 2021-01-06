import { useContext, useEffect } from "react"
import { Accordion, Card, Button } from "react-bootstrap"
import { useHistory } from "react-router"
import { CurrentUserContext } from "../../store/currentUser"
import { ShowContext } from "../../store/show"
import { VenueContext } from "../../store/venue"
import DeleteModal from '../common/DeleteModal'
import EditVenueModal from '../producer/EditVenueModal'


const VenueAccordion = ({venues}) => {

  const history = useHistory()

  const { deleteVenue } = useContext(VenueContext)
  const { state: CurrentUserState } = useContext(CurrentUserContext)
  const { state: ShowState, getShows } = useContext(ShowContext)

  useEffect(() => {
    if(ShowState.shows === null && !CurrentUserState.user.is_artist){
      getShows()
    }
  },[ShowState])

  const AccordionVenues = venues.map((venue, index) => {
    let canDelete = false
    if(ShowState.loaded){
      canDelete = true
      ShowState.shows.forEach((show) => {
        if(show.venue._id === venue._id){
          canDelete = false
          return
        }
      })
    }

    return(
    <Card key={index}>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey={`${index + 1}`}>
          <div className={'d-flex justify-content-between'}>
          {venue.name}{venue.capacity && <>Capacity: {venue.capacity}</>}
          </div>
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey={`${index + 1}`}>
        <>
        <Card.Body>
          {venue.address && <p>Address: {venue.address}</p>}
          {venue.contactEmail && <p>Email: {venue.contactEmail}</p>}
          {venue.contactPhone && <p>Phone: {venue.contactPhone}</p>}
          {venue.details &&
          <>
            <hr></hr>
            <p>Details</p>
            <p>{venue.details}</p>
          </>}
        </Card.Body>
        <Card.Footer>
          <Button variant='info' onClick={()=>{history.push(`venues/${venue._id}`)}}>
            View Venue
          </Button>
          {!CurrentUserState.user.is_artist &&
          <>
            <EditVenueModal venue={venue}/>
            {(ShowState.loaded && canDelete) &&
              <DeleteModal object={venue} name={'venue'} deleteFunc={deleteVenue} />
            }
          </>
          }
        </Card.Footer>
        </>
      </Accordion.Collapse>
    </Card>
    )
  })

  return (
    <Accordion defaultActiveKey={"1"}>
      {AccordionVenues}
    </Accordion>
  )

}

export default VenueAccordion