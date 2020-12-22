import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignUp = () => {
  return (
    <Form className='login-form'>
      <div className='d-flex'>
        <h4>Create Producer Account</h4>
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
};

export default SignUp;
