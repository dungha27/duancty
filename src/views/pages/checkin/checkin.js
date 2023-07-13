import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { PostData } from '../../../api';

const CalendarComponent = () => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);

  useEffect(() => {
    // Fetch available dates from the API
    fetchAvailableDates()
      .then((dates) => {
        setAvailableDates(dates);
      })
      .catch((error) => {
        console.error('Error fetching available dates:', error);
      });
  }, []);

  useEffect(() => {
    if (checkInDate && checkOutDate) {
      // Post check-in and check-out dates to API
      postCheckInCheckOutDates(checkInDate, checkOutDate)
        .then(() => {
          console.log('Check-in and check-out dates posted successfully');
        })
        .catch((error) => {
          console.error('Error posting check-in and check-out dates:', error);
        });
    }
  }, [checkInDate, checkOutDate]);

  const fetchAvailableDates = async () => {
    try {
      const response = await fetch('your_api_endpoint');
      const data = await response.json();
      return data.dates; // Assuming the API response has an array of dates
    } catch (error) {
      throw new Error('Failed to fetch available dates');
    }
  };

  const handleDateSelection = (date) => {
    if (!checkInDate) {
      setCheckInDate(date);
    } else if (!checkOutDate) {
      setCheckOutDate(date);
    } else {
      setCheckInDate(date);
      setCheckOutDate(null);
    }
  };

  const postCheckInCheckOutDates = async () => {
    try {
      const response = await PostData(`/checkin`);
      if (!response.ok) {
        throw new Error('Failed to post check-in and check-out dates');
      }
    } catch (error) {
      throw new Error('Failed to post check-in and check-out dates');
    }
  };

  return (
    <div>
      <h2>Calendar</h2>
      <p>Check-in: {checkInDate && checkInDate.toString()}</p>
      <p>Check-out: {checkOutDate && checkOutDate.toString()}</p>

      <Calendar
        onChange={handleDateSelection}
        value={checkInDate || checkOutDate}
        selectRange={true}
        returnValue="range"
        tileDisabled={({ date }) => !availableDates.includes(date.toISOString().split('T')[0])}
      />
    </div>
  );
};

export default CalendarComponent;
