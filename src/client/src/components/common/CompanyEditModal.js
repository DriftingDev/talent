import React, { useState, useContext } from 'react';
//Bootstrap
import { Button, Modal, Form } from 'react-bootstrap';

//Formik & Yup
import { Formik, Form as BaseForm } from 'formik';
import { CompanyContext } from '../../store/company';
import { object, string } from 'yup'

function CompanyEditModal({ company }) {
  const [show, setShow] = useState(false);

  const { state: companyState, updateCompany } = useContext(
    CompanyContext
  );

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const validationSchema = object({
    company: string().required('A company name is required'),
  });

  return (
    <>
      <Button
        variant='outline-secondary'
        size='sm'
        type='submit'
        onClick={handleShow}
      >
        Edit
      </Button>{' '}
      <Modal
        show={show}
        onHide={handleClose}
        // aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Company</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              company: `${company.name}`,
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              updateCompany(values, company);
            }}
          >
            {({ getFieldProps, errors, touched }) => (
              <BaseForm className='standard-form'>
                <div className='d-flex'>
                  <h4>Edit Name:</h4>
                </div>
                <Form.Group controlId='company'>
                  <Form.Control
                    {...getFieldProps('company')}
                    placeholder='Enter Company Name'
                    isInvalid={touched.company && !!errors.company}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.company}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button variant='primary' size='lg' type='submit' block>
                  Update Company Name
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

export default CompanyEditModal;
