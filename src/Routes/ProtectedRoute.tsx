import type { ReactElement } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

type props = {
    element: ReactElement
}

type RootState = {
  token: {
    token: string | null
  }
};

const ProtectedRoute = ({element}: props) => {
  const token = useSelector((state : RootState) => state.token.token);

  if (!token) {
    return <Navigate to="/log-in" replace />;
  }

  return element;
};

export default ProtectedRoute;