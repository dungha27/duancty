import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Space } from 'antd';
import { useLocation, useSearchParams } from "react-router-dom";
import { parseISO, format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { CLSThresholds } from "web-vitals";
import http from '../../../../http-common';

const Edit = () => {
  const navigate = useNavigate();
  const [partnerList, setPartnerList] = useState([]);
  const initialData = {
    name: "",
    partnerId: "",
    technology: "",
    phase: 0,
    requiredMember: 0,
    startDate: "",
    endDate: "",
  };
  const [data, setData] = useState(initialData);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const location = useLocation();
  const userID = location.pathname.split("/")[location.pathname.split("/").length - 1];
 
  useEffect(() => {
    fetchData();
    fetchPartner();
  }, []);
  //list partner
  const fetchPartner = async () => {
    try {
      const response = await http.get(`/partner?page=0&size`);
      setPartnerList(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  //list project
  const fetchData = async () => {
    try {
      const response = await http.get(`/project/${userID}`);
      console.log('object', response.data);
      setData(response.data);
      setIsDataFetched(true);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };
  const handleSubmit = async (values) => {
    try {
      const formattedValues = {
        ...values,
        startDate: format(parseISO(values.startDate), 'yyyy-MM-dd'),
        endDate: format(parseISO(values.endDate), 'yyyy-MM-dd')
      };
      const response = await http.put(`/project/${userID}`, formattedValues);
      if (!response.ok) {
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
            partnerId: Yup.string().required('partnerId is required'),
            technology: Yup.string().required('Technology is required'),
            startDate: Yup.string().required('startdate number is required'),
            endDate: Yup.string().required('enddate is required'),
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
              <ErrorMessage name="name" className="text-danger" component="div" />
            </div>
            <br></br>
            <div>
              <Form >
                <div>
                  <label htmlFor="partnerId" > Partner :</label>
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
              </Form>
            </div>
            <br></br>
            <div>
              <label htmlFor="technology">Technology:</label>
              <Field
                as="select"
                id="technology"
                name="technology"
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              >
                <option value="Nodejs">Nodejs</option>
                <option value="React">React</option>
                <option value="Angular">Angular</option>
                <option value="Redux">Redux</option>
                <option value="Java">Java</option>
              </Field>
              <ErrorMessage name="technology" className="text-danger" component="div" />
            </div>
            <br></br>
            <div>
              <label htmlFor="startDate">startDate:</label>
              <Field
                type="date"
                id="startDate"
                name="startDate"
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              />
              <ErrorMessage name="startDate" className="text-danger" component="div" />
            </div>
            <br></br>

            <div>
              <label htmlFor="endDate">endDate:</label>
              <Field
                type="date"
                id="endDate"
                name="endDate"
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              />
              <ErrorMessage name="endDate" className="text-danger" component="div" />
            </div>
            <br />
            <br />
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
