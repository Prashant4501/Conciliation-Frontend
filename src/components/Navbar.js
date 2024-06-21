import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Zoom } from "react-awesome-reveal";
import Alert from "../utils/Alert";
import axios from "axios";

const Navbar = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertStatement, setShowAlertStatement] = useState(false);

  const processing = "Logging out";
  const processed = "Logged Out Successfully";

  useEffect(() => {
    // Check if the user is logged in
    const loggedIn = sessionStorage.getItem("loggedin");
    setIsLoggedIn(loggedIn === "true");
  }, []);

  const role = localStorage.getItem("role");
  const username = localStorage.getItem(role);
  const form = {
    username: username,
    role: role,
  };
    const url = "https://conciliation-backend.onrender.com";

  /* Logging out  */
  const handleLogout = async () => {
    try {
      setShowAlertStatement(processing);
      setShowAlert(true);
      // Send a POST request to the logout endpoint
      const response = await axios.post(
        `${url}/api/auth/logout`,
        form,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setTimeout(() => {
        setShowAlert(false);
        // Set the loggedin session variable to false
        sessionStorage.setItem("loggedin", false);
        // Navigate to the home page
        navigate("/home");
        // Clear the local storage
        localStorage.clear();
      }, 2000);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlertStatement(processed);
        setShowAlert(false);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <nav className="bg-gray-900 p-4 border-b-2 rounded-3xl border-gray-600">
        <div className="container mx-auto flex justify-between items-center my-2">
          <Link to="/" className="text-white text-sm md:text-lg ">
            Conciliation
          </Link>
          <div>
            {!isLoggedIn && location.pathname !== "/login" && (
              <Link to="/login" className="text-white px-4">
                Login
              </Link>
            )}
            {!isLoggedIn &&
              location.pathname !== "/register" &&
              location.pathname !== "/home" && (
                <Link to="/register" className="text-white px-4">
                  Register
                </Link>
              )}
            {isLoggedIn && (
              <button
                type="submit"
                onClick={() => {
                  handleLogout();
                }}
                className="text-white px-4"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
      <div
        className={`fixed top-10 left-1/2 transform -translate-x-1/2 h-6 w-64 flex justify-center ${
          showAlert ? "fade-in" : "fade-out"
        }`}
      >
        <Zoom>
          <Alert data={showAlertStatement} />
        </Zoom>
      </div>
    </>
  );
};

export default Navbar;
