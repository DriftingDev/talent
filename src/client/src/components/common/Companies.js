import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
//Bootstrap
import { Button, Form, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
//Formik & Yup
import { Formik, Form as BaseForm } from 'formik';
import { object, string } from 'yup';
//Components
import NavBar from '../layout/NavBar';
import CompanyItem from './CompanyItem';
import Loading from '../layout/Loading'
//Global State
import { CompanyContext } from '../../store/company';
import { CurrentUserContext } from '../../store/currentUser';

const Companies = () => {
  const history = useHistory();

  const { state: companyState, createCompany, getAllCompanies } = useContext(
    CompanyContext
  );
  const { state: CurrentUserState } = useContext(CurrentUserContext)

  useEffect(() => {
    if(companyState.loaded) {
      if (companyState.companies.length === 1 && !localStorage.getItem('currentCompany')){
        localStorage.setItem('currentCompany', companyState.companies[0]._id)
        CurrentUserState.user.is_artist ? history.push('/shows') : history.push('/calendar')
      }
    }

    if (companyState.companies === null) {
      getAllCompanies();
    }
  }, [companyState]);

  const validationSchema = object({
    company: string().required('A company is required'),
  });

  return (
    <>
      <NavBar />
      {companyState.loaded ?
      <Container
        bg='dark'
        fluid
        style={{ paddingLeft: 0, paddingRight: 0 }}
        className='justify-content-around pt-2'
      >
      {!CurrentUserState.user.is_artist &&
        <Formik
          initialValues={{
            company: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            createCompany(values);
          }}
        >
          {({ getFieldProps, errors, touched }) => (
            <BaseForm className='standard-form text-center'>
              <h4 className='text-center'>Create Company</h4>
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
              <Button variant='outline-light' size='lg' type='submit' block>
                Create Company
              </Button>
            </BaseForm>
          )}
        </Formik>
      }
        {companyState.companies.length > 0 ?
        <>
          {companyState.companies.map((company) => (
            <CompanyItem company={company} />
          ))}
        </>
        :
        <h2>This account doesn't have any companies attached to it</h2>
      }
      </Container>
      :
      <Loading />
      }
    </>
  );
};

export default Companies;
