import React, { useState } from 'react';
//Bootstrap
import { Button, Modal } from 'react-bootstrap';
import { MdDeleteForever } from 'react-icons/md';

function DeleteModal({ object, name, deleteFunc, dispatch }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteObject = () => {
    deleteFunc(object._id);
    setShow(false);
  };

  return (
    <>
      <Button
        variant='danger'
        type='submit'
        size='sm'
        onClick={handleShow}
        className='mb-2 ml-auto'
      >
        <MdDeleteForever />
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
          <Button
            variant='success'
            onClick={() => {
              deleteObject();
              dispatch();
            }}
          >
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
