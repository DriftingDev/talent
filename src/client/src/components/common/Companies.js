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
//Global State
import { CompanyContext } from '../../store/company';

const Companies = () => {
  const history = useHistory();

  const { state: companyState, createCompany, getAllCompanies } = useContext(
    CompanyContext
  );

  useEffect(() => {
    if (companyState.user != null) {
      history.push('/companies');
    }
    if (companyState.companies == null) {
      getAllCompanies();
    }
    // console.log(companyState);
  }, [companyState]);

  const validationSchema = object({
    company: string().required('A company is required'),
  });

  return (
    <>
      <NavBar />
      <Container bg='dark' fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
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
            <BaseForm className='standard-form'>
              <div className='d-flex'>
                <h4>Create Company</h4>
              </div>
              <Form.Group controlId='company'>
                <Form.Label>
                  Add an event company you will be working with
                </Form.Label>
                <Form.Control
                  {...getFieldProps('company')}
                  placeholder='Enter Company Name'
                  isInvalid={touched.company && !!errors.company}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.company}
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant='primary' size='lg' type='submit' block>
                Create Company
              </Button>
            </BaseForm>
          )}
        </Formik>
        {companyState.companies &&
          companyState.companies.map((company) => (
            <CompanyItem company={company} />
          ))}
      </Container>
    </>
  );
};

export default Companies;