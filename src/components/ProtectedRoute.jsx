import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../Firebase/useAuth";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    // 🔄 Show loading while checking authentication
    return <p>Loading...</p>;
  }

  return user ? children : <Navigate to="/auth" />;
};

export default ProtectedRoute;
