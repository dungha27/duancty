import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HttpInterceptor } from "./http-common";
import DefaultLayout from "./layout/DefaultLayout";
import "./scss/style.scss";
import Login from "./views/pages/auth/login/Login";
import Page404 from "./views/pages/page404";
import Page500 from "./views/pages/page500";
import Partners from "./views/pages/partner";
import Projects from "./views/pages/project";
import Users from "./views/pages/users";
import Working from "./views/pages/working";
import CreateWorking from "./views/pages/working/CreateWorking";
import AddUser from "./views/pages/users/Add/Add";
import UpdateUser from "./views/pages/users/Edit/[id]";
const App = () => {
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
              <Route path="users">
                <Route index element={<Users />} />
                <Route path="create" element={<AddUser />} />
                <Route path="update/*" element={<UpdateUser />} />
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
              <Route path="working">
                <Route index element={<Working />} />
                <Route path="add" element={<CreateWorking />} />
              </Route>
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
