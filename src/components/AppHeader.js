import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavItem,
  CNavLink,
} from "@coreui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";

import { logo } from "../assets/brand/logo.js";
import { AppHeaderDropdown } from "./header/index";
import navRoute from "../_nav.js";
import { useState } from "react";
import { useEffect } from "react";

const AppHeader = () => {
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow);
  const router = useLocation();
  const getRoute = (name) => {
    return navRoute?.find((nav) => nav.to === name);
  };
  const [route, setRoute] = useState(getRoute(router.pathname));
  useEffect(() => {
    setRoute(getRoute(router.pathname));
  }, [router.pathname]);
  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: "set", sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to={route?.to} component={NavLink}>
              {route?.name}
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilBell} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilList} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilEnvelopeOpen} size="lg" />
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid></CContainer>
    </CHeader>
  );
};

export default AppHeader;
