import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DefaultLayout from "./layout/DefaultLayout";
import "./scss/style.scss";
import Login from "./views/pages/auth/login/Login";
import Page404 from "./views/pages/page404";
import Page500 from "./views/pages/page500";
import Users from "./views/pages/users";
import { HttpInterceptor } from "./http-common";
import _nav from "./_nav";
import { useEffect } from "react";
import Projects from "./views/pages/project";
import Partners from "./views/pages/partner";
import Working from "./views/pages/working";
const App = () => {
  const router = useLocation();
  if (
    router.pathname.includes('user-management') || router.pathname.includes('project-management') ||  router.pathname.includes('partner-management') || router.pathname.includes('working-management') ||
    router.pathname === "/404" || router.pathname === '/auth/login'
  ) {
  } else {
    window.location.replace("/404");
  }
  return (
    <>
      <HttpInterceptor>
        <Routes>
          <Route
            exact
            path="/auth/login"
            name="Login Page"
            element={<Login />}
          />
          <Route exact path="/" name="Admin home" element={<DefaultLayout />}>
            <Route index element={<Navigate to="user-management" />} />
            <Route path="user-management">
              <Route index element={<Navigate to="users" />} />
              <Route path="users" element={<Users />}>
                
              </Route>

            </Route>
            <Route path="project-management">
              <Route index element={<Navigate to="projects" />} />
              <Route path="projects" element={<Projects />}></Route>
            </Route>
            <Route path="partner-management">
              <Route index element={<Navigate to="partners" />} />
              <Route path="partners" element={<Partners />}></Route>
            </Route>
            <Route path="working-management">
              <Route index element={<Navigate to="working" />} />
              <Route path="working" element={<Working />}></Route>
            </Route>
          </Route>
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
        </Routes>
        <ToastContainer />
      </HttpInterceptor>
    </>
  );
};

export default App;
