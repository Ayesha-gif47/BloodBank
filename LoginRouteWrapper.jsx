// components/LoginRouteWrapper.jsx
import React from "react";
import Login from "./Login";

const LoginRouteWrapper = ({ onLoginSuccess, onClose }) => {
  return (
    <Login
      onLoginSuccess={onLoginSuccess}
      onClose={onClose}
    />
  );
};

export default LoginRouteWrapper;