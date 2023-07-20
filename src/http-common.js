import axios from "axios";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "./redux/state/auth/authSlice";
import { useDispatch } from "react-redux";
const accessToken = localStorage.getItem("accessToken") || null;
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:8088/api",
  timeout: 10000,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
});

export const HttpInterceptor = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  instance.interceptors.request.use(
    async (config) => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${accessToken}`,
        };
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      const { status, message, statusText } = error.response || {};
      if (status === 401) {
        dispatch(logout());
        navigate("/login", { state: { from: location } });
      }
      if (status === 408 || status === 500 || status === 502) {
        toast.error(message || statusText, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      return Promise.reject(error);
    }
  );
//   useEffect(() => {
//     const user = state?.user
//       ? state?.user
//       : localStorage.getItem("user") &&
//         JSON.parse(localStorage.getItem("user"));
//     if (user && user?.role === "FIN_STAFF") {
//       if (
//         location?.pathname.includes("/campaign-management") ||
//         location?.pathname.includes("/customer-list") ||
//         location?.pathname.includes("/spin")
//       ) {
//         navigate("/403");
//       }
//     }
//     // request interceptor to add accessToken to request headers
//   }, [location, navigate, signOut, state?.user]);
  return children;
};

export default instance;
