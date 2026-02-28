import { Outlet } from "react-router";
import NavBar from "./NavBar"
import { tokenActions } from "../Store/TokenSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../Auth/authFunctions";
import { userActions } from "../Store/UserSlice";


function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function checkAuth() {
      const token = localStorage.getItem("token");
      const expiration = localStorage.getItem("expirationTime");

      if (!token || !expiration || Date.now() > Number(expiration)) {
        dispatch(tokenActions.onLogOut());
        dispatch(tokenActions.setAuthChecked());
        return;
      }

      try {
        const user = await getCurrentUser(token);
        
        dispatch(userActions.setUser(user));
        dispatch(tokenActions.onLogin({
          token,
          expiresIn: Number(expiration) - Date.now()
        }));
      } catch {
        localStorage.removeItem("token");
        dispatch(tokenActions.onLogOut());
      } finally {
        dispatch(tokenActions.setAuthChecked());
      }
    }
    checkAuth();
  }, []);

  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}

export default HomePage;
