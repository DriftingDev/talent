import React, { useState, useContext } from 'react';
//Bootstrap
import { Button, Modal } from 'react-bootstrap';


function ErrorModal({ errorMessage, modalState, handleClose }) {

  return (
    <>
      <Modal
        show={modalState}
        onHide={handleClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Nope!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage}
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

export default ErrorModal;
