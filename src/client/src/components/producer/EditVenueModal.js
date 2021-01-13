import React, { useState, useContext } from 'react';
//Bootstrap
import { Button, Modal, Form } from 'react-bootstrap';
import { ImPencil } from 'react-icons/im';
import 'bootstrap/dist/css/bootstrap.min.css';
//Formik & Yup
import { Formik, Form as BaseForm } from 'formik';
import { object, string, number } from 'yup';
//Context
import { VenueContext } from '../../store/venue';

function EditVenueModal({ venue }) {
  const [show, setShow] = useState(false);

  const { dispatch: venueDispatch, updateVenue } = useContext(VenueContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const validationSchema = object({
    name: string().required('A venue name is required'),
    capacity: number('Must be a number'),
  });

  return (
    <>
      <Button
        type='submit'
        onClick={handleShow}
        size='sm'
        className='mb-2 ml-auto'
      >
        <ImPencil />
      </Button>{' '}
      <Modal
        show={show}
        onHide={handleClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Venue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              name: venue.name,
              address: venue.address || '',
              contactEmail: venue.contactEmail || '',
              contactPhone: venue.contactPhone || '',
              capacity: venue.capacity || '',
              details: venue.details || '',
              website: venue.website || '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              venueDispatch({ type: 'clearVenues' });
              updateVenue(values, venue);
              handleClose();
            }}
          >
            {({ getFieldProps, errors, touched }) => (
              <BaseForm className='standard-form'>
                <Form.Group controlId='name'>
                  <Form.Label>Venue Name</Form.Label>
                  <Form.Control
                    {...getFieldProps('name')}
                    isInvalid={touched.name && !!errors.name}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId='address'>
                  <Form.Label>Address</Form.Label>
                  <Form.Control {...getFieldProps('address')} />
                </Form.Group>

                <Form.Group controlId='contactEmail'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control {...getFieldProps('contactEmail')} />
                </Form.Group>

                <Form.Group controlId='contactPhone'>
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control {...getFieldProps('contactPhone')} />
                </Form.Group>

                <Form.Group controlId='capacity'>
                  <Form.Label>Capacity</Form.Label>
                  <Form.Control
                    {...getFieldProps('capacity')}
                    isInvalid={touched.capacity && !!errors.capacity}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.capacity}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId='details'>
                  <Form.Label>details / description</Form.Label>
                  <Form.Control {...getFieldProps('details')} />
                </Form.Group>

                <Form.Group controlId='website'>
                  <Form.Label>Website Link</Form.Label>
                  <Form.Control {...getFieldProps('website')} />
                </Form.Group>

                <Button variant='primary' size='lg' type='submit' block>
                  Update Venue
                </Button>
              </BaseForm>
            )}
          </Formik>
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

export default EditVenueModal;
