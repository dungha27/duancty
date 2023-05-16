import React from 'react'
import { Link } from 'react-router-dom'
function Home() {
  return (
    <>
      <h1>Home page</h1>
      <Link to="/auth/login">Auth</Link>
      <br />
      <Link to="/admin/dashboard">Admin</Link>
    </>
  )
}

export default Home
