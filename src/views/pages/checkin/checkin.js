// import React, { useEffect, useState } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import { PostData } from '../../../api';

// const CalendarComponent = () => {
//   const [workingDayId, setCheckInDate] = useState(null);
//   const [checkOutDate, setCheckOutDate] = useState(null);
//   const [availableDates, setAvailableDates] = useState([]);

//   useEffect(() => {
//     // Fetch available dates from the API
//     fetchAvailableDates()
//       .then((dates) => {
//         setAvailableDates(dates);
//       })
//       .catch((error) => {
//         console.error('Error fetching available dates:', error);
//       });
//   }, []);

//   useEffect(() => {
//     if (checkInDate && checkOutDate) {
//       // Post check-in and check-out dates to API
//       postCheckInCheckOutDates(checkInDate, checkOutDate)
//         .then(() => {
//           console.log('Check-in and check-out dates posted successfully');
//         })
//         .catch((error) => {
//           console.error('Error posting check-in and check-out dates:', error);
//         });
//     }
//   }, [checkInDate, checkOutDate]);

//   const fetchAvailableDates = async () => {
//     try {
//       const response = await fetch('your_api_endpoint');
//       const data = await response.json();
//       return data.dates; // Assuming the API response has an array of dates
//     } catch (error) {
//       throw new Error('Failed to fetch available dates');
//     }
//   };

//   const handleDateSelection = (date) => {
//     if (!checkInDate) {
//       setCheckInDate(date);
//     } else if (!checkOutDate) {
//       setCheckOutDate(date);
//     } else {
//       setCheckInDate(date);
//       setCheckOutDate(null);
//     }
//   };

//   const postCheckInCheckOutDates = async () => {
//     try {
//       const response = await PostData(`/checkin`);
//       if (!response.ok) {
//         throw new Error('Failed to post check-in and check-out dates');
//       }
//     } catch (error) {
//       throw new Error('Failed to post check-in and check-out dates');
//     }
//   };

//   return (
//     <div>
//       <h2>Calendar</h2>
//       <p>Check-in: {checkInDate && checkInDate.toString()}</p>
//       <p>Check-out: {checkOutDate && checkOutDate.toString()}</p>

//       <Calendar
//         onChange={handleDateSelection}
//         value={checkInDate || checkOutDate}
//         selectRange={true}
//         returnValue="range"
//         tileDisabled={({ date }) => !availableDates.includes(date.toISOString().split('T')[0])}
//       />
//     </div>
//   );
// };

// export default CalendarComponent;

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { PostData } from '../../../api';

const CheckInForm = () => {
  const initialValues = {
    userId: "",
    workingDayId: ""
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await PostData(`/checkin`, values);

      if (response.ok) {
        console.log('Check-in successful!');
      } else {
        console.log('Check-in failed!');
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }

    setSubmitting(false);
  };

  const validate = (values) => {
    const errors = {};

    if (!values.userId) {
      errors.userId = 'Required';
    }

    if (!values.workingDayId) {
      errors.workingDayId = 'Required';
    }

    return errors;
  };

  return (
    <div>
      <h1>Check-In</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={validate}
      >
        {({ values, setFieldValue, handleBlur, isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="userId">User ID</label>
              <Field type="text" id="userId" name="userId" />
              <ErrorMessage name="userId" component="div" />
            </div>

            <div>
              <label htmlFor="workingDayId">Working Day</label>
              <Field type="number" id="workingDayId" name="workingDayId" />
              <ErrorMessage name="workingDayId" component="div" />
            </div>

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CheckInForm;
