import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router'
//Bootstrap
import {Button, Form, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
//Formik & Yup
import { Formik, Form as BaseForm } from 'formik';
import { object, string } from 'yup';
//Components
import NavBar from '../layout/NavBar'
//Global State
import { CurrentUserContext } from '../../store/currentUser'


const Register = () => {

  const history = useHistory()

  const {state: currentUserState, registerUser} = useContext(CurrentUserContext)

  useEffect(() => {
    if (currentUserState.user != null) {
      //history.push('/artists')
    }
  },[currentUserState, history])

  const validationSchema = object({
    email: string().required('An email is required'),
    password: string().required('A password is required'),
    accname: string().required('A username is required'),
  });

  return (
    <>
    <NavBar/>
    <Container bg='dark' fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
      <Formik
        initialValues={{
          email: '',
          password: '',
          accname: ''
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          registerUser(values);
        }}
      >
        {({ getFieldProps, errors, touched }) => (

          <BaseForm className='login-form'>
            <div className='d-flex'>
              <h4>Create Producer Account</h4>
            </div>
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
            <Form.Group controlId='username'>
            <Form.Label>Username</Form.Label>
            <Form.Control
              {...getFieldProps("accname")}
              placeholder='Enter username'
              isInvalid={
                touched.accname && 
                !!errors.accname
              }
            />
            <Form.Control.Feedback type="invalid">
              {errors.accname}
            </Form.Control.Feedback>
          </Form.Group>
            <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              {...getFieldProps("password")}
              placeholder='Enter password'
              isInvalid={
                touched.password && 
                !!errors.password
              }
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
            <Button
              variant='primary'
              size='lg'
              type='submit'
              block
            >
              Sign Up
            </Button>
          </BaseForm>
        )}
      </Formik>
    </Container>
    </>
  );
};

export default Register;
