import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from 'antd';
import { PostData } from '../../../../api';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object().shape({
  date: Yup.string().required('date is required'),
  expectedStart: Yup.string().required('expectedStart is required'),
  expectedEnd: Yup.string().required('expectedEnd is required'),
  lattitude: Yup.string().required('lattitude is required'),
  longtitude: Yup.string().required('longtitude is required'),
  location: Yup.string().required('location is required'),
});
const Add_working = () => {
  const navigate = useNavigate();
  // Initial form values
  const initialData = {
    date: "",
    expectedStart: "",
    expectedEnd: "",
    lattitude: "ggfd",
    longtitude: "dfgd",
    location: "dfgd",
  };
  const handleSubmit = async (data, { resetForm }) => {
    // Perform the API call or any other logic to add the employee
    console.log('Submitted values:', data);
    const result = await PostData(`/working-days`, { ...data });
    navigate('/admin/working');
    result
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.response.data));
    resetForm();
  };
  return (
    <Formik
      initialValues={initialData}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700'>
        <div>
          <label htmlFor="date">Date :</label>
          <Field 
            type="datetime-local"
            id="date"
            name="date"
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
          <ErrorMessage name="date" className='text-danger' component="div" />
        </div>
        <br></br>
        <br></br>
        <div>
          <label htmlFor="expectedStart">ExpectedStart :</label>
          <Field
            type="datetime-local"
            id="expectedStart"
            name="expectedStart"
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
          <ErrorMessage name="expectedStart" className='text-danger' component="div" />
        </div>
        <br></br>
        <br></br>
        <div>
          <label htmlFor="expectedEnd">ExpectedEnd :</label>
          <Field
            type="datetime-local"
            id="expectedEnd"
            name="expectedEnd"
            className='bg-gray-20 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
          <ErrorMessage name="expectedEnd" className='text-danger' component="div" />
        </div>
        <br></br>
        <br></br>
        <Button type="primary" htmlType="submit" className='bg-primary'>Thêm Mới</Button>
      </Form>
    </Formik>
  );
};

export default Add_working;
