import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import TechnicianDashboard from "./pages/TechnicianDashboard";
import Home from "./pages/Home";
import Reset_Password from "./pages/ResetPassword";
import Password_Reset_Link from "./pages/Password_Reset";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Navigate to="/home" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/technician" element={<TechnicianDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/resetpasswordlink" element={<Password_Reset_Link />} />
        <Route path="/resetpassword" element={<Reset_Password />} />
      </Routes>
    </Router>
  );
};

export default App;
