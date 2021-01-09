import React from 'react';
//Bootstrap
import { Button, Modal, Alert } from 'react-bootstrap';


function PasswordModal({ password, email, modalState, handleClose }) {

  return (
    <>
      <Modal
        show={modalState}
        onHide={handleClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Important!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>These are the login details for this new account:</p>
          <br/>
          <Alert variant="info">
            <p>Email: {email}</p>
            <hr/>
            <p>Password: {password}</p>
          </Alert>
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

export default PasswordModal;
