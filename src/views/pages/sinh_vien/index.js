import React from 'react'
import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CNavbar,
  CContainer,
  CNavbarBrand,
  CForm,
  CFormInput,
} from '@coreui/react'
import deleteIcon from '../../../assets/images/icon/deleteIcon.svg'
import editIcon from '../../../assets/images/icon/editIcon.svg'
import { Link } from 'react-router-dom'
export default function Products() {
  return (
    <div>
      <div className={'Neki-Table__Title'}>
        <h2>Danh Sách Nhân Viên</h2>
        <CNavbar colorScheme="light" className="">
          <CContainer fluid>
            <CForm className="d-flex">
              <CFormInput type="search" className="me-3" placeholder="Search" />
              <CButton type="submit" color="light" variant="outline" className="bg-primary">
                Search
              </CButton>
            </CForm>
          </CContainer>
        </CNavbar>
<CButton><Link to="/admin/Add" className="text-light text-decoration-none">Thêm Mới</Link></CButton>
      </div>
      <CTable hover>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
            <CTableHeaderCell scope="col">Address</CTableHeaderCell>
            <CTableHeaderCell scope="col">Email</CTableHeaderCell>
            <CTableHeaderCell scope="col">Action</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow>
            <CTableHeaderCell scope="row">1</CTableHeaderCell>
            <CTableDataCell>Mark</CTableDataCell>
            <CTableDataCell>Otto</CTableDataCell>
            <CTableDataCell>@mdo</CTableDataCell>
            <CTableDataCell>@mdo</CTableDataCell>
            <CTableDataCell>
              <div className={'Neki-Table__Handle'}>
                <img src={editIcon} alt={'edit'}/>
                <img src={deleteIcon} alt={'delete'} />
              </div>
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">2</CTableHeaderCell>
            <CTableDataCell>Jacob</CTableDataCell>
            <CTableDataCell>Thornton</CTableDataCell>
            <CTableDataCell>@fat</CTableDataCell>
            <CTableDataCell>@mdo</CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
    </div>
  )
}
