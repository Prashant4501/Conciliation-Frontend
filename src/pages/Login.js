/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEyeSlash, FaEye, FaUser, FaLock } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { RiUserSettingsFill } from "react-icons/ri";
import Alert from "../utils/Alert";

const Login = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "user", // Default role set to "user"
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const url = "https://conciliation-backend.onrender.com";

  const onHandleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${url}/api/auth/login`,
        form,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data) {

        sessionStorage.setItem("loggedin", true);
        localStorage.setItem("role", response.data.role);
        switch (form.role) {
          case "admin":
            localStorage.setItem("admin", form.username);
            navigate("/admin");
            break;
          case "technician":
            localStorage.setItem("technician", form.username);
            navigate("/technician");
            break;
          default:
            localStorage.setItem("user", form.username);
            navigate("/user");
        }
        
      }
    } catch (error) {
      const msg = error.response.data.error;
      setErrorMessage(msg);
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
    }
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const Redirect = () => {
    navigate("/resetpasswordlink");
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-900 flex items-center justify-center min-h-screen overflow-y-hidden">
        <div className="container mx-auto mt-4">
          <form
            onSubmit={handleSubmit}
            method="POST"
            className="max-w-md mx-auto bg-gray-900 shadow-2xl rounded px-8 pt-6 pb-8 mb-4 border border-gray-800"
          >
            <h2 className="text-center text-2xl text-white mb-4">Login</h2>

            <div className="mb-4 relative text-gray-400">
              <div className="iconn absolute inset-y-0 left-0 px-3 py-3 text-gray-400">
                <FaUser />
              </div>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={onHandleChange}
                placeholder="Username"
                className="w-full px-10 py-2 rounded-md mb-4 bg-gray-800"
                required
              />
            </div>
            <div className="mb-4">
              <div className="relative">
                <div className="iconn absolute inset-y-0 left-0 px-3 py-3 text-gray-400">
                  <FaLock />
                </div>
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={onHandleChange}
                  placeholder="Password"
                  className="w-full px-10 py-2 rounded-md mb-4 bg-gray-800"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 px-3 py-2 text-gray-400"
                >
                  {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>
            <div className="mb-1 relative ">
              <div className="iconn absolute inset-y-0 left-0 px-3 py-3  text-gray-400 ">
                <RiUserSettingsFill />
              </div>
              <select
                value={form.role}
                name="role"
                onChange={onHandleChange}
                className="w-full px-10 py-2  rounded-md mb-4 bg-gray-800 dark:bg-gray-800 text-gray-400"
              >
                <option className="" value="user">User</option>
                <option value="admin">Admin</option>
                <option value="technician">Technician</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full mb-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              Login
            </button>
            <div className="mb-2 mt-2 text-right">
              <p>
                <a
                  className="text-blue-600 hover:text-red-300 cursor-pointer"
                  onClick={Redirect}
                >
                  Forgot Password ?
                </a>
              </p>
            </div>
            <div className="error mt-5 mb-5 h-2">
              {errorMessage && <p className="text-red-500 ">{errorMessage}</p>}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
