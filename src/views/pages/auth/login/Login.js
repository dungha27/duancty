import { Formik, Form, Field, ErrorMessage } from 'formik'
import { toast } from 'react-toastify'
import React from 'react'
import { Image } from 'react-bootstrap'
import { Link, Navigate, redirect, useNavigate } from 'react-router-dom'
import { PostData } from '../../../../api'
const Login = () => {
  const Navigate = useNavigate();

  const initialValues = {
    username: 'admin',
    password: 'admin@123',
  }
  const validate = (values) => {
    const errors = {}
    if (!values.username) {
      errors.username = 'Please enter username!'
    } else if (values.username.length < 5) {
      errors.username = 'Must be 5 characters or more!'
    }
    if (!values.password) {
      errors.password = 'Please enter password!'
    } else if (values.password.length < 8) {
      errors.password = 'Must be 8 characters or more!'
    }
    return errors
    
  }
  const onSubmit = async (values, { setSubmitting }) => {
    const result = PostData('/auth/login', values)
    console.log(result)
    result
      .then((res) => {
        console.log(res)
        if (res.status === 200 && res.data) {
          toast.success("Login Sucess")
          localStorage.setItem('accessToken', res?.data?.accessToken)
          Navigate('/admin/dashboard')
        }
      })
      .catch((err) => {
        toast.error(err)
      })

    setTimeout(() => {
      setSubmitting(false)
    }, 400)
  }
  return (
    <section className="vh-100 d-flex ">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <Image
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Sample image"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit}>
              <Form>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="username">
                    Username
                  </label>
                  <Field
                    type="text"
                    name="username"
                    id="username"
                    className="form-control form-control-lg"
                    placeholder="Enter a valid username"
                    required
                  />
                  <ErrorMessage name="username" component="div" className="text-danger" />
                </div>
                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                    required
                  />
                  <ErrorMessage name="password" component="div" className="text-danger" />
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="form-check mb-0">
                    <Field
                      type="checkbox"
                      name="rememberMe"
                      id="rememberMe"
                      className="form-check-input me-2"
                    />
                    <label className="form-check-label" htmlFor="rememberMe">
                      Remember me
                    </label>
                  </div>
                  <Link to="/" className="text-body">
                    Forgot password?
                  </Link>
                </div>
                <div className="text-center text-lg-start mt-2 pt-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    style={{ padding: '11px 28px' }}
                  >
                    Login
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
