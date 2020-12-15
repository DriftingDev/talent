import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import WelcomeModal from '../components/WelcomeModal';

function LoginForm() {
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

export default LoginForm;
