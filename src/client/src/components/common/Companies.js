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
import Loading from '../layout/Loading';
//Global State
import { CompanyContext } from '../../store/company';
import { CurrentUserContext } from '../../store/currentUser';
import { ShowContext } from '../../store/show';
import { VenueContext } from '../../store/venue';

const Companies = () => {
  const history = useHistory();

  const {
    state: companyState,
    createCompany,
    getAllCompanies,
    dispatch: companyDispatch,
  } = useContext(CompanyContext);
  const { state: CurrentUserState } = useContext(CurrentUserContext);
  const { state: ShowState, dispatch: showDispatch } = useContext(ShowContext);
  const { state: VenueState, dispatch: venueDispatch } = useContext(
    VenueContext
  );

  useEffect(() => {
  }, [companyState, ShowState, VenueState, CurrentUserState]);
  
  if (companyState.loaded) {
    if (
      companyState.companies.length === 1 &&
      !localStorage.getItem('currentCompany')
    ) {
      localStorage.setItem('currentCompany', companyState.companies[0]._id);
      CurrentUserState.user.is_artist
        ? history.push('/shows')
        : history.push('/calendar');
    }
  }
  if (companyState.companies === null) {
    getAllCompanies();
  }
  if (ShowState.loaded) {
    showDispatch({
      type: 'clearShows',
    });
  }
  if (VenueState.loaded) {
    venueDispatch({
      type: 'clearVenues',
    });
  }

  const validationSchema = object({
    company: string().required('A company is required'),
  });

  return (
    <>
      <NavBar />
      <Container
        bg='dark'
        fluid
        style={{ paddingLeft: 0, paddingRight: 0 }}
        className='justify-content-around pt-2'
      >
        {!CurrentUserState.user.is_artist && (
          <Formik
            initialValues={{
              company: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              companyDispatch({
                type: 'clearCompanies',
              });
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
                  {companyState.loaded ? <>Create Company</> : <Loading />}
                </Button>
              </BaseForm>
            )}
          </Formik>
        )}
        {companyState.loaded ? (
          companyState.companies.length > 0 ? (
            <>
              {companyState.companies.map((company,i) => (
                <CompanyItem key={i} company={company} />
              ))}
            </>
          ) : (
            <>
            {localStorage.removeItem('currentCompany')}
            <h4 className='no-records'>
              This account doesn't have any companies attached to it.
            </h4>
            </>
          )
        ) : (
          <Loading />
        )}
      </Container>
    </>
  );
};

export default Companies;
