import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import PrivetRoute from "./PrivetRoute";
import ForgotPassword from "../pages/ForgotPassword";

const Routers = () => {
  return (
    <Routes>
      <Route
        index
        element={
          <PrivetRoute>
            <Home />
          </PrivetRoute>
        }
      />
      <Route path="/Login" element={<Login />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/ForgotPassword" element={<ForgotPassword />} />
    </Routes>
  );
};

export default Routers;
