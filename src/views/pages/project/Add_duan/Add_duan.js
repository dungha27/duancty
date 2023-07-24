import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import http from '../../../../http-common';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  partnerId: Yup.string().required('Partner is required'),
  technology: Yup.string().required('Technology is required'),
  phase: Yup.string().required('Phase is required'),
  startDate: Yup.string().required('Startdate is required'),
  endDate: Yup.string().required('Enddate is required'),
});
const Add_duan = () => {
  const navigate = useNavigate();
  const [partnerList, setPartnerList] = useState([]);
  const initialData = {
    name: "",
    partnerId: "",
    technology: "",
    phase: "0",
    requiredMember: 10,
    startDate: "",
    endDate: "",
  };
  useEffect(() => {
    fetchPartner();
  }, []);

  const fetchPartner = async () => {
    try {
      const response = await http.get(`/partner?page=0&size`);
      setPartnerList(response.data); // Set partnerList to the fetched data
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (data, { resetForm }) => {
    try {
      console.log('Submitted values:', data);
      const result = await http.post(`/project`, { ...data });
      console.log('API Response:', result.data);
      navigate('../');
      resetForm();
    } catch (error) {
      console.log('API Error:', error.response.data);
    }
  };

  return (
    <Formik
      initialValues={initialData}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit }) => (
        <Form
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700'
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="name">Name :</label>
            <Field type="text" id="name" name="name" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
            <ErrorMessage name="name" component="div" className="text-danger" />
          </div>
          <br />
          <div>
            <label htmlFor="partnerId">Partner :</label>
            <Field as="select" id="partnerId" name="partnerId" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
              <option value="">Select a partner</option>
              {partnerList.map((partner) => (
                <option key={partner.id} value={partner.id}>
                  {partner.name}
                </option>
              ))}
            </Field>
            <ErrorMessage name="partnerId" component="div" className="text-danger" />
          </div>
          <br />
          <div>
            <label htmlFor="technology">Technology :</label>
            <Field as="select" id="technology" name="technology" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
              <option value="">Select a technology</option>
              <option value="Nodejs">Nodejs</option>
              <option value="React">React</option>
              <option value="Angular">Angular</option>
              <option value="Redux">Redux</option>
              <option value="Java">Java</option>
            </Field>
            <ErrorMessage name="technology" component="div" className="text-danger" />
          </div>
          <br />
          <br></br>
          <div>
            <label htmlFor="startDate">StartDate :</label>
            <Field type="date" name="startDate" id="startDate" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
            <ErrorMessage name="startDate" component="div" className="text-danger" />
          </div>
          <br></br>
          <div>
            <label htmlFor="endDate" >EndDate :</label>
            <Field type="date" name="endDate" id="endDate" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
            <ErrorMessage name="endDate" component="div" className="text-danger" />
          </div>
          <br></br>
          <br></br>
          <Button type="primary" htmlType="submit" className='bg-primary'>Thêm Mới</Button>        </Form>
      )}
    </Formik>
  );
};

export default Add_duan;
