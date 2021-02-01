import React, { useState, useContext } from 'react';
import moment from 'moment'
//Bootstrap
import { Button, Modal, Form } from 'react-bootstrap';
//Formik & Yup
import { Formik, Form as BaseForm, Field, getIn } from 'formik';
import { object, string, array, date, ref } from 'yup';
//Context
import { ShowContext } from '../../store/show';
import { CompanyContext } from '../../store/company';
//Components
import DateTimePicker from 'react-datetime-picker';

function ShowEditModal({ showObject }) {

  const [show, setShow] = useState(false);

  const { dispatch: showDispatch, updateShow } = useContext(ShowContext);
  const { state: companyState } = useContext(CompanyContext)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const ErrorMessage = ({ name }) => (
    <Field
      name={name}
      render={({ form }) => {
        const error = getIn(form.errors, name);
        const touch = getIn(form.touched, name);
        return touch && error ? error : null;
      }}
    />
  );

  const validationSchema = object({
    showName: string().required('A show name is required'),
    eventStart: date().required('An event must have a start date'),
    eventEnd: date()
      .min(ref('eventStart'), 'End date must be after start date')
      .required('An end date is required'),
    venue: string().required('A venue is required'),
    artists: array().min(1, 'you must select at least one artist'),
  });

  let artistArray;
  if (companyState.currentCompany != null) {
    artistArray = companyState.currentCompany.users
      .filter((user) => user.is_artist)
      .map((artist) => artist.accname);
  }

  return (
    <>
      <Button variant='info' type='submit' size='sm' onClick={handleShow}>
        Edit
      </Button>{' '}
      <Modal
        show={show}
        onHide={handleClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Show</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              _id: showObject._id,
              eventEnd: moment(showObject.eventEnd).toDate(),
              eventStart: moment(showObject.eventStart).toDate(),
              showName: showObject.showName,
              venue: showObject.venue.name,
              artists: showObject.artists.map((artist) => artist.accname),
              descrip: showObject.descrip,
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              showDispatch({
                type: 'clearShows'
              })
              updateShow(values, companyState.currentCompany)
              setShow(false)
            }}
          >
            {({
              getFieldProps,
              errors,
              touched,
              values,
              setFieldValue,
              setFieldTouched,
            }) => (
              <BaseForm className='standard-form'>
                <Form.Group controlId='showName'>
                  <Form.Label>Show Name</Form.Label>
                  <Form.Control
                    {...getFieldProps('showName')}
                    isInvalid={touched.showName && !!errors.showName}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.showName}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId='descrip'>
                  <Form.Label>Show Description</Form.Label>
                  <Form.Control
                    {...getFieldProps('descrip')}
                    isInvalid={touched.descrip && !!errors.descrip}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.descrip}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId='venue'>
                  <Form.Label>Venue</Form.Label>
                  <Form.Control 
                    as='select' 
                    className="bg-primary text-white"
                    {...getFieldProps('venue')}>
                    {companyState.currentCompany.venues.map((venue) => (
                      <option value={venue.name} label={venue.name} className="text-white" />
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Label>Artists</Form.Label>
                <Form.Group controlId='artists'>
                  {artistArray.map((artist) => {
                    return (
                      <Form.Label>
                        {values.artists.includes(artist) ? (
                          <Field
                            type='checkbox'
                            name='artists'
                            value={`${artist}`}
                            checked
                          />
                        ) : (
                          <Field
                            type='checkbox'
                            name='artists'
                            value={`${artist}`}
                          />
                        )}
                        {artist}
                      </Form.Label>
                    );
                  })}
                  {!!errors.artists && errors.artists}
                </Form.Group>

                <h5>Start Date</h5>
                
                <DateTimePicker
                  className="form-control bg-light text-dark"
                  value={values.eventStart}
                  onChange={(e) => {
                    setFieldValue(`eventStart`, e);
                    setFieldValue(`eventEnd`, new Date(moment(e).add(1, 'hours')));
                    setFieldTouched(`eventStart`, true);
                  }}
                  disableClock={true}
                />
                <ErrorMessage name={`values.eventStart`} />

                <h5>End Date</h5>
                <DateTimePicker
                  value={
                    values.eventStart > values.eventEnd
                      ? values.eventStart
                      : values.eventEnd
                  }
                  onChange={(e) => {
                    setFieldValue(`eventEnd`, e);
                    setFieldTouched(`eventEnd`, true);
                  }}
                  className="form-control bg-light text-dark"
                  disableClock={true}
                />
                <ErrorMessage name={`eventEnd`} />

                <Button variant='primary' size='lg' type='submit' block>
                  Update Show
                </Button>
                <br />
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

export default ShowEditModal;
