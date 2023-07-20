import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { userInfo, accessToken } = useSelector(state => state.auth);
  return (userInfo && accessToken) ? <>{children}</> : <Navigate to={'/auth/login'}/> ;
};

export default PrivateRoute;
