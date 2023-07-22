import {
  cilCalendar,
  cilNotes,
  cilPeople,
  cilUserPlus
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CNavItem, CNavTitle } from '@coreui/react'
import React from 'react'

const _nav = [
  // {
  //   component: CNavItem,
  //   name: 'Admin',
  //   to: '/dashboard',
  //   icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  //   badge: {
  //     color: 'info',
  //     text: 'NEW',
  //   },
  // },
  {
    component: CNavTitle,
    name: '1TEK Management',
  },
  {
    component: CNavItem,
    name: 'Users',
    to: '/user-management/users',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Project',
    to: '/project-management/projects',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Partner',
    to: '/partner-management/partners',
    icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Working',
    to: '/working-management/working',
    icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
  },
]

export default _nav
