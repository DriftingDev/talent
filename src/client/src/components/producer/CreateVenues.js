import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router'
//Bootstrap
import {Form, Button, Container, Alert} from 'react-bootstrap'
//Formik & Yup
import { Formik, Form as BaseForm, Field, FieldArray, getIn } from 'formik';
import { object, string, array, number } from 'yup';
//Custom Component
import NavBar from '../layout/NavBar';
import Loading from '../layout/Loading';
// Context
import { CompanyContext } from '../../store/company'
import { CurrentUserContext } from '../../store/currentUser';
import { VenueContext } from '../../store/venue';

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

const CreateVenues = () => {

  // History and context setup
  const history = useHistory()
  const { state: venueState, dispatch: venueDispatch, createVenues, getVenuesByCompany } = useContext(VenueContext)
  const { state: companyState, fetchCurrentCompany } = useContext(CompanyContext)
  const { state: currentUserState } = useContext(CurrentUserContext)

  // useEffect for redirect and loading of current company if not loaded
  useEffect(() => {   
    if(!localStorage.getItem('currentCompany')){
      history.push('/companies')
    } 
    if (currentUserState.user.is_artist){
      history.push('/venues')
    }  
    if (companyState.currentCompany === null) {
      fetchCurrentCompany()
    }
    if (!venueState.loaded){
      getVenuesByCompany()
    }
  },[companyState])

  // Formik Validation Schema
  const validationSchema = object({
    venueNum: number()
              .positive('You must add at least one venue')
              .typeError('Must be a number')
              .required('You must add at least one venue'),
    venues: array().of(
      object().shape({
        name: string().required('A venue name is required'),
        capacity: number("Must be a number")
      })
    )
  })

  // form change handler that changes how many fields are dynamically rendered
  const formChange = (event, values, setValues) => {
    if(event.target.id === 'venueNum'){
      values.venues = []
      values.venueNum = event.target.value
      const spreadArray = [...Array(Number(event.target.value) || 0)].map((_, i) => i)
      spreadArray.forEach((e, i , a) => {
        values.venues[e] = {
          company: "",
          name: "",
          address: "",
          contactEmail: "",
          contactPhone: "",
          capacity: "",
          details: "",
          website: "",
        }
      })
      setValues(values)
    }
  }
  

  return(
    <>
    <NavBar/>
    {companyState.currentCompany === null ?
    <Loading />
    :
    <Container bg='dark' fluid>
      <Formik
        initialValues={{
          venueNum: 0,
          venues: []
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          venueDispatch({
            type: "clearVenues"
          })
          createVenues(values)
          history.push("/venues")
      }}
      >
      {({getFieldProps, errors, touched, values, setFieldValue, setFieldTouched, setValues, handleChange, handleBlur}) => (
        <BaseForm className='login-form' onChange={(e) => {
          formChange(e,values,setValues)
        }}>
        <div className='d-flex'>
          <h4>Create Venues</h4>
        </div>

        <Form.Group controlId="venueNum">
          <Form.Label>No. of Venues to add</Form.Label>
          <Form.Control
            {...getFieldProps("venueNum")}
            isInvalid={
              touched.venueNum && 
              !!errors.venueNum
            }
          />
          <Form.Control.Feedback type="invalid">
            {errors.venueNum}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Dynamically rendered fields */}
        <FieldArray
          name="venues"
          render={arrayHelpers => (
            <>
              {values.venues.map((venue,i) => {
                values.venues[i].company = companyState.currentCompany._id
                return (
                  <div key={i}>
                    <Alert variant='primary'></Alert>
                    <Form.Group controlId={`venues[${i}].name`}>
                      <Form.Label>Venue Name</Form.Label>
                      <Form.Control
                        {...getFieldProps(`venues[${i}].name`)}
                      />
                      <ErrorMessage name={`venues[${i}].name`}/>
                    </Form.Group>

                    <Form.Group controlId={`venues[${i}].address`}>
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        {...getFieldProps(`venues[${i}].address`)}
                      />
                    </Form.Group>

                    <Form.Group controlId={`venues[${i}].contactEmail`}>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        {...getFieldProps(`venues[${i}].contactEmail`)}
                      />
                    </Form.Group>

                    <Form.Group controlId={`venues[${i}].contactPhone`}>
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        {...getFieldProps(`venues[${i}].contactPhone`)}
                      />
                    </Form.Group>

                    <Form.Group controlId={`venues[${i}].capacity`}>
                      <Form.Label>Capacity</Form.Label>
                      <Form.Control
                        {...getFieldProps(`venues[${i}].capacity`)}
                      />
                      <ErrorMessage name={`venues[${i}].capacity`}/>
                    </Form.Group>

                    <Form.Group controlId={`venues[${i}].details`}>
                      <Form.Label>details / description</Form.Label>
                      <Form.Control
                        {...getFieldProps(`venues[${i}].details`)}
                      />
                    </Form.Group>

                    <Form.Group controlId={`venues[${i}].website`}>
                      <Form.Label>Website Link</Form.Label>
                      <Form.Control
                        {...getFieldProps(`venues[${i}].website`)}
                      />
                    </Form.Group>
                  </div>
                )
              })}
            </>
          )}
          >
          </FieldArray>
          <Button variant='primary' size='lg' type='submit' block>
            {venueState.loaded ? 
            <>Create Venues</>
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

export default CreateVenues