/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import ComplaintForm from "../components/ComplaintForm";
import Navbar from "../components/Navbar";
import GoToTop from "../utils/GotoTop";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Alert from "../utils/Alert";
import { Zoom } from "react-awesome-reveal";
import ReactGA from "react-ga";

const UserDashboard = () => {
    const TRACKING_ID = "G-R44VTCVSNZ";
    ReactGA.initialize(TRACKING_ID);
  const [complaints, setComplaints] = useState([]);
  const [assigned, setAssigned] = useState([]);
  const [resolved, setResolved] = useState([]);
  const [closed, setClosed] = useState([]);
  const [id, setId] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertStatement, setAlertStatement] = useState("");
  const complaintVerificationAlertStatement = "Verification Successful";
  const loginAlertStatement = "User Logged in";
  const ComplaintsList = ({ complaints }) => {
    const [complaintImages, setComplaintImages] = useState({});
  };
  const url = "https://conciliation-backend.onrender.com";

  // ${url}

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  //* User name of user
  const [form, setForm] = useState({
    username: "",
  });

  // ID of Each complain for updating
  const verify = {
    _id: {
      id,
    },
  };
  const onHandleVerification = (e) => {
    setId(e);
  };
  useEffect(() => {
    setAlertStatement(loginAlertStatement);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 1000);
    const loggedIn = sessionStorage.getItem("loggedin");
    const us = localStorage.getItem("user");
    if (us) {
      setForm((prevForm) => ({ ...prevForm, username: us }));
    }
    if (loggedIn === "true") {
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
      setIsLoggedIn(true);
      const usern = localStorage.getItem("user");
      setUser(usern);
      const fetchComplaints = async () => {
        try {
          const response = await axios.get(
            `${url}/api/user/complaints/pending`,
            {
              headers: {
                "Content-Type": "application/json",
              },
              params: { username: us },
            }
          );
          setComplaints(response.data);
        } catch (error) {
          console.error("Error fetching complaints", error);
        }
      };
      fetchComplaints();
      document.title = "Conciliation |- User";
    } else {
      setIsLoggedIn(false);
      navigate("/home");
    }
  }, [navigate]);

  if (!isLoggedIn) {
    return null; // or a loading spinner if you prefer
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "text-yellow-600";
      case "assigned":
        return "text-blue-600";
      case "resolved":
        return "text-green-600";
      case "closed":
        return "text-gray-600";
      default:
        return "text-gray-600";
    }
  };

  const pendingFetch = async () => {
    try {
      const response = await axios.get(`${url}/api/user/complaints/pending`, {
        headers: {
          "Content-Type": "application/json",
        },
        params: form,
      });
      setComplaints(response.data);
    } catch (error) {
      console.error(error.data.error);
    }
  };

  const assignedFetch = async () => {
    try {
      const response = await axios.get(`${url}/api/user/complaints/assigned`, {
        headers: {
          "Content-Type": "application/json",
        },
        params: form,
      });
      setAssigned(response.data);
    } catch (error) {
      console.error(error.data.error);
    }
  };
  const resolvedFetch = async () => {
    try {
      const response = await axios.get(`${url}/api/user/complaints/resolved`, {
        headers: {
          "Content-Type": "application/json",
        },
        params: form,
      });
      setResolved(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const closededFetch = async () => {
    try {
      const response = await axios.get(`${url}/api/user/complaints/closed`, {
        headers: {
          "Content-Type": "application/json",
        },
        params: form,
      });
      setClosed(response.data);
    } catch (error) {
      console.error(error.data.error);
    }
  };

  const verification = async (e) => {
    e.preventDefault();
    try {
      setAlertStatement("Verifying...");
      setShowAlert(true);
      console.log(verify);
      const response = await axios.post(
        `${url}/api/user/complaints/verified`,
        verify,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setAlertStatement(complaintVerificationAlertStatement);
      // setShowAlert(true);
      resolvedFetch();
      setTimeout(() => {
        setShowAlert(false);
      }, 1000);
    } catch (error) {
      console.log(error.data);
    }
  };
  const reopenComplaint = async (e) => {
    e.preventDefault();
    try {
      setAlertStatement("Reopening...")
      setShowAlert(true);
      console.log(verify);
      const response = await axios.post(
        `${url}/api/user/complaints/reopen`,
        verify,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setAlertStatement("Complain reopened");
      setShowAlert(true);
      resolvedFetch();
      setTimeout(() => {
        setShowAlert(false);
      }, 1000);
    } catch (error) {
      console.log(error.data);
    }
  };

  const getImage = async (fileName, setImage) => {
    try {
      const response = await axios.get(`${url}/api/complaints/image`, {
        headers: {
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
        params: { fileName },
      });

      const blob = new Blob([response.data], { type: "image/jpeg" });
      const url = URL.createObjectURL(blob);
      setImage(url);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-900 min-h-screen  overflow-x-hidden flex flex-wrap flex-col ">
        {/* Heading */}
        <div className="my-5 bg-gray-900 text-center font-mono font-bold text-xs md:text-xl overflow-x-hidden mr-5 text-gray-500 ">
          User Dashboard
        </div>
        {/* Raise Complaint Button */}
        <div className="compform pl-5 mb-7">
          <ComplaintForm username={form.username} />
        </div>
        {/* Navigation Bar for complaint */}
        <div className="mb-4 border-b border-gray-700 md:flex md:justify-center  flex justify-center mt-2 border-1 ">
          {/* Navigation Bar for complaint */}
          <ul
            className=" w-72 sm:w-96 flex flex-no-wrap -mb-px pb-3  text-sm font-medium text-center   md:flex md:align-middle overflow-x-scroll sm:overflow-hidden md:overflow-hidden  mb-5 "
            id="default-tab"
            data-tabs-toggle="#default-tab-content"
            role="tablist"
            key={15}
          >
            <li key="0" className="me-2 hover:text-red-500" role="presentation">
              <a
                className={`inline-block p-4 py-2  rounded-3xl  hover:text-blue-300 hover:border-blue-300 dark:hover:text-blue-300 cursor-pointer ${
                  activeTab === 0
                    ? "border-blue-300 text-blue-300 ease-in bg-blue-800 after:transition-all after:duration-150 transition-all duration-150"
                    : "border-white text-white bg-gray-800 ease-in after:transition-all after:duration-150 transition-all duration-150"
                }`}
                id="profile-tab"
                data-tabs-target="#profile"
                type="button"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
                onClick={() => {
                  pendingFetch();
                  handleTabClick(0);
                }}
              >
                <strong>Pending</strong>
              </a>
            </li>
            <li key="1" className="me-2 hover:text-red-500" role="presentation">
              <a
                className={`inline-block p-4 py-2  rounded-3xl  hover:text-blue-300 hover:border-blue-300 dark:hover:text-blue-300 cursor-pointer ${
                  activeTab === 1
                    ? "border-blue-300 text-blue-300 ease-in bg-blue-800 after:transition-all after:duration-150 transition-all duration-150"
                    : "border-white text-white bg-gray-800 ease-in after:transition-all after:duration-150 transition-all duration-150"
                }`}
                id="dashboard-tab"
                data-tabs-target="#dashboard"
                type="button"
                role="tab"
                aria-controls="dashboard"
                aria-selected="false"
                onClick={() => {
                  assignedFetch();
                  handleTabClick(1);
                }}
              >
                <strong className="">Assigned</strong>
              </a>
            </li>
            <li
              key="2"
              className="me-2   hover:text-red-500"
              role="presentation"
            >
              <a
                className={`inline-block p-4 py-2 rounded-3xl    hover:text-blue-300 hover:border-blue-300 dark:hover:text-blue-300 cursor-pointer ${
                  activeTab === 2
                    ? "border-blue-300 text-blue-300 ease-in bg-blue-800 after:transition-all after:duration-150 transition-all duration-150"
                    : "border-white text-white bg-gray-800 ease-in after:transition-all after:duration-150 transition-all duration-150"
                }`}
                id="settings-tab"
                data-tabs-target="#settings"
                type="button"
                role="tab"
                aria-controls="settings"
                aria-selected="false"
                onClick={() => {
                  resolvedFetch();
                  handleTabClick(2);
                }}
              >
                <strong className="text-nowrap">Resolved</strong>
              </a>
            </li>
            <li
              key="3"
              className="me-2   hover:text-red-500"
              role="presentation"
            >
              <a
                className={`inline-block p-4 py-2 rounded-3xl    hover:text-blue-300 hover:border-blue-300 dark:hover:text-blue-300 cursor-pointer ${
                  activeTab === 3
                    ? "border-blue-300 text-blue-300 ease-in bg-blue-800 after:transition-all after:duration-150 transition-all duration-150"
                    : "border-white text-white bg-gray-800 ease-in after:transition-all after:duration-150 transition-all duration-150"
                }`}
                id="settings-tab"
                data-tabs-target="#settings"
                type="button"
                role="tab"
                aria-controls="settings"
                aria-selected="false"
                onClick={() => {
                  closededFetch();
                  handleTabClick(3);
                }}
              >
                <strong className="text-nowrap">Closed</strong>
              </a>
            </li>
          </ul>
        </div>
        {/* Showing stages of complain */}
        <div className="showComplaint  overflow-y-auto">
          {/* Pending Complain Section */}
          <div
            className={`  p-4 rounded-lg bg-gray-900 dark:bg-gray-900 flex flex-wrap justify-center align-middle ${
              activeTab === 0 ? "visible" : "hidden"
            }`}
            id="dashboard"
            role="tabpanel"
            aria-labelledby="dashboard-tab"
          >
            {complaints.length === 0 ? (
              <div className="text-gray-500 text-center p-6">No data found</div>
            ) : (
              complaints.map((complaint) => (
                <div
                  key={complaint.id}
                  className="bg-gray-800 p-6 border-2 sm:w-52 md:w-96   rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 sm:m-5 m-10 text-wrap border-gray-700"
                >
                  <div class="rounded-lg h-64 overflow-hidden ">
                    <img
                      alt="content"
                      width={400}
                      height={400}
                      className="object-cover object-center h-full w-full"
                      src="https://conciliation-backend.onrender.com/uploads/668ab5af637b74464ad21dc1.jpeg"
                    />
                  </div>
                  <h3 className="sm:text-lg   md:text-xl font-semibold text-gray-200 mb-2">
                    {complaint.title}
                  </h3>
                  <p className="text-gray-400  leading-relaxed mb-3">
                    {complaint.details}
                  </p>
                  <p
                    className={`text-sm mb-2 ${getStatusColor(complaint.status)}`}
                  >
                    <span className="font-semibold">Status:</span>{" "}
                    {complaint.status}
                  </p>
                  <p className="sm:text-lg md:text-xl font-semibold text-gray-500 mb-2 text-left text-sm">
                    <span className="font-semibold text-red-600 text-sm ">
                      ID:
                    </span>
                    <span className="font-semibold text-red-400 text-sm ml-2">
                      {complaint._id}
                    </span>
                  </p>
                  {/* TIMELINE */}
                  <div
                    tabIndex={0}
                    className="collapse collapse-arrow border-base-300 bg-gray-800 rounded-lg"
                  >
                    <div className="collapse-title text-sm font-medium text-gray-200">
                      Timeline
                    </div>
                    <div className="collapse-content">
                      <div className="text-sm text-gray-300 space-y-2">
                        <p>
                          <span className="font-semibold text-yellow-500 mr-1">
                            Raised At:
                          </span>
                          {moment(complaint.complaintDate).format(
                            "MMMM Do, YYYY"
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {/* Assigned Complain Section */}
          <div
            className={`  p-4 rounded-lg bg-gray-900 dark:bg-gray-900 flex flex-wrap justify-center align-middle ${
              activeTab === 1 ? "visible" : "hidden"
            }`}
            id="dashboard"
            role="tabpanel"
            aria-labelledby="dashboard-tab"
          >
            {assigned.length === 0 ? (
              <div className="text-gray-500 text-center p-6">No data found</div>
            ) : (
              assigned.map((complaint) => (
                <div
                  key={complaint.id}
                  className="bg-gray-800 p-6 border-2 sm:w-52 md:w-96   rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 sm:m-5 m-10 text-wrap border-gray-700"
                >
                  <h3 className="sm:text-lg   md:text-xl font-semibold text-gray-200 mb-2">
                    {complaint.title}
                  </h3>
                  <p className="text-gray-400  leading-relaxed mb-3">
                    {complaint.details}
                  </p>

                  <p
                    className={`text-sm mb-2 ${getStatusColor(complaint.status)}`}
                  >
                    <span className="font-semibold">Status:</span>{" "}
                    {complaint.status}
                  </p>
                  <p className="sm:text-lg md:text-xl font-semibold text-gray-500 mb-2 text-left text-sm">
                    <span className="font-semibold text-red-600 text-sm ">
                      ID:
                    </span>
                    <span className="font-semibold text-red-400 text-sm ml-2">
                      {complaint._id}
                    </span>
                  </p>
                  <p
                    className={`text-sm mb-2 ${getStatusColor(complaint.status)}`}
                  >
                    <span className="font-semibold text-gray-400 mr-2">
                      Technician Name :
                    </span>
                    {complaint.technicianId}
                  </p>
                  <div
                    tabIndex={0}
                    className="collapse collapse-arrow border-base-300 bg-gray-800 rounded-lg"
                  >
                    <div className="collapse-title text-sm font-medium text-gray-200">
                      Timeline
                    </div>
                    <div className="collapse-content">
                      <div className="text-sm text-gray-300 space-y-2">
                        <p>
                          <span className="font-semibold text-yellow-500 mr-1">
                            Raised At:
                          </span>
                          {moment(complaint.complaintDate).format(
                            "MMMM Do, YYYY"
                          )}
                        </p>
                        <p>
                          <span className="font-semibold text-yellow-500 mr-1">
                            Assigned At:
                          </span>
                          {moment(complaint.technicianAssignedAt).format(
                            "MMMM Do, YYYY"
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {/* Resolved Complain Section */}
          <div
            className={`  p-4 rounded-lg bg-gray-900 dark:bg-gray-900 flex flex-wrap justify-center align-middle ${
              activeTab === 2 ? "visible" : "hidden"
            }`}
            id="dashboard"
            role="tabpanel"
            aria-labelledby="dashboard-tab"
          >
            {resolved.length === 0 ? (
              <div className="text-gray-500 text-center p-6">No data found</div>
            ) : (
              resolved.map((complaint) => (
                <div
                  key={complaint._id}
                  className="bg-gray-800 p-6 border-2 sm:w-52 md:w-96   rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 sm:m-5 m-10 text-wrap border-gray-700"
                >
                  <h3 className="sm:text-lg   md:text-xl font-semibold text-gray-200 mb-2">
                    {complaint.msg}
                  </h3>
                  <h3 className="sm:text-lg   md:text-xl font-semibold text-gray-200 mb-2">
                    {complaint.title}
                  </h3>
                  <p className="text-gray-400 bg-gray-700 rounded  leading-relaxed mb-3">
                    {complaint.details}
                  </p>
                  <p
                    className={`text-sm mb-2 ${getStatusColor(complaint.status)}`}
                  >
                    <span className="font-semibold">Status:</span>{" "}
                    {complaint.status}
                  </p>
                  <p className="sm:text-lg md:text-xl font-semibold text-gray-500 mb-2 text-left text-sm">
                    <span className="font-semibold text-red-600 text-sm ">
                      ID:
                    </span>
                    <span className="font-semibold text-red-400 text-sm ml-2">
                      {complaint._id}
                    </span>
                  </p>
                  <p
                    className={`text-sm mb-2 ${getStatusColor(complaint.status)}`}
                  >
                    <span className="font-semibold text-gray-400 mr-2">
                      Technician Name :
                    </span>
                    {complaint.technicianId}
                  </p>
                  <div
                    tabIndex={0}
                    className="collapse collapse-arrow border-base-300 bg-gray-800 rounded-lg"
                  >
                    <div className="collapse-title text-sm font-medium text-gray-200">
                      Timeline
                    </div>
                    <div className="collapse-content">
                      <div className="text-sm text-gray-300 space-y-2">
                        <p>
                          <span className="font-semibold text-yellow-500 mr-1">
                            Raised At:
                          </span>
                          {moment(complaint.complaintDate).format(
                            "MMMM Do, YYYY"
                          )}
                        </p>
                        <p>
                          <span className="font-semibold text-yellow-500 mr-1">
                            Assigned At:
                          </span>
                          {moment(complaint.technicianAssignedAt).format(
                            "MMMM Do, YYYY"
                          )}
                        </p>
                        <p>
                          <span className="font-semibold text-yellow-500 mr-1">
                            Resolved At:
                          </span>
                          {moment(complaint.complainResolvedAt).format(
                            "MMMM Do, YYYY"
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-red-300 m-2 flex flex-wrap justify-between mt-3">
                    <form method="POST" onSubmit={verification}>
                      <button
                        type="submit"
                        className="font-semibold btn border-none border-gray-400 text-blue-500 mr-1 bg-gray-950 dark:bg-gray-950 hover:bg-gray-900"
                        onClick={(e) => {
                          onHandleVerification(complaint._id);
                        }}
                      >
                        verify
                      </button>
                    </form>
                    <form method="POST" onSubmit={reopenComplaint} className="">
                      <button
                        type="submit"
                        className="font-semibold btn border-none border-gray-400 text-blue-500 mr-1 bg-gray-950 dark:bg-gray-950 hover:bg-gray-900"
                        onClick={(e) => {
                          onHandleVerification(complaint._id);
                        }}
                      >
                        Reopen
                      </button>
                    </form>
                  </p>
                </div>
              ))
            )}
          </div>
          {/* Closed Complain Section */}
          <div
            className={`  p-4 rounded-lg bg-gray-900 dark:bg-gray-900 flex flex-wrap justify-center align-middle ${
              activeTab === 3 ? "visible" : "hidden"
            }`}
            id="dashboard"
            role="tabpanel"
            aria-labelledby="dashboard-tab"
          >
            {closed.length === 0 ? (
              <div className="text-gray-500 text-center p-6">No data found</div>
            ) : (
              closed.map((complaint) => (
                <div
                  key={complaint.id}
                  className="bg-gray-800 p-6 border-2 sm:w-52 md:w-96 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 sm:m-5 m-10 text-wrap border-gray-700"
                >
                  <h3 className="sm:text-lg md:text-xl font-semibold text-gray-200 mb-2">
                    {complaint.msg}
                  </h3>

                  <h3 className="sm:text-lg md:text-xl font-semibold text-gray-200 mb-2">
                    {complaint.title}
                  </h3>

                  <p className="text-gray-400 leading-relaxed mb-3">
                    {complaint.details}
                  </p>

                  <p
                    className={`text-sm mb-2 ${getStatusColor(complaint.status)}`}
                  >
                    <span className="font-semibold">Status:</span>{" "}
                    {complaint.status}
                  </p>
                  <p className="sm:text-lg md:text-xl font-semibold text-gray-500 mb-2 text-left text-sm">
                    <span className="font-semibold text-red-600 text-sm ">
                      ID:
                    </span>
                    <span className="font-semibold text-red-400 text-sm ml-2">
                      {complaint._id}
                    </span>
                  </p>

                  <p className="text-sm text-red-600 my-5 text-center">
                    Complaint has been closed
                  </p>

                  <div
                    tabIndex={0}
                    className="collapse collapse-arrow border-base-300 bg-gray-800 rounded-lg"
                  >
                    <div className="collapse-title text-sm font-medium text-gray-200">
                      Timeline
                    </div>
                    <div className="collapse-content">
                      <div className="text-sm text-gray-300 space-y-2">
                        <p>
                          <span className="font-semibold text-yellow-500 mr-1">
                            Raised At:
                          </span>
                          {moment(complaint.complaintDate).format(
                            "MMMM Do, YYYY"
                          )}
                        </p>
                        <p>
                          <span className="font-semibold text-yellow-500 mr-1">
                            Assigned At:
                          </span>
                          {moment(complaint.technicianAssignedAt).format(
                            "MMMM Do, YYYY"
                          )}
                        </p>
                        <p>
                          <span className="font-semibold text-yellow-500 mr-1">
                            Resolved At:
                          </span>
                          {moment(complaint.complainResolvedAt).format(
                            "MMMM Do, YYYY"
                          )}
                        </p>
                        <p>
                          <span className="font-semibold text-yellow-500 mr-1">
                            Verified At:
                          </span>
                          {moment(complaint.verifiedByUserAt).format(
                            "MMMM Do, YYYY"
                          )}
                        </p>
                        <p>
                          <span className="font-semibold text-yellow-500 mr-1">
                            Closed At:
                          </span>
                          {moment(complaint.complainClosedAt).format(
                            "MMMM Do, YYYY"
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      {/* GoTo Top utility */}
      <GoToTop />
      {/* Alert Utility */}
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

export default UserDashboard;
