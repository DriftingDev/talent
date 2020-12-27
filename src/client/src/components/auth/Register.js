import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accname, setAccname] = useState('');

  const data = {
    email: email,
    password: password,
    accname: accname,
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3010/auth/register', data)
      .then(function (response) {
        console.log(response);
        localStorage.setItem('token', JSON.stringify(response));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleEmailChange = (e) => {
    // console.log(e.target.value)
    setEmail(e.target.value);
  };

  const handleAccountChange = (e) => {
    setAccname(e.target.value);
  };

  const handlePasswordChange = (e) => {
    // console.log(e.target.value)
    setPassword(e.target.value);
  };
  return (
    <Form className='login-form'>
      <div className='d-flex'>
        <h4>Create Producer Account</h4>
      </div>
      <Form.Group controlId='formBasicEmail'>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type='email'
          placeholder='Enter email'
          onChange={handleEmailChange}
        />
      </Form.Group>
      <Form.Group controlId='formUsername'>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type='text'
          placeholder='Username'
          value={accname}
          onChange={handleAccountChange}
        />
      </Form.Group>
      <Form.Group controlId='formBasicPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Password'
          onChange={handlePasswordChange}
        />
      </Form.Group>
      <Button
        variant='primary'
        size='lg'
        type='submit'
        block
        onClick={handleSignIn}
      >
        Sign Up
      </Button>
    </Form>
  );
};

export default Register;
