import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../../firebase.init";
import { signOut } from "firebase/auth";
import useUserData from "../../Hooks/useUserData";
import Loader from "../../Components/Loader";

const LecturerRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const { userData, isLoading } = useUserData(user);
  const location = useLocation();

  if (loading || isLoading) {
    return <Loader />;
  }
  if (user && userData?.role === '0' ) {
    signOut(auth);
    localStorage.removeItem("accessToken");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default LecturerRoute;
