import React, { useState } from 'react';
import { CButton, CCol, CForm, CFormInput, CFormLabel, CRow } from '@coreui/react';

const Add = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: '', phone: '', address: '', email: '' });

  const handleInputChange = (e) => {
    setNewStudent((prevStudent) => ({
      ...prevStudent,
      [e.target.name]: e.target.value
    }));
  };

  const handleAddStudent = () => {
    setStudents((prevStudents) => [...prevStudents, newStudent]);
    setNewStudent({ name: '', phone: '', address: '', email: '' });
  };

  return (
    <CRow>
      <CCol md="8" className="mx-auto">
        <CForm>
          <CCol md="2">
            <CFormLabel htmlFor="name">Name</CFormLabel>
            <CFormInput
              id="validationDefault01"
              name="name"
              value={newStudent.name}
              onChange={handleInputChange}
              placeholder="name"
              defaultValue="Mark"
              required
            />
          </CCol>
          <CCol md="4">
            <CFormLabel htmlFor="phone">Phone</CFormLabel>
            <CFormInput
              type="number"
              id="phone"
              name="phone"
              value={newStudent.phone}
              onChange={handleInputChange}
              placeholder="phone"
              defaultValue="Mark"
              required
            />
          </CCol>
          <CFormLabel htmlFor="address">Address</CFormLabel>
          <CFormInput
            id="address"
            name="address"
            value={newStudent.address}
            onChange={handleInputChange}
            placeholder="address"
            defaultValue="Mark"
            required
          />

          <CFormLabel htmlFor="email">Email</CFormLabel>
          <CFormInput
            type="text"
            id="validationServer02"
            name="email"
            value={newStudent.email}
            onChange={handleInputChange}
            placeholder="email"
            defaultValue="name@surname.com"
            required
          />
          <br></br>
          <CButton className="btn-primary text-light px-24" type="submit">
            Thêm Mới
          </CButton>
        </CForm>
      </CCol>

      <CCol md="4">
      </CCol>
    </CRow>
  );
};

export default Add;
