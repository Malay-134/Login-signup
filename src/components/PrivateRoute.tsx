import { Navigate } from "react-router-dom";

const PrivateRoute = ({
  isAuth,
  children,
}: {
  isAuth: boolean | null;
  children: React.ReactNode;
}) => {
  console.log(isAuth);
  return isAuth ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;