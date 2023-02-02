import React, { useState } from 'react';

import axios from 'axios';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import SuccessMessage from './SuccessMessage';

interface FormValues {
  email: string;
}

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required(''),
});

const SignUpForm = () => {
  const [isSent, setIsSent] = useState(false);

  const submitForm = async (
    values: FormValues,
    formik: FormikHelpers<FormValues>
  ) => {
    console.log(values);
    const { email } = values;
    try {
      const payload = {
        email_address: email,
      };

      await axios.post('/.netlify/functions/add-email-subscriber', payload);
      setIsSent(true);
      formik.resetForm();
    } catch (error: any) {
      alert(error.message);
    }
  };

  if (isSent) {
    return <SuccessMessage />;
  }

  return (
    <>
      <div className="text-center align-middle">
        <Formik
          initialValues={{ email: '' }}
          validationSchema={SignupSchema}
          onSubmit={submitForm}
        >
          {(formik) => (
            <Form
              data-netlify-recaptcha="true"
              data-netlify="true"
              className="h-screen align-middle text-center"
            >
              <Field
                name="email"
                placeholder="Your email address"
                label="Email"
                className="bg-white border border-gray-300 text-gray-900 w-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block m-auto w-4/5 p-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <ErrorMessage name="email" className="error" />
              <button
                disabled={!formik.isValid || !formik.dirty}
                type="submit"
                className="text-white bg-primary-100 p-6 rounded-xl text-xl m-10 bold hover: opacity0.9"
              >
                Subscribe
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default SignUpForm;