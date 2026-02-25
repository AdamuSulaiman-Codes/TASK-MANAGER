import { createBrowserRouter, Navigate } from "react-router";
import LoginPage from "../Auth/LoginPage";
import SignUpPage from "../Auth/SignUpPage";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "../Pages/HomePage";

export const router = createBrowserRouter([
    {
    path: "/",
    element: <Navigate to="/log-in" />,
  },
  {
    path: "/log-in",
    element: (
      <PublicRoute element={<LoginPage />}/>
    ),
  },
  {
    path: "/sign-up",
    element: (
      <PublicRoute element={<SignUpPage />}/>
    ),
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute element={<HomePage />}/>
    ),
  },
])