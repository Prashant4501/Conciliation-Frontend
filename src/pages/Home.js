import { React, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import Contact from "../components/Contact";
import GoToTop from "../utils/GotoTop";
import ReactGA from "react-ga";

const Home = () => {
  const TRACKING_ID = "G-R44VTCVSNZ";
  ReactGA.initialize(TRACKING_ID);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const onclickHandle = () => {
    navigate("/register");
  };

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("loggedin");
    setIsLoggedIn(loggedIn === "true");

    // Check if modal should be shown
    const hasVisited = sessionStorage.getItem("hasVisited");
    if (!hasVisited) {
      setShowModal(true);
      sessionStorage.setItem("hasVisited", "true"); // Set visited flag
    }
  }, []);

  useEffect(() => {
    // Prevent scrolling when modal is open
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showModal]);

  if (isLoggedIn) {
    const role = localStorage.getItem("role");
    switch (role) {
      case "admin":
        navigate("/admin");
        break;
      case "technician":
        navigate("/technician");
        break;
      default:
        navigate("/user");
    }
  } else {
    document.title = "Conciliation";
  }

  const closeModal = () => {
    setShowModal(false);
  };

  // Modal Component
  const Modal = ({ onClose }) => {
    return (
      <div
        className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${showModal ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full transform transition-all duration-300 ease-in-out scale-100 relative">
          <button
            className="absolute top-2 right-2 text-gray-400 hover:text-white transition duration-300"
            onClick={onClose}
          >
            {/* Close Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <h2 className="text-xl font-bold mb-4 text-center">Notice</h2>
          <p className="mb-4">
            Login might take a little time as the server is hosted for free.
            Please keep patience.
          </p>
          <p>For new User you can create by clicking get started</p>
          <p className="font-bold m-3 text-blue-500 text-center">Trial Credentials:</p>
          <ul className="list-disc list-inside mb-4">
            <li className="font-bold list-none">Admin:</li>
            <ul className="list-disc list-inside">
              <li>
                Username: <span className="font-mono">gaurav</span>
              </li>
              <li>
                Password: <span className="font-mono">123</span>
              </li>
            </ul>
            <li className="font-bold list-none mt-1">User:</li>
            <ul className="list-disc list-inside">
              <li>
                Username: <span className="font-mono">user1</span>
              </li>
              <li>
                Password: <span className="font-mono">1234</span>
              </li>
            </ul>
            <li className="font-bold list-none mt-1">Technician:</li>
            <ul className="list-disc list-inside">
              <li>
                Username: <span className="font-mono">tech1</span>
              </li>
              <li>
                Password: <span className="font-mono">123</span>
              </li>
            </ul>
          </ul>
       {  /* <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
            onClick={onClose}
          >
            Close
          </button>*/}
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-900 flex flex-col items-center justify-center min-h-screen overflow-y-hidden">
        {/* Hero Section */}
        <div className="text-center py-20">
          <h1 className="text-white text-5xl font-bold mb-4">
            Get Your Complaints Resolved
          </h1>
          <p className="text-gray-400 text-xl mb-8">
            We help you resolve your issues quickly and effectively.
          </p>
          <button
            className="bg-blue-500 text-white py-3 px-6 rounded-full hover:bg-blue-600 transition duration-300"
            onClick={onclickHandle}
          >
            Get Started
          </button>
        </div>

        {/* Information Section */}
        <div className="bg-gray-900 py-10 w-full">
          <div className="max-w-4xl mx-auto text-center px-6">
            <h2 className="text-3xl text-white font-semibold mb-6">
              Why Choose Us?
            </h2>
            <p className="text-gray-400 text-lg mb-4">
              Our platform provides a simple and efficient way to address your
              complaints.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 ">
              <div className="bg-gray-700 p-6 rounded-lg hover:scale-105">
                <h3 className="text-xl text-white font-bold mb-2">
                  Fast Resolution
                </h3>
                <p className="text-gray-400">
                  We ensure your complaints are resolved quickly with our
                  dedicated support team.
                </p>
              </div>
              <div className="bg-gray-700 p-6 rounded-lg hover:scale-105">
                <h3 className="text-xl text-white font-bold mb-2">
                  Reliable Support
                </h3>
                <p className="text-gray-400">
                  Our team is available 24/7 to assist you with any issues you
                  may encounter.
                </p>
              </div>
              <div className="bg-gray-700 p-6 rounded-lg hover:scale-105">
                <h3 className="text-xl text-white font-bold mb-2">
                  User Friendly
                </h3>
                <p className="text-gray-400">
                  Our platform is designed to be easy to use, making the
                  complaint process straightforward.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Contact />
      <Footer />
      <GoToTop />

      {/* Modal for First-Time Visitors */}
      {showModal && <Modal onClose={closeModal} />}
    </>
  );
};

export default Home;
