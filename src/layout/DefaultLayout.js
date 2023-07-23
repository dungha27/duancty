import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AppFooter, AppHeader, AppSidebar } from "../components/index";
import _nav from "../_nav";

const DefaultLayout = () => {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <Outlet />
        </div>
        <AppFooter />
      </div>
    </div>
  );
};

export default DefaultLayout;
