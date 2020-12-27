import { useState,useContext, useEffect } from 'react';
//Bootstrap
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
//Formik & Yup
// import { Formik, Form as BaseForm } from 'formik';
// import { object, string } from 'yup';
//Custom Component
import WelcomeModal from './WelcomeModal';
import axios from 'axios';
import { CurrentUserContext } from '../../store/currentUser'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const {state, dispatch} = useContext(CurrentUserContext)


  const data = {
    email: email,
    password: password,
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    // TODO: Update url to be env variable `{ENV[URL]}/auth/login
    axios
      .post('http://localhost:3010/auth/login', data)
      .then(function (response) {
        console.log(response);
        // TODO: Store token locally. Need to do some reaserch into where this should be stored.
        localStorage.setItem('token', JSON.stringify(response));
        
      })
      .catch(function (error) {
        console.log(error);
        // TODO: Handle your errors appropriately. Use the error statuses to display different errors
        if (error.status === 404) {
          setError(`It's broken go somewhere else`);
        }
      });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Form className='login-form'>
      {error && <p>{error}</p>}
      <div className='d-flex'>
        <h4>Login</h4>
        <h4 className='ml-auto'>
          <WelcomeModal />
        </h4>
      </div>
      <Form.Group controlId='formBasic'>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type='email'
          placeholder='Enter email'
          value={email}
          onChange={handleEmailChange}
        />
      </Form.Group>
      <Form.Group controlId='formBasicPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Password'
          value={password}
          onChange={handlePasswordChange}
        />
      </Form.Group>
      <Button
        onClick={handleSignIn}
        variant='primary'
        size='lg'
        type='submit'
        block
      >
        Login
      </Button>
    </Form>
  );
}

export default Login;
