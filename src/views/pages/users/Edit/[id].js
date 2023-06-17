
import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Space } from 'antd';
import { GetData, PutData } from "../../../../api";
import { useLocation, useSearchParams } from "react-router-dom";
import { parseISO, format } from 'date-fns';
import { useNavigate } from 'react-router-dom';


const Edit = () => {
  const navigate = useNavigate()

  const initialData = {
    username: "",
    password: "",
    fullname: "",
    dob: "",
    role: 1,
    department: 1,
    email: "",
    phone_number: "",
    gender: 1,
    address: "",
  }; const [data, setData] = useState([])
  const location = useLocation();
  const userID = location.pathname.split("/")[location.pathname.split("/").length - 1]; // chia url thành mảng ngăn cách bằng dấu '/' và lấy phẩnf tử cuối cùng

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await GetData(`/users/${userID}`);
      console.log('object',response.data)
      setData(response.data);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const handleSubmit = async (values) => {
    const { date } = values;
    const dateString = "2023-06-05";
    const parsedDate = new Date(dateString);
    const formattedDate = format(parsedDate, 'yyyy-MM-dd');
    // Gửi giá trị formattedDate đi hoặc thực hiện các thao tác khác
    console.log(formattedDate);
    try {
      const response = await PutData(`/users/${userID}`, values)
      if (!response.ok) {
        throw new Error('Failed to update data');
      }
      console.log('Data updated successfully');
    } catch (error) {
      console.error('Error updating data:', error);

    }
    navigate('/admin/products')

  };



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
  return (
    <Formik
      initialValues={initialData}
      // validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700'>
        <div>
          <label htmlFor="fullname">Full Name :</label>
          <Field type="text" id="fullname" name="fullname" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
          <ErrorMessage name="fullname" component="div" />
        </div>
        <div>
          <label htmlFor="username">User Name :</label>
          <Field type="string" id="username" name="username" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
          <ErrorMessage name="username" component="div" />
        </div>
        <div>
          <label htmlFor="password">Passeword:</label>
          <Field type="string" id="password" name="password" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
          <ErrorMessage name="password" component="div" />
        </div>
        <div>
          <label htmlFor="gender">Gender :</label>
          <Field as="select" id="gender" name="gender" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
            <option value="">Select</option>
            <option value="0">Nam</option>
            <option value="1">Nữ</option>
          </Field>
          <ErrorMessage name="gender" component="div" />
        </div>
        {/* <div>
          <label htmlFor="DOB">DOB</label>
          <Field type="date"   name="DOB" id="DOB"className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
          <ErrorMessage name="DOB" component="div" />
        </div> */}
        <br></br>
        <div>
          <label htmlFor="dob">DOB :</label>
          <Field name="dob" >
            {({ field }) => (
              <input
                type="date"className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="dob"
                {...field}
                onChange={(event) => {
                  const selectedDate = event.target.value;
                  field.onChange({
                    target: {
                      name: field.name,
                      value: format(new Date(selectedDate), 'yyyy-MM-dd'),
                    },
                  });
                }}
              />
            )}
          </Field>
          <ErrorMessage name="dob" component="div" />
        </div>
        <div>
          <label htmlFor="phone_number">Phone :</label>
          <Field type="string" id="phone_number" name="phone_number" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
          <ErrorMessage name="phone_number" component="div" />
        </div>

        <div>
          <label htmlFor="email">Email :</label>
          <Field type="email($email)" id="email" name="email" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
          <ErrorMessage name="email" component="div" />
        </div>

        {/* <div>
          <label htmlFor="address">Address :</label>
          <Field type="text" id="address" name="address" className='bg-gray-20 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
          <ErrorMessage name="address" component="div" />
        </div> */}
        <br></br>
        <br></br>
        <Button type="primary" htmlType="submit" className='bg-primary'>Sửa Mới</Button>

      </Form>
    </Formik>
  );
};

export default Edit;
