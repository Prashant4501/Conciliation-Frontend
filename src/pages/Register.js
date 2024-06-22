import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEyeSlash, FaEye, FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiUserSettingsFill } from "react-icons/ri";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Zoom } from "react-awesome-reveal";
import Alert from "../utils/Alert";
import ReactGA from "react-ga";

const Register = () => {
    const TRACKING_ID = "G-R44VTCVSNZ";
    ReactGA.initialize(TRACKING_ID);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertStatement, setAlertStatement] = useState("");
  const registerdAlertStatement = "User Registered Successfully"
  const url = "https://conciliation-backend.onrender.com";
  const time = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const formattedDate = `${year}-${month}-${day}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;
  const dateTime = `${formattedDate} ${formattedTime}`;
  return dateTime;
};
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "user", // Default role set to "user"
    activeSession:false,
    createdOn:time()
  });
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const onHandleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const fn = () => {
    setTimeout(() => {
      setErrorMessage("");
    }, 2000);
    return;
  };
  useEffect(() => {
    const loggedIn = sessionStorage.getItem("loggedin");
    setIsLoggedIn(loggedIn === "true");
  }, []);
  if (isLoggedIn) {
    navigate("/user");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== confirmPassword) {
      setErrorMessage("Passwords does not match");
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
      return;
    }
    try {
      console.log("Attempting to reset Password:", { form });
      const response = await axios.post(
        `${url}/api/auth/register`,
        form,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ); // timeout to handle cases where the request hangs
      setAlertStatement(response.data.message);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    form.username=""
    form.email=""
    form.password=""
    setConfirmPassword("")

      fn();
      // navigate("/login");
    } catch (error) {
      console.error("error registering");
      console.error(error.response.data.message);
      setErrorMessage(error.response.data.message);
    }
  };

  // const Redirect = ()=>{
  //   navigate("/user/resetPassword");
  // }

  return (
    <>
      <Navbar />
      <div className="bg-gray-900 flex items-center justify-center min-h-screen overflow-y-hidden">
        <div className="container mx-auto mt-4 ">
          <form
            method="POST"
            onSubmit={handleSubmit}
            className="max-w-md mx-auto bg-gray-900 shadow-2xl rounded px-8 pt-6 pb-8 mb-4 border border-gray-800 "
          >
            <h2 className="text-center text-2xl text-white mb-4">Register</h2>
            <div className="mb-4 relative">
              <div className="iconn absolute inset-y-0 left-0 px-3 py-3 text-gray-400 ">
                <FaUser />
              </div>
              <input
                type="text"
                value={form.username}
                name="username"
                onChange={onHandleChange}
                placeholder="Username"
                className="w-full px-10 py-2  rounded-md mb-4 text-gray-400 bg-gray-800 "
                required
              />
            </div>
            <div className="mb-4 relative">
              <div className="iconn absolute inset-y-0 left-0 px-3 py-3  text-gray-400">
                <MdEmail />
              </div>

              <input
                type="email"
                value={form.email}
                onChange={onHandleChange}
                name="email"
                placeholder="Email"
                className="w-full px-10 py-2  rounded-md mb-4  text-gray-400  bg-gray-800 "
                required
              />
            </div>
            <div className="mb-4">
              <div className="relative">
                <div className="iconn absolute inset-y-0 left-0 px-3 py-3 text-gray-400 ">
                  <FaLock />
                </div>
                <input
                  type={passwordVisible ? "text" : "password"}
                  value={form.password}
                  onChange={onHandleChange}
                  name="password"
                  placeholder="Password"
                  className="w-full px-10 py-2  rounded-md mb-4 text-gray-400   bg-gray-800 "
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 px-3 py-2 text-gray-400"
                >
                  <svg
                    className="h-5 w-5 "
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                  </svg>
                </button>
              </div>
            </div>
            <div className="mb-4">
              <div className="relative">
                <div className="iconn absolute inset-y-0 left-0 px-3 py-3  text-gray-400">
                  <FaLock />
                </div>
                <input
                  type={passwordVisible ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="w-full px-10 py-2  rounded-md mb-4 text-gray-400   bg-gray-800 "
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 px-3 py-2 text-gray-400 "
                >
                  <svg
                    className="h-5 w-5 "
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                  </svg>
                </button>
              </div>
            </div>
            <div className="mb-4 relative">
              <div className="iconn absolute inset-y-0 left-0 px-3 py-3  text-gray-400">
                <RiUserSettingsFill />
              </div>
              <select
                value={form.role}
                onChange={onHandleChange}
                className="w-full px-10 py-2  rounded-md mb-4   bg-gray-800 text-gray-400"
              >
                <option value="user">User</option>
                {/*                 <option value="admin">Admin</option>
                <option value="technician">Technician</option> */}
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              Register
            </button>
            <div className="mb-2 mt-5 text-center  text-gray-400 ">
              <span className="text-center text-gray-600">OR</span>
            </div>
            <div className="mb-2 mt-2 text-center  text-gray-400">
              <span className="text">
                <span>Have an account?</span>
                <a
                  href=""
                  className="text-bold ml-2 text-blue-700 hover:text-blue-300"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login here
                </a>
                .
              </span>
            </div>
            <div className="error mt-5 mb-5 h-2">
              {errorMessage && (
                <p className="text-red-500 text-center ">{errorMessage}</p>
              )}
            </div>
          </form>
        </div>
      </div>
      <div
        className={`fixed top-10 left-1/2 transform -translate-x-1/2 h-6 w-64 flex justify-center ${
          showAlert ? "fade-in" : "fade-out"
        }`}
      >
        <Zoom>
          <Alert data={alertStatement} />
        </Zoom>
      </div>
    </>
  );
};

export default Register;
