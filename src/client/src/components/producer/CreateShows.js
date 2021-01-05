import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router'
//Bootstrap
import {Form, Button, Container} from 'react-bootstrap'
//Formik & Yup
import { Formik, Form as BaseForm, Field, FieldArray, getIn } from 'formik';
import { object, string, array, date, ref, number } from 'yup';
//Custom Component
import NavBar from '../layout/NavBar';
import Loading from '../layout/Loading';
//import DatePicker from 'react-datepicker'
import DateTimePicker from 'react-datetime-picker'
import "react-datepicker/dist/react-datepicker.css";
// Context
import { CompanyContext } from '../../store/company'
import { ShowContext } from '../../store/show'
import { CurrentUserContext } from '../../store/currentUser';

const ErrorMessage = ({ name }) => (
  <Field
    name={name}
    render={({ form }) => {
      const error = getIn(form.errors, name);
      const touch = getIn(form.touched, name);
      return touch && error ? error : null;
    }}

  />
);

const CreateShows = () => {

  // History and context setup
  const history = useHistory()
  const { createShows } = useContext(ShowContext)
  const { state: companyState, fetchCurrentCompany } = useContext(CompanyContext)
  const { state: currentUserState } = useContext(CurrentUserContext)

  // useEffect for redirect and loading of current company if not loaded
  useEffect(() => {   
    if(!localStorage.getItem('currentCompany')){
      history.push('/companies')
    } 
    if (currentUserState.user.is_artist){
      history.push('/shows')
    }  
    if (companyState.currentCompany === null) {
      fetchCurrentCompany()
    }
  },[companyState])

  // Formik Validation Schema
  const validationSchema = object({
    showName: string().required("A show name is required"),
    showNum: number()
              .positive('You must add at least one show')
              .typeError('Must be a number')
              .required('You must add at least one show'),
              
    shows: array().of(
      object().shape({
        eventStartDate: date().required("An event must have a start date"),
        eventEndDate: date().min(
          ref('eventStartDate'),"End date must be after start date"
        ).required('An end date is required')
      })
      )
  })

  // Creating the artist names and venue arrays for the formik form
  let formikArtistNames
  let formikVenueNames

  if(companyState.currentCompany != null){
    formikArtistNames = companyState.currentCompany.users
      .filter(user => user.is_artist)
      .map(artist => artist.accname)
    formikVenueNames = companyState.currentCompany.venues
      .map(venue => venue.name)
  }

  // create a current date const for creating shows
  const today = new Date();

  // form change handler that changes how many fields are dynamically rendered
  const formChange = (event, values, setValues) => {
    if(event.target.id === 'showNum'){
      values.shows = []
      values.showNum = event.target.value
      const spreadArray = [...Array(Number(event.target.value) || 0)].map((_, i) => i)
      spreadArray.forEach((e, i , a) => {
        values.shows[e] = {
          eventStartDate: today,
          eventEndDate: today,
        }
      })
      setValues(values)
    }
  }

  return (
    <>
      <NavBar/>
      {companyState.currentCompany === null ?
        <Loading />
        :
        <Container  bg='dark' fluid>
          <Formik
            initialValues={{
              artist: formikArtistNames[0],
              venue: formikVenueNames[0],
              showName: '',
              showDescrip: '',
              showNum: 0,
              shows: []
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              createShows(values, companyState.currentCompany)
          }}
          >
            {({getFieldProps, errors, touched, values, setFieldValue, setFieldTouched, setValues, handleChange, handleBlur}) => (

            <BaseForm className='login-form' onChange={(e) => {
              formChange(e,values,setValues)
            }}>
              <div className='d-flex'>
                <h4>Create Shows</h4>
              </div>
              
              <Form.Group controlId='artist'>
                <Form.Label>Artist</Form.Label>
                <Form.Control
                  as='select'
                  placeholder='Select Artist'
                  {...getFieldProps("artist")}
                  >
                    {formikArtistNames.map(name => <option value={name} label={name}/>)}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId='venue'>
                <Form.Label>Venue</Form.Label>
                <Form.Control
                  as='select'
                  placeholder='Select Venue'
                  {...getFieldProps("venue")}
                >
                  {formikVenueNames.map(name => <option value={name} label={name}/>)}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="showName">
                <Form.Label>Show Name</Form.Label>
                <Form.Control
                  {...getFieldProps("showName")}
                  placeholder='Enter a name for the show'
                  isInvalid={
                    touched.showName && 
                    !!errors.showName
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {errors.showName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId='showDescrip'>
                <Form.Label>Show Description</Form.Label>
                <Form.Control
                  {...getFieldProps("showDescrip")}
                  placeholder='Enter a description for the show'
                />
              </Form.Group>

              <Form.Group controlId='showNum'>
                <Form.Label>No. of shows to add</Form.Label>
                <Form.Control
                  {...getFieldProps("showNum")}
                  isInvalid={
                    touched.showNum && 
                    !!errors.showNum
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {errors.showNum}
                </Form.Control.Feedback>
              </Form.Group>

              // Dynamically rendered fields
              <FieldArray
                name="shows"
                render={arrayHelpers => (
                  <>
                    {values.shows.map((show,i) => (
                      <div key={i}>
                        <hr></hr>
                        <h3>Show {i + 1}</h3>
                        <h5>Start Date</h5>
                        <DateTimePicker
                          value={values.shows[i].eventStartDate}
                          onChange={(e) => {
                              setFieldValue(`shows[${i}].eventStartDate`, e);
                              setFieldTouched(`shows[${i}].eventStartDate`, true);
                            }}
                          className="form-control"
                          disableClock={true}
                          minDate={today}
                        />
                        <ErrorMessage name={`shows[${i}].eventStartDate`} />

                        <h5>End Date</h5>
                        <DateTimePicker
                          value={
                            values.shows[i].eventStartDate > values.shows[i].eventEndDate ?
                            values.shows[i].eventStartDate : values.shows[i].eventEndDate
                          }
                          onChange={(e) => {
                              setFieldValue(`shows[${i}].eventEndDate`, e);
                              setFieldTouched(`shows[${i}].eventEndDate`, true);
                            }}
                          className="form-control"
                          disableClock={true}
                          minDate={today}
                        />
                        <ErrorMessage name={`shows[${i}].eventEndDate`} />
                      </div>
                    ))}
                  </>
                )}
              >
              </FieldArray>

              <Button
                variant='primary'
                size='lg'
                type='submit'
                block
              >
                Create Shows
              </Button>
            </BaseForm>
            )}
          </Formik>
        </Container>
      }
      
    </>
  )


}

export default CreateShows