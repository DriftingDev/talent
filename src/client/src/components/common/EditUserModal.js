import React, { useState, useContext } from 'react';
//Bootstrap
import { Button, Modal, Form} from 'react-bootstrap';
//Formik & Yup
import { Formik, Form as BaseForm } from 'formik';
import { object, string, number } from 'yup';
//Context
import { UsersContext } from '../../store/user';
import { CompanyContext } from '../../store/company';

function EditUserModal({ user }) {
  const [show, setShow] = useState(false);

  const { updateUser } = useContext(UsersContext);
  const { dispatch: companyDispatch } = useContext(CompanyContext)
 

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const validationSchema = object({
    email: string().required('An email is required'),
    accname: string().required('A username is required'),
    contact: number().typeError("Must be a number")
  });

  return (
    <>
      <Button
        type='submit'
        onClick={handleShow}
        className="float-right"
      >
        Edit Account
      </Button>{' '}
      <Modal
        show={show}
        onHide={handleClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Formik
          initialValues={{
            email: user.email || '',
            password: '',
            accname: user.accname || '',
            contact: user.contact || '',
            link: user.link || '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            if(values.password === ''){
              delete values.password
            }
            companyDispatch({type: 'clearCurrentCompany'})
            updateUser(values, companyDispatch);
            handleClose()
          }}
        >
          {({ getFieldProps, errors, touched }) => (
            <BaseForm className='login-form'>
              <div className='d-flex'>
                <h4>Edit Account Details</h4>
              </div>
              <Form.Group controlId='username'>
                <Form.Label>Artist Name</Form.Label>
                <Form.Control
                  {...getFieldProps('accname')}
                  placeholder='Enter username'
                  isInvalid={touched.accname && !!errors.accname}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.accname}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId='contact'>
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  {...getFieldProps('contact')}
                  placeholder='Enter Artist Phone Number'
                  isInvalid={touched.contact && !!errors.contact}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.contact}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId='email'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  {...getFieldProps('email')}
                  placeholder='Enter email'
                  isInvalid={touched.email && !!errors.email}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId='link'>
                <Form.Label>Fringe Link</Form.Label>
                <Form.Control
                  {...getFieldProps('link')}
                  placeholder='Enter link'
                />
              </Form.Group>
              <Form.Group controlId='password'>
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  {...getFieldProps('password')}
                  placeholder='Enter New password'
                />
              </Form.Group>
              <Button variant='primary' size='lg' type='submit' block>
                Update User
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

export default EditUserModal