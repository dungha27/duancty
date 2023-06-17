import React, { Component, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Logout = React.lazy(() => import('./views/pages/auth/logout/logout'))
const Home = React.lazy(() => import('./views/pages/homepage/Home'))
const Login = React.lazy(() => import('./views/pages/auth/login/Login'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/home" name="Home" element={<Home />} />
            <Route exact path="/auth/logout" name="Logout" element={<Logout />} />
            <Route exact path="/auth/login" name="Login Page" element={<Login />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route exact path="/admin/*" name="Admin home" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
        <ToastContainer />
      </BrowserRouter>
    )
  }
}

export default App
