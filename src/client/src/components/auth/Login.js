//Bootstrap
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
//Formik & Yup
// import { Formik, Form as BaseForm } from 'formik';
// import { object, string } from 'yup';
//Custom Component
import WelcomeModal from './WelcomeModal';

function Register() {
  return (
    <Form className='login-form'>
      <div className='d-flex'>
        <h4>Login</h4>
        <h4 className='ml-auto'>
          <WelcomeModal />
        </h4>
      </div>
      <Form.Group controlId='formBasicEmail'>
        <Form.Label>Email address</Form.Label>
        <Form.Control type='email' placeholder='Enter email' />
      </Form.Group>
      <Form.Group controlId='formBasicPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control type='password' placeholder='Password' />
      </Form.Group>
      <Button variant='primary' size='lg' type='submit' block>
        Login
      </Button>
    </Form>
  );
}

export default Register;
