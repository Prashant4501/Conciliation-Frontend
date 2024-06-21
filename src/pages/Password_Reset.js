import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEyeSlash, FaEye, FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiUserSettingsFill } from "react-icons/ri";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Zoom } from "react-awesome-reveal";
import Alert from "../utils/Alert";

const Password_Reset_Link = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertStatement, setAlertStatement] = useState("");
  const [form, setForm] = useState({
    email: "",
    role: "user", // Default role set to "user"
  });
  const fn = () => {
    setTimeout(() => {
      setErrorMessage("");
    }, 2000);
    return;
  };
  const url = "https://conciliation-backend.onrender.com";
  const navigate = useNavigate();
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

    try {
      setAlertStatement("Sending Reset Link.........");
      setShowAlert(true);
      const response = await axios.post(
        `${url}/api/auth/password/reset/request`,
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
      form.email = "";
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
      <Navbar />
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
            <div className="mb-4 relative">
              <div className="iconn absolute inset-y-0 left-0 px-3 py-3  ">
                <MdEmail />
              </div>

              <input
                type="email"
                value={form.email}
                onChange={onHandleChange}
                name="email"
                placeholder="Email"
                className="w-full px-10 py-2  rounded-md mb-4    bg-gray-800 "
                required
              />
            </div>
            <div className="mb-4 relative">
              <div className="iconn absolute inset-y-0 left-0 px-3 py-3  ">
                <RiUserSettingsFill />
              </div>
              <select
                value={form.role}
                onChange={onHandleChange}
                name="role"
                className="w-full px-10 py-2  rounded-md mb-4   bg-gray-800"
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
              Send Password Reset Link
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

export default Password_Reset_Link;
