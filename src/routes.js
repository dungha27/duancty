import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))


// Notifications
const Product = React.lazy(() => import('./views/pages/users'))
const Add = React.lazy(() => import('./views/pages/users/Add/Add'))
const Edit = React.lazy(() => import('./views/pages/users/Edit/[id]'))

//du an
const Project = React.lazy(() => import('./views/pages/project/'))
const Add_duan = React.lazy(() => import('./views/pages/project/Add_duan/Add_duan'))
const Edit_duan = React.lazy(() => import('./views/pages/project/Edit_duan/Edit_duan'))
//đoi tac

const partner = React.lazy(() => import('./views/pages/partner/index'))
const Add_dt = React.lazy(() => import('./views/pages/partner/Add/Add_dt'))
const Edit_dt = React.lazy(() => import('./views/pages/partner/Edit/Edit_dt'))
//ngay lam viec
const working = React.lazy(() => import('./views/pages/working/index'))
const Add_working = React.lazy(() => import('./views/pages/working/Add_working/Add_working'))
const Editwk = React.lazy(() => import('./views/pages/working/Edit_working/Editwk'))

const checkin = React.lazy(() => import('./views/pages/checkin/checkin'))
const routes = [
  { path: '/', exact: true, name: 'Trang chủ' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/products', name: 'Nhân Viên', element: Product, exact: true },
  { path: '/Add', name: 'Thêm', element: Add, exact: true },
  { path: '/Edit/:id', name: 'Sửa', element: Edit, exact: true },

  { path: '/Project', name: 'Dự Án', element: Project, exact: true },
  { path: '/Add_duan', name: 'Thêm Dự Án', element: Add_duan, exact: true },
  { path: '/Edit_duan/:id', name: 'Sửa Dự Án', element: Edit_duan, exact: true },

  { path: '/partner', name: 'Đối tác', element: partner, exact: true },
  { path: '/Add_dt', name: 'Thêm Đối Tác', element: Add_dt, exact: true },
  { path: '/Edit_dt/:id', name: 'Sửa Đối Tác', element: Edit_dt, exact: true },

  { path: '/Working', name: 'Ngày làm việc', element: working, exact: true },
  { path: '/Add_working', name: 'Thêm', element: Add_working, exact: true },
  { path: '/Editwk/:id', name: 'Sửa', element: Editwk, exact: true },

  { path: '/checkin', name: 'checkin', element: checkin, exact: true },

]

export default routes;
