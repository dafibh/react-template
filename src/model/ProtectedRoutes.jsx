import {Navigate, Outlet} from "react-router-dom";

const useAuth = () => {
  const user = { loggedIn: false };
  return user && user.loggedIn;
};

export function InverseProtectedRoutes() {
  return useAuth() ? <Navigate to="/" /> : <Outlet />;
}

export default function ProtectedRoutes() {
  const isAuth = useAuth();
  // return isAuth ? <Outlet /> : <SignInBasic />; // Expected to return a 404 component instead
  return isAuth ? <Outlet /> : <Outlet />;
}
