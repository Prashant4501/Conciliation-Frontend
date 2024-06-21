import { React, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaEyeSlash, FaEye, FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiUserSettingsFill } from "react-icons/ri";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Zoom } from "react-awesome-reveal";
import Alert from "../utils/Alert";

const Reset_Password = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search); // to get url
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertStatement, setAlertStatement] = useState("");
  const token = searchParams.get("token"); // to get token from url
  const role = searchParams.get("role"); // to get role from url
  const navigate =  useNavigate();
  const url = "https://conciliation-backend.onrender.com";
  const [form, setForm] = useState({
    password: "",
    role: "user", // Default role set to "user"
    token: token,
  });
  const fn = () => {
    setTimeout(() => {
      setErrorMessage("");
    }, 2000);
    return;
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const onHandleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== confirmPassword) {
      setErrorMessage("Confirm Password does not match");
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
      return;
    }
    try {
       
      const response = await axios.post(
        `${url}/api/auth/password/reset-password`,
        form,
        {
          timeout: 10000,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setAlertStatement(response.data.message);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
      form.password = "";
    } catch (error) {
      setAlertStatement(error.response.data.error);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    }
  };

  return (
    <>
      <div className="bg-gray-900 flex items-center justify-center min-h-screen overflow-y-hidden">
        <div className="container mx-auto mt-4 ">
          <form
            method="POST"
            onSubmit={handleSubmit}
            className="max-w-md mx-auto bg-gray-900 shadow-2xl rounded px-8 pt-6 pb-8 mb-4 border border-gray-800 "
          >
            <h2 className="text-center text-2xl text-white mb-4">
              Reset Password
            </h2>
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
                  placeholder="Enter new Password"
                  className="w-full px-10 py-2  rounded-md mb-4  text-gray-400  bg-gray-800 "
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
                  className="w-full px-10 py-2  rounded-md mb-4  text-gray-400  bg-gray-800 "
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
            {/* Role */}
            <div className="mb-4 relative">
              <div className="iconn absolute inset-y-0 left-0 px-3 py-3 text-gray-400  ">
                <RiUserSettingsFill />
              </div>
              <select
                value={form.role}
                name="role"
                onChange={onHandleChange}
                className="w-full px-10 py-2  rounded-md mb-4 text-gray-400  bg-gray-800"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="technician">Technician</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              Change Password
            </button>
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

export default Reset_Password;
