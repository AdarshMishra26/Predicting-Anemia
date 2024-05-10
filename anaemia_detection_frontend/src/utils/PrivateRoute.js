import React from "react";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {

    const isAuthenticated = localStorage.getItem("IS_LOGED")
    if (isAuthenticated) {
        return children
    }

    return <Navigate to="/signin" />
} 