import {Modal, Button} from 'react-bootstrap'

const EventModal = (props) => {
  const details = props.details
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
        </ul>
        <p>
          {details.descrip}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EventModal
