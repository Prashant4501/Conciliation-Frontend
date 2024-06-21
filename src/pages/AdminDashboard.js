/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import GoToTop from "../utils/GotoTop";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Alert from "../utils/Alert";
import { Zoom } from "react-awesome-reveal";

const AdminDashboard = () => {
  const [pending, setPending] = useState([]);
  const [assigned, setAssigned] = useState([]);
  const [resolved, setResolved] = useState([]);
  const [verified, setVerified] = useState([]);
  const [closed, setClosed] = useState([]);
  const [id, setId] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [admin, setAdmin] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertStatement, setAlertStatement] = useState("");
  const loginAlertStatement = "Admin logged in";
  const closedComplaintAlertStatement = "Complaint closed";
  const TechnicianAssignedAlertStatement = "Technician Assigned";
  const [techId, setTechId] = useState("");
  const [form, setForm] = useState({
    technicianId: "",
  });
  const url = "https://conciliation-backend.onrender.com";
  // ${url}
  const verify = {
    _id: {
      id,
    },
  };
  const onHandleChange = (e) => {
    if (e === " ") {
      return null;
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    }
  };
  const assign = {
    _id: {
      id,
    },
    technicianId: form.technicianId,
  };
  const onHandleClosedStatus = (e) => {
    setId(e);
  };
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("loggedin");
    const adm = localStorage.getItem("admin");
    setAlertStatement(loginAlertStatement);
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 1000);
    // if (adm) {
    //   setForm((prevForm) => ({ ...prevForm, technicianId: adm }));
    // }
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
      const admi = localStorage.getItem("admin");
      setAdmin(admi);

      const fetchComplaints = async () => {
        try {
          const response = await axios.get(
            `${url}/api/admin/complaints/pending`,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          setPending(response.data);
        } catch (error) {
          console.error("Error fetching complaints", error);
        }
      };
      fetchComplaints();
      document.title = "Conciliation |- Admin";
    } else {
      setIsLoggedIn(false);
      navigate("/home");
    }
  }, [navigate]);

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
      const response = await axios.get(
        `${url}/api/admin/complaints/pending`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setPending(response.data);
    } catch (error) {
      console.error("Error fetching complaints", error);
    }
  };
  const assignedFetch = async () => {
    try {
      const response = await axios.get(
        `${url}/api/admin/complaints/assigned`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setAssigned(response.data);
    } catch (error) {
      console.error("Error fetching complaints", error);
    }
  };
  const resolvedFetch = async () => {
    try {
      const response = await axios.get(
        `${url}/api/admin/complaints/resolved`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setResolved(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const verifiedFetch = async () => {
    try {
      const response = await axios.get(
        `${url}/api/admin/complaints/verified`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setVerified(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const closedFetch = async () => {
    try {
      const response = await axios.get(
       `${url}/api/admin/complaints/closed`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setClosed(response.data);
    } catch (error) {
      console.error(error.data.error);
    }
  };

  const assignNewTechnician = async (e) => {
    e.preventDefault();
    if (assign.technicianId === "") {
      setAlertStatement("choose Technician First");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    } else {
      try {
        const response = await axios.post(
          `${url}/api/admin/complaints/assignedtechnician`,
          assign,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setAlertStatement(TechnicianAssignedAlertStatement);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 1000);
        pendingFetch();
      } catch (error) {
        console.log(error.data);
      }
    }
  };

  const closedUpdateStatus = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
       `${url}/api/admin/complaints/closecomplain`,
        verify,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setAlertStatement(closedComplaintAlertStatement);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 1000);
      verifiedFetch();
    } catch (error) {
      console.log(error.data);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-900 min-h-screen  overflow-x-hidden flex flex-wrap flex-col ">
        {/* Heading */}
        <div className="my-5 bg-gray-900 text-center font-mono font-bold text-xs md:text-xl  mb-5  text-gray-500">
          Admin Dashboard
        </div>
        {/* Navigation Bar for complaint */}
        <div className="mb-4 border-b border-gray-700 md:flex md:justify-center  flex justify-center my-2">
          <ul
            className=" w-72 sm:w-96 md:w-full flex flex-no-wrap -mb-px pb-3  text-sm font-medium text-center md:justify-center   md:flex md:align-middle overflow-x-scroll sm:overflow-hidden md:overflow-hidden  "
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
                  verifiedFetch();
                  handleTabClick(3);
                }}
              >
                <strong className="text-nowrap">Verified</strong>
              </a>
            </li>
            <li
              key="4"
              className="me-2   hover:text-red-500"
              role="presentation"
            >
              <a
                className={`inline-block p-4 py-2 rounded-3xl    hover:text-blue-300 hover:border-blue-300 dark:hover:text-blue-300 cursor-pointer ${
                  activeTab === 4
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
                  closedFetch();
                  handleTabClick(4);
                }}
              >
                <strong className="text-nowrap">Closed</strong>
              </a>
            </li>
          </ul>
        </div>
        {/* Showing stages of complain */}
        <div className="showComplaint  overflow-y-auto">
          {/* Pending Complain Section -- Technician should be assigned */}
          <div
            className={`  p-4 rounded-lg bg-gray-900 dark:bg-gray-900 flex flex-wrap justify-center align-middle ${
              activeTab === 0 ? "visible" : "hidden"
            }`}
            id="dashboard"
            role="tabpanel"
            aria-labelledby="dashboard-tab"
          >
            {pending.length === 0 ? (
              <div className="text-gray-500 text-center p-6">No data found</div>
            ) : (
              pending.map((complaint) => (
                <div
                  key={complaint.id}
                  className="bg-gray-800 p-6 border-2 sm:w-52 md:w-96   rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 sm:m-5 m-10 text-wrap border-gray-700"
                >
                  <h3 className="sm:text-lg md:text-xl font-semibold text-gray-500 mb-2 text-center">
                    <span className="font-semibold text-red-400"></span>
                    {complaint.complaint_id}
                  </h3>
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

                  <p className="text-sm text-gray-300">
                    <span className="font-semibold text-yellow-500 mr-1">
                      Date:
                    </span>
                    {moment(complaint.complaintDate).format("MMMM Do, YYYY")}
                  </p>
                  <p className="bg-red-600 h-0.5 mt-2">
                    <span>
                      <ul></ul>
                    </span>
                  </p>
                  {/* 
                  <p className="text-sm text-blue-300 my-3 border-b-2 bg-slate-600 rounded-3xl text-center">
                    Please Assign technician
                  </p> */}
                  <div className="technician mt-5">
                    <form
                      method="POST"
                      onSubmit={assignNewTechnician}
                      className="mt-2"
                    >
                      <div className="tech">
                        <select
                          name="technicianId"
                          value={form.technicianId}
                          onChange={onHandleChange}
                          className="w-full px-10 py-2  rounded-md mb-4   bg-gray-600"
                        >
                          <option value="">Select Technician</option>
                          <option value="tech1">Technician 1</option>
                          <option value="tech2">Technician 2</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        className="font-semibold btn border-none border-gray-400 text-blue-500 mr-1 bbg-gray-800"
                        onClick={(e) => {
                          onHandleClosedStatus(complaint._id);
                        }}
                      >
                        Assign Technician
                      </button>
                    </form>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Technician  Assigned Complain Section */}
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
                  <h3 className="sm:text-lg md:text-xl font-semibold text-gray-500 mb-2 text-center">
                    <span className="font-semibold text-red-400"></span>
                    {complaint.complaint_id}
                  </h3>
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
                  <div
                    tabIndex={0}
                    className="collapse collapse-arrow border-base-300 bg-gray-800 rounded-lg -ml-2"
                  >
                    <div className="collapse-title text-sm font-medium text-gray-200 -ml-2">
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
                  <p className="text-gray-400  leading-relaxed mb-3 text-right">
                    Technician Has been Assigned
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Resolved by technician Complain Section */}
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
                  <h3 className="sm:text-lg md:text-xl font-semibold text-gray-500 mb-2 text-center">
                    <span className="font-semibold text-red-400"></span>
                    {complaint.complaint_id}
                  </h3>
                  <h3 className="sm:text-lg   md:text-xl font-semibold text-gray-200 mb-2">
                    {complaint.msg}
                  </h3>
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
                  <div
                    tabIndex={0}
                    className="collapse collapse-arrow border-base-300 bg-gray-800 rounded-lg -ml-2"
                  >
                    <div className="collapse-title text-sm font-medium text-gray-200 -ml-2">
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
                  <p className="text-gray-400  leading-relaxed mb-3 text-right">
                    Complain has been Resolved
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Verified Complaint by USER  Complain Section */}
          <div
            className={`  p-4 rounded-lg bg-gray-900 dark:bg-gray-900 flex flex-wrap justify-center align-middle ${
              activeTab === 3 ? "visible" : "hidden"
            }`}
            id="dashboard"
            role="tabpanel"
            aria-labelledby="dashboard-tab"
          >
            {verified.length === 0 ? (
              <div className="text-gray-500 text-center p-6">No data found</div>
            ) : (
              verified.map((complaint) => (
                <div
                  key={complaint.id}
                  className="bg-gray-800 p-6 border-2 sm:w-52 md:w-96   rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 sm:m-5 m-10 text-wrap border-gray-700"
                >
                  <h3 className="sm:text-lg md:text-xl font-semibold text-gray-500 mb-2 text-center">
                    <span className="font-semibold text-red-400"></span>
                    {complaint.complaint_id}
                  </h3>
                  <h3 className="sm:text-lg   md:text-xl font-semibold text-gray-200 mb-2">
                    {complaint.msg}
                  </h3>
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
                  <div
                    tabIndex={0}
                    className="collapse collapse-arrow border-base-300 bg-gray-800 rounded-lg -ml-2"
                  >
                    <div className="collapse-title text-sm font-medium text-gray-200 -ml-2">
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
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-red-300 m-2 text-right">
                    <span>Verified by user</span>
                  </p>
                  <p className="text-sm text-red-300 m-2 ">
                    <form method="POST" onSubmit={closedUpdateStatus}>
                      <button
                        type="submit"
                        className="font-semibold btn border-none border-gray-400 text-blue-500 mr-1 bbg-gray-800"
                        onClick={(e) => {
                          onHandleClosedStatus(complaint._id);
                        }}
                      >
                        Close Complain
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
              activeTab === 4 ? "visible" : "hidden"
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
                  <h3 className="sm:text-lg md:text-xl font-semibold text-gray-500 mb-2 text-center">
                    <span className="font-semibold text-red-400"></span>
                    {complaint.complaint_id}
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

                  <div
                    tabIndex={0}
                    className="collapse collapse-arrow border-base-300 bg-gray-800 rounded-lg -ml-3"
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
                  <p className="text-sm text-red-600 my-5 text-right">
                    Complaint has been closed
                  </p>
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

export default AdminDashboard;
