
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import http from '../../../../http-common';


const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  phoneNumber: Yup.string().required('Phone is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  address: Yup.string().required('Address is required'),
});

const Add_dt = () => {
  const navigate = useNavigate()
  // Initial form values
  const initialData = {
    name: "",
    phoneNumber: "",
    email: "",
    address: "",
  };
  const handleSubmit = async (data, { resetForm }) => {
    // Perform the API call or any other logic to add the employee
    console.log('Submitted values:', data);
    const result = await http.post(`/partner`,{...data});
    navigate('../')
    result.then((res) => console.log(res.data)).catch((err) => console.log(err.response.data))
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
          <label htmlFor="name">Name :</label>
          <Field type="text" id="name" name="name" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
          <ErrorMessage name="name" className='text-danger' component="div" />
        </div>
        <br></br>
        <div>
          <label htmlFor="phoneNumber">Phone :</label>
          <Field type="string" id="phoneNumber" name="phoneNumber" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
          <ErrorMessage name="phoneNumber" className='text-danger' component="div" />
        </div>
        <br></br>
        <div>
          <label htmlFor="address">Address :</label>
          <Field type="text" id="address" name="address" className='bg-gray-20 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
          <ErrorMessage name="address" className='text-danger' component="div" />
        </div>
        <br></br>
        <div>
          <label htmlFor="email">Email :</label>
          <Field type="email($email)" id="email" name="email" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
          <ErrorMessage name="email" className='text-danger' component="div" />
        </div>
        <br></br>
        <br></br>
        <Button type="primary" htmlType="submit" className='bg-primary'>Thêm Mới</Button>

      </Form>
    </Formik>
  );
};

export default Add_dt;

