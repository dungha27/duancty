import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Space } from 'antd';
import http from '../../../../http-common';
import { useLocation, useSearchParams } from "react-router-dom";
import { parseISO, format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const Edit = () => {
  const navigate = useNavigate();
  const initialData = {
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
  };
  const [data, setData] = useState(initialData);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const location = useLocation();
  const userID = location.pathname.split("/")[location.pathname.split("/").length - 1];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await http.get(`/partner/${userID}`);
      console.log('object', response.data);
      setData(response.data);
      setIsDataFetched(true);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const handleSubmit = async (values) => {
    try {
      const response = await http.put(`/partner/${userID}`, values);
      if (!response == 200) {
        throw new Error('Failed to update data');
      }
      console.log('Data updated successfully');
    } catch (error) {
      console.error('Error updating data:', error);
    }
    navigate('../');
  };
  return (
    <div>
      {isDataFetched ? (
        <Formik
          initialValues={data}
          validationSchema={Yup.object().shape({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email').required('Email is required'),
            phoneNumber: Yup.string().required('Phone number is required'),
            address: Yup.string().required('Address is required'),
          })}
          onSubmit={handleSubmit}
        >
          <Form className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700'>
            <div>
              <label htmlFor="name">Name :</label>
              <Field
                type="text"
                id="name"
                name="name"
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              />
              <ErrorMessage name="name"  className='text-danger' component="div" />
            </div>
            <br></br>
            <div>
              <label htmlFor="phoneNumber">Phone :</label>
              <Field
                type="string"
                id="phoneNumber"
                name="phoneNumber"
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              />
              <ErrorMessage name="phoneNumber" className='text-danger' component="div" />
            </div>
            <br></br>
            <div>
              <label htmlFor="address">Address :</label>
              <Field
                type="string"
                id="address"
                name="address"
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              />
              <ErrorMessage name="address" className='text-danger' component="div" />
            </div>
            <br></br>
            <div>
              <label htmlFor="email">Email :</label>
              <Field
                type="email"
                id="email"
                name="email"
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              />
              <ErrorMessage name="email" className='text-danger' component="div" />
            </div>
            <br></br>
            <br></br>
            <Button type="primary" htmlType="submit" className='bg-primary'>Update</Button>
          </Form>
        </Formik>
      ) : (
        <div>Loading data...</div>
      )}
    </div>
  );
};

export default Edit;
