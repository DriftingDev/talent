import React from 'react';
import { Formik } from 'formik';

const BookForm = () => {
  return (
    <Formik 
    initialValues={{
        firstName: 'Marques',
        lastName: 'Woodson',
    }}
    onSubmit={(values) => {
        if (values.firstName && values.lastName) {
            console.log('form submission complete!!');
        }
    }}
    render={({handleChange, handleSubmit, handleBlur, values, errors}) => (
        <form>
            <input onChange={handleChange} onBlur={handleBlur} value={values.firstName} />
            <button onClick={handleSubmit}>Submit</button>
        </form>
    )}
/>
  );
};

export default BookForm;
