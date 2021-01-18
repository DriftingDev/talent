import {Modal, Button} from 'react-bootstrap'
import {useHistory} from 'react-router'
import { IoMdMicrophone } from 'react-icons/io'
import { GiFamilyHouse } from 'react-icons/gi'
import { HiPencilAlt } from 'react-icons/hi'
import { BsPersonLinesFill } from 'react-icons/bs'

const EventModal = (props) => {
  const details = props.details

  const history = useHistory()
  const artists = details.artists.map((artist, index, array) => {
    return (
      <button className="btn btn-link" onClick={() => {history.push(`/artists/${artist._id}`)}}>{artist.accname}</button>
      )
    // if (index + 1 === array.length ){
      
    //   return (
    //     <button className="btn btn-link" onClick={() => {history.push(`/artists/${artist._id}`)}}>{artist.accname}</button>
    //     )
    // } else {
    //   return(
    //     <button className="btn btn-link" onClick={() => {history.push(`/artists/${artist._id}`)}}>{`${artist.accname}, `}</button>
    //   )
    // }
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
        <IoMdMicrophone/>{" "}{details.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div><span class="font-weight-bold">Start:</span> <span>{details.eventStart}</span></div>
          <div><span class="font-weight-bold">Finish:</span> {details.eventEnd}</div><br/>
          <div><p class="font-weight-bold"><BsPersonLinesFill/>{" "}Artists:</p> {artists}</div>
          {details.venue != null &&
          <div onClick={() => {history.push(`venues/${details.venue._id}`)}}><p class="font-weight-bold"><GiFamilyHouse/>{" "}Venue:</p> <button className="btn btn-link">{details.venue.name}</button></div>
          }
          <div>
            { details.descrip != null &&
             <>
             <span className='font-weight-bold pb-1'><HiPencilAlt/>{" "}Description: </span>
             <span>{details.descrip}</span>
             </>}
              
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className='justify-content-between'>
        <Button onClick={() => {history.push(`/shows/${details.slug}`)}}>All show times</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EventModal
