import {Modal, Button} from 'react-bootstrap'
import {useHistory} from 'react-router'

const EventModal = (props) => {
  const details = props.details

  const history = useHistory()
  const artists = details.artists.map((artist, index, array) => {
    if (index + 1 === array.length ){
      return (
        <span onClick={() => {history.push(`/artist/${artist._id}`)}}>{artist.accname}</span>
        )
    } else {
      return(
        <span onClick={() => {history.push(`/artist/${artist._id}`)}}>{`${artist.accname}, `}</span>
      )
    }
  })

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        {details.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul>
          <li>Start: {details.eventStart}</li>
          <li>Finish: {details.eventEnd}</li>
          <li>Artists: {artists}</li>
          { details.venue != null &&
            <li onClick={() => {history.push(`venue/${details.venue._id}`)}}>Venue: {details.venue.name}</li>
            }
        </ul>
        <p>
          {details.descrip}
        </p>
      </Modal.Body>
      <Modal.Footer className='justify-content-between'>
        <Button onClick={() => {history.push(`/shows/${details.slug}`)}}>All show times</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EventModal
