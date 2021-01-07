import { useContext } from 'react';
//Bootstrap
import { Button, Form, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
//Formik & Yup
import { Formik, Form as BaseForm } from 'formik';
import { object, string } from 'yup';
//Components
import NavBar from '../layout/NavBar';
//Global State
import { CurrentUserContext } from '../../store/currentUser';
import { CompanyContext } from '../../store/company'
import { useHistory } from 'react-router';

const RegisterArtist = () => {

  const history = useHistory()

  const { state, createArtist } = useContext(CurrentUserContext);
  const { dispatch } = useContext(CompanyContext)

  const validationSchema = object({
    email: string().required('An email is required'),
    password: string().required('A password is required'),
    accname: string().required('A username is required'),
  });
  return (
    <>
      <NavBar />
      <Container>
        <Formik
          initialValues={{
            email: '',
            password: '',
            accname: '',
            contact: '',
            link: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            createArtist(values, dispatch);
            history.push('/artists')
          }}
        >
          {({ getFieldProps, errors, touched }) => (
            <BaseForm className='login-form'>
              <div className='d-flex'>
                <h4>Create New Artist</h4>
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
                />
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
                <Form.Label>Password</Form.Label>
                <Form.Control
                  {...getFieldProps('password')}
                  placeholder='Enter password'
                  isInvalid={touched.password && !!errors.password}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant='primary' size='lg' type='submit' block>
                Create Artist
              </Button>
            </BaseForm>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default RegisterArtist;
