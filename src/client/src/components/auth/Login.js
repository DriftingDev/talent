import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router'
//Bootstrap
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
import {Alert, Form, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
//Formik & Yup
import { Formik, Form as BaseForm } from 'formik';
import { object, string } from 'yup';
//Custom Component
import WelcomeModal from './WelcomeModal';
import { CurrentUserContext } from '../../store/currentUser'

function Login() {

  const history = useHistory()

  const {state: currentUserState, loginUser} = useContext(CurrentUserContext)

  useEffect(() => {
    if (currentUserState.user != null) {
      if (currentUserState.user.is_artist) {
        history.push('/artist/companies')
      } else {
        history.push('/producer/companies')
      }
    }
  },[currentUserState])

  const validationSchema = object({
    email: string().required("An email is required"),
    password: string().required("A password is required"),
  })

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        rememberMe: false
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        loginUser(values)
    }}
    >
      {({getFieldProps, errors, touched}) => (

      <BaseForm className='login-form'>
        <div className='d-flex'>
          <h4>Login</h4>
          <h4 className='ml-auto'>
            <WelcomeModal />
          </h4>
        </div>
        {currentUserState.signInError &&
        <Alert variant='danger'>
          Sign in details incorrect, try again.
        </Alert>}
        <Form.Group controlId='email'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            {...getFieldProps("email")}
            placeholder='Enter email'
            isInvalid={
              touched.email && 
              !!errors.email
            }
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
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
        <Form.Group controlId='rememberMe'>
          <Form.Label>Remember Me</Form.Label>
          <Form.Control
            type='checkbox'
            {...getFieldProps("rememberMe")}
          />
        </Form.Group>
        <Button
          variant='primary'
          size='lg'
          type='submit'
          block
        >
          Login
        </Button>
      </BaseForm>
      )}
    </Formik>
  );
}

export default Login;
