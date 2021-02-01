import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router'
//Bootstrap
import {Form, Button, Container, Alert} from 'react-bootstrap'
//Formik & Yup
import { Formik, Form as BaseForm, Field, FieldArray, getIn } from 'formik';
import { object, string, array, date, ref, number } from 'yup';
//Custom Component
import NavBar from '../layout/NavBar';
import Loading from '../layout/Loading';
import DateTimePicker from 'react-datetime-picker'
// import "react-datetime/css/react-datetime.css";
// Context
import { CompanyContext } from '../../store/company'
import { ShowContext } from '../../store/show'
import { CurrentUserContext } from '../../store/currentUser';
import { VenueContext } from '../../store/venue';

import moment from 'moment'

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
  const { state: showState, dispatch: showDispatch, createShows, getShows } = useContext(ShowContext)
  const { state: companyState, fetchCurrentCompany } = useContext(CompanyContext)
  const { state: currentUserState } = useContext(CurrentUserContext)
  const { state: venueState, getVenuesByCompany } = useContext(VenueContext)

  // useEffect for redirect and loading of current company if not loaded
  useEffect(() => {   
  },[companyState, venueState, showState])
  
  if(!localStorage.getItem('currentCompany')){
    history.push('/companies')
  } 
  if (currentUserState.user.is_artist){
    history.push('/shows')
  }  
  if (companyState.currentCompany === null || companyState.currentCompany.venues.length < 1) {
    fetchCurrentCompany()
  }
  if (!venueState.loaded) {
    getVenuesByCompany()
  }
  if (!showState.loaded) {
    getShows()
  }

  // Formik Validation Schema
  const validationSchema = object({
    artists: array().min(1,"At lease one artist must be selected"),
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

  //Artist array for artist checkbox comparison
  let artistArray;
  if (companyState.currentCompany != null) {
    artistArray = companyState.currentCompany.users
                    .filter(user => user.is_artist)
                    .map(artist => artist.accname)
    if(artistArray.length < 1){
      history.push('/shows')
    }
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
      {(companyState.currentCompany === null || !venueState.loaded) ?
        <Loading />
        :
        <Container  bg='dark' fluid>
          <Formik
            initialValues={{
              artists: [],
              venue: venueState.venues[0].name,
              showName: '',
              descrip: '',
              showNum: 0,
              shows: []
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              showDispatch({
                type: "clearShows"
              })
              createShows(values, companyState.currentCompany)
              history.push("/shows")
          }}
          >
            {({getFieldProps, errors, touched, values, setFieldValue, setFieldTouched, setValues, handleChange, handleBlur}) => (

            <BaseForm className='login-form' onChange={(e) => {
              formChange(e,values,setValues)
            }}>
              <div className='d-flex'>
                <h4>Create Shows</h4>
              </div>
              
              <Form.Label>Artists</Form.Label>
                <Form.Group controlId='artists'>
                  {artistArray.map((artist, index) => {
                    return (
                      <div key={index}>
                      <Form.Label>
                        {values.artists.includes(artist) ?
                        <Field type='checkbox' name='artists' value={`${artist}`} checked /> 
                          :
                        <Field type='checkbox' name='artists' value={`${artist}`} /> }
                        {artist}
                      </Form.Label>
                      </div>
                      )
                    })
                  }
                {!!errors.artists && errors.artists}                    
                </Form.Group>

              <Form.Group controlId='venue'>
                  <Form.Label>Venue</Form.Label>
                    <Form.Control
                      as='select'
                      className="bg-primary text-white"
                      {...getFieldProps("venue")}
                    >
                    {venueState.venues.map(venue => <option value={venue.name} label={venue.name}/>)}
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

              <Form.Group controlId='descrip'>
                <Form.Label>Show Description</Form.Label>
                <Form.Control
                  {...getFieldProps("descrip")}
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

              {/* Dynamically rendered fields */}
              <FieldArray
                name="shows"
                render={arrayHelpers => (
                  <>
                    {values.shows.map((show,i) => (
                      <div key={i}>
                        
                        <hr></hr>
                        <Alert variant="info">Show {i + 1}</Alert>
                        <h5>Start Date</h5>
                        <DateTimePicker
                          value={values.shows[i].eventStartDate}
                          onChange={(e) => {
                              setFieldValue(`shows[${i}].eventStartDate`, e);
                              setFieldValue(`shows[${i}].eventEndDate`, new Date(moment(e).add(1, 'hours')));
                              setFieldTouched(`shows[${i}].eventStartDate`, true);
                            }}
                          className="form-control bg-light text-dark"
                          disableClock={true}
                          minDate={today}
                        />
                        <ErrorMessage name={`shows[${i}].eventStartDate`} />

                        <h5>End Date</h5>
                        <DateTimePicker
                          value={
                            values.shows[i].eventStartDate >= values.shows[i].eventEndDate ?
                            new Date(moment(values.shows[i].eventStartDate).add(1, 'hours')) : values.shows[i].eventEndDate
                          }
                          onChange={(e) => {
                              setFieldValue(`shows[${i}].eventEndDate`, e);
                              setFieldTouched(`shows[${i}].eventEndDate`, true);
                            }}
                          className="form-control bg-light text-dark"
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
                className="mt-3"
                variant='primary'
                size='lg'
                type='submit'
                block
              >
                {showState.loaded ? 
                <>Create Shows</>
                :
                <Loading />
                }
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