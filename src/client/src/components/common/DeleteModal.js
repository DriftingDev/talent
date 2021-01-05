import React, { useState, useContext } from 'react';
//Bootstrap
import { Button, Modal } from 'react-bootstrap';

function DeleteModal({ object, name, deleteFunc}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteObject = () => {
    deleteFunc(object._id)
    setShow(false)
  }

  return (
    <>
      <Button
        variant='danger'
        type='submit'
        onClick={handleShow}
      >
        Delete
      </Button>{' '}
      <Modal
        show={show}
        onHide={handleClose}
        // aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>WARNING</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>Are you sure you want to delete this {name}</h3>
          <hr></hr>
          <Button variant='success' onClick={deleteObject}>
            Yes
          </Button>
          <Button variant='danger' onClick={handleClose}>
            Noooo!!!
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteModal;
