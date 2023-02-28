import React, { useState } from 'react';

import axios from 'axios';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import SuccessMessage from './SuccessMessage';

interface FormValues {
  email: string;
}

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('')
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
        email_address: email
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
      <Formik
        initialValues={{ email: '' }}
        validationSchema={SignupSchema}
        onSubmit={submitForm}
      >
        {(formik) => (
          <Form
            data-netlify-recaptcha="true"
            data-netlify="true"
            className="sm:flex max-w-[500px] w-full"
          >
            <Field
              name="email"
              placeholder="Your email address"
              label="Email"
              className="w-full rounded-md border-black border px-5 py-3 placeholder-gray-500 text-black"
            />
            {/*             <ErrorMessage name="email" className="text-black" />
             */}{' '}
            <button
              disabled={!formik.isValid || !formik.dirty}
              type="submit"
              className="mt-3 flex w-full min-h-[50px] items-center justify-center rounded-md border border-transparent bg-black px-5 py-3 text-base font-medium text-white sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0"
            >
              Subscribe
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SignUpForm;
