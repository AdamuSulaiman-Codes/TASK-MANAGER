import type { ReactElement } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

type props = {
    element: ReactElement
}

type RootState = {
  token: {
    token: string | null,
    isAuthChecked: boolean
  }
};

const ProtectedRoute = ({element}: props) => {
  const token = useSelector((state : RootState) => state.token.token);
  const isAuthChecked = useSelector((state : RootState) => state.token.isAuthChecked);

  if (!isAuthChecked) {
    return <p>Loading...</p>; 
  }
  if (!token) {
    return <Navigate to="/log-in" replace />;
  }

  return element;
};

export default ProtectedRoute;