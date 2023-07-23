
import { Button } from 'antd';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import http from "../../../../http-common";
import moment from 'moment';

const Edit = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const userID = location.pathname.split("/")[location.pathname.split("/").length - 1]; // chia url thành mảng ngăn cách bằng dấu '/' và lấy phẩnf tử cuối cùng

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData(); 
  }, []);

  const fetchData = async () => {
    try {
      const response = await http.get(`/users/${userID}`);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    console.log(values)
    delete values.id;
    try {
      const response = await http.put(`/users/${userID}`, {...values, dob: moment(values.dob).format("yyyy-MM-DDT00:00:00")});
      if (!response == 200) {
        throw new Error('Failed to update data');
      }
      console.log('Data updated successfully');
    } catch (error) {
      console.error('Error updating data:', error);
    }
    navigate('../');
  };

  if (isLoading) {
    return <div>Loading data...</div>;
  }


  return (
    <Formik
      initialValues={data}
      validationSchema={Yup.object().shape({
        fullname: Yup.string().required('Name is required'),
        username: Yup.string().required('Username is required'),
        gender: Yup.string().required('Gender is required'),
        dob: Yup.string().required('Date of Birth is required'),
        phone_number: Yup.string().required('Phone number is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        address: Yup.string().required('Address is required'),
      })}
      onSubmit={handleSubmit}
    >
      <Form className='border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'>
        <div>
          <label htmlFor="fullname">Full Name:</label>
          <Field
            type="text"
            id="fullname"
            name="fullname"
            className='border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
          <ErrorMessage name="fullname" className="text-danger" component="div" />
        </div>
        <div>
          <label htmlFor="username">User Name:</label>
          <Field
            type="text"
            id="username"
            name="username"
            className='border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
          <ErrorMessage name="username" className="text-danger" component="div" />
        </div>
        <div>
          <label htmlFor="gender">Gender:</label>
          <Field
            as="select"
            id="gender"
            name="gender"
            className='border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          >
            <option value="">Select</option>
            <option value="0">Nam</option>
            <option value="1">Nữ</option>
          </Field>
          <ErrorMessage name="gender" className="text-danger" component="div" />
        </div>
        <div>
          <label htmlFor="dob">Date of Birth:</label>
          <Field
            type="date"
            id="dob"
            name="dob"
            className='border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
          <ErrorMessage name="dob" className="text-danger" component="div" />
        </div>
        <div>
          <label htmlFor="phone_number">Phone Number:</label>
          <Field
            type="text"
            id="phone_number"
            name="phone_number"
            className='border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
          <ErrorMessage name="phone_number"className="text-danger" component="div" />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <Field
            type="email"
            id="email"
            name="email"
            className='border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
          <ErrorMessage name="email" className="text-danger" component="div" />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <Field
            type="text"
            id="address"
            name="address"
            className='border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
          <ErrorMessage name="address" className="text-danger" component="div" />
        </div>
        <br />
        <br />
        <Button type="primary" htmlType="submit" className='bg-primary'>Update</Button>
      </Form>
    </Formik>
  );
};

export default Edit;
