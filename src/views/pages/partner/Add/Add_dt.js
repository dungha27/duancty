
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Space } from 'antd';
import { PostData } from '../../../../api';
import { useNavigate } from 'react-router-dom';
// import { PostData } from '../../../api';


// Schema validation using Yup
// const validationSchema = Yup.object().shape({
//   fullname: Yup.string().required('Name is required'),
//   username: Yup.string().required('UserName is required'),
//   password: Yup.string().required('password is required'),
//   gender: Yup.string().required('Gender is required'),
//   DOB: Yup.string().required('DOB is required'),
//   phone_number: Yup.string().required('Phone is required'),
//   email: Yup.string().email('Invalid email').required('Email is required'),
//   address: Yup.string().required('Address is required'),
// });

const Add_dt = () => {
//   const navigate = useNavigate()

  // Initial form values
//   const initialData = {
//     fullname: '',
//     username: '',
//     password: '',
//     gender: '',
//     DOB: '',
//     phone_number: '',
//     email: '',
//     address: '',
//     status: '1',
//     role_id: '1',
//     department_id:'1',
//   };

    
  return (
    <Formik
    //   initialValues={initialData}
    //   validationSchema={validationSchema}
    //   onSubmit={handleSubmit}
    >
      <Form className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700'>
        <div>
          <label htmlFor="fullname">Name :</label>
          <Field type="text" id="fullname" name="fullname" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
          <ErrorMessage name="fullname" component="div" />
        </div>
        <div>
          <label htmlFor="phone_number">Phone :</label>
          <Field type="string" id="phone_number" name="phone_number" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
          <ErrorMessage name="phone_number" component="div" />
        </div>
        <div>
          <label htmlFor="address">Address :</label>
          <Field type="text" id="address" name="address" className='bg-gray-20 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
          <ErrorMessage name="address" component="div" />
        </div>
        <div>
          <label htmlFor="email">Email :</label>
          <Field type="email($email)" id="email" name="email" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
          <ErrorMessage name="email" component="div" />
        </div>
        <br></br>
        <br></br>
        <Button type="primary" htmlType="submit" className='bg-primary'>Thêm Mới</Button>

      </Form>
    </Formik>
  );
};

export default Add_dt;

