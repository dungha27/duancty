import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from 'antd';
import { GetData, PutData } from "../../../../api";
import { useLocation, useNavigate } from "react-router-dom";

const Editwk = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userID = location.pathname.split("/")[location.pathname.split("/").length - 1];

  const initialData = {
    date: "",
    expectedStart: "",
    expectedEnd: "",
    latitude: "nfffb",
    longitude: "ynff",
    location: "nfunf",
  };
  const [data, setData] = useState(initialData);
  const [isDataFetched, setIsDataFetched] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async (values) => {
    try {
      const response = await GetData(`/working-days/${userID}/employee`, values);
      setData(response.data);
      setIsDataFetched(true);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };
  const handleSubmit = async (values) => {
    try {
      const response = await PutData(`/working-days/${userID}`, values);
      if (response.status !== 200) {
        throw new Error('Failed to update data');
      }
      console.log('Data updated successfully');
    } catch (error) {
      console.error('Error updating data:', error);
    }
    navigate('/admin/working');
  };
  return (
    <div>
      {isDataFetched ? (
        <Formik
          initialValues={data}
          validationSchema={Yup.object().shape({
            date: Yup.string().required('date is required'),
            expectedStart: Yup.string().required('expectedStart is required'),
            expectedEnd: Yup.string().required('expectedEnd is required'),
            latitude: Yup.string().required('latitude is required'),
            longitude: Yup.string().required('longitude is required'),
            location: Yup.string().required('location is required'),
          })}
          onSubmit={handleSubmit}
        >
          <Form>
            <div>
              <div>
                <label htmlFor="date">Date:</label>
                <Field
                  type="date"
                  id="date"
                  name="date"
                />
                <ErrorMessage name="date" component="div" />
              </div>
              <br />
              <div>
                <label htmlFor="expectedStart">Expected Start:</label>
                <Field
                  type="datetime-local"
                  id="expectedStart"
                  name="expectedStart"
                />
                <ErrorMessage name="expectedStart" component="div" />
              </div>
              <br />
              <div>
                <label htmlFor="expectedEnd">Expected End:</label>
                <Field
                  type="datetime-local"
                  id="expectedEnd"
                  name="expectedEnd"
                />
                <ErrorMessage name="expectedEnd" component="div" />
              </div>
            </div>
            <br />
            <br />
            <br />
            <Button type="primary" htmlType="submit">Update</Button>
          </Form>
        </Formik>
      ) : (
        <div>Loading data...</div>
      )}
    </div>
  );
};

export default Editwk;
