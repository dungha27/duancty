
import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Space } from 'antd';
import { PostData } from '../../../../api';
import { useNavigate } from 'react-router-dom';


const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  partner_id: Yup.string().required('partner is required'),
  technology: Yup.string().required('technology is required'),
  phase: Yup.string().required('phase is required'),
  startDate: Yup.string().required('startdate is required'),
  endDate: Yup.string().required('enddate is required'),
});

const Add_duan = () => {
  const navigate = useNavigate()

  // Initial form values


  const initialData = {
    name: "",
    partner_id: 1,
    technology: "",
    phase: 0,
    requiredMember: 10,
    startDate: "",
    endDate: "",
  };
  const handleSubmit = async (data, { resetForm }) => {
    // Perform the API call or any other logic to add the employee
    console.log('Submitted values:', data);
    const result = await PostData(`/project`);
    // navigate('/admin/Project')
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
          <ErrorMessage name="name" component="div" className="text-danger" />
        </div>
        {/* <div>
          <label htmlFor="partner_id"> Partner :</label>
          <Field type="string" id="partner_id" name="partner_id" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
          <ErrorMessage name="partner_id" component="div" className="text-danger" />
        </div> */}
        <div>
          <label htmlFor="technology"> Technology :</label>
          <Field type="string" id="technology" name="technology" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
          <ErrorMessage name="technology" component="div"className="text-danger" />
        </div>
        {/* <div>
          <label htmlFor="phase"> Phase :</label>
          <Field type="string" id="phase" name="phase" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
          <ErrorMessage name="phase" component="div"className="text-danger" />
        </div> */}
        <div>
        <label htmlFor="startDate">StartDate :</label>
        <Field type="date" name="startDate" id="startDate" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
        <ErrorMessage name="startDate" component="div" className="text-danger" />
        </div>
        <div>
        <label htmlFor="endDate">EndDate :</label>
        <Field type="date" name="endDate" id="endDate" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
        <ErrorMessage name="endDate" component="div"className="text-danger" />
        </div>
        <br></br>
        <br></br>
        <Button type="primary" htmlType="submit" className='bg-primary'>Thêm Mới</Button>

      </Form>
    </Formik>
  );
};

export default Add_duan;

