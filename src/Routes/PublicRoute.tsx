import type { ReactElement } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

type props = {
    element: ReactElement
}
type RootState = {
  token: string | null;
};

const PublicRoute = ({ element } : props) => {
  const token = useSelector((state : RootState) => state.token);

  if (token) {
    return <Navigate to="/home" replace />;
  }

  return element;
};

export default PublicRoute;