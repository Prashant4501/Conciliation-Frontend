/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
// import api from "../services/api";
import axios from "axios";
import { Zoom } from "react-awesome-reveal";
import Alert from "../utils/Alert";
import ReactGA from "react-ga";

const ComplaintForm = ({ props }) => {
  const TRACKING_ID = "G-R44VTCVSNZ";
  ReactGA.initialize(TRACKING_ID);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [username, setUserName] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  // to get date when complaint is being raised
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

  // complaint detailed data
  const complaintData = {
    complaint_id: username,
    title: name,
    details: description,
    file: file,
    status: "pending",
    technicianAssigned: false,
    technicianId: "",
    verified: false,
    complaintClosed: false,
    complaintDate: time(),
  };
  // const url = "https://conciliation-backend.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (file && file.size > 10 * 1024 * 1024) {
      setError("File size exceeds 10MB.");
      return;
    }
    try {
      console.log(complaintData);
      const response = await axios.post(
        process.env.USER_COMPLAINT_RAISE_API,
        complaintData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setError(response.data.message);
      setName("");
      setDescription("");
      setError("");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    } catch (error) {
      console.error("Error raising complaint", error);
      setError("Error raising complaint. Please try again later.");
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    setUserName(user);
  }, []);

  return (
    <>
      <a
        className="inline-block p-4 py-2 ml-3 rounded-3xl  hover:text-blue-300 hover:border-blue-300 dark:hover:text-blue-300 cursor-pointer  border-white  text-white bg-gray-800  ease-in delay-200 after:transition-all hover:after:duration-700 transition-all duration-300 hover:bg-blue-800"
        role="tab"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        Raise a complain
      </a>
      <dialog id="my_modal_3" className="modal overflow-hidden">
        <div className="modal-box  bg-gray-900 ScrollbarsCustom native trackYVisible trackXVisible">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-gray-400">
              ✕
            </button>
          </form>
          <div className="m-5 bg-gray-900">
            <h2 className="text-2xl font-bold mb-5 text-center text-gray-300">
              Submit a Complaint
            </h2>
            <form onSubmit={handleSubmit}>
              <label
                htmlFor="name"
                className="form-control w-full max-w-xs mb-2 text-gray-300"
              >
                <span className="label-text text-gray-300"> Tittle</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-2 mb-4 bg-gray-800  rounded-md text-gray-300"
              />

              <label
                htmlFor="description"
                className="form-control w-full max-w-xs mb-2 text-gray-300"
              >
                <span className="label-text text-gray-300"> Description</span>
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full p-2 mb-4  bg-gray-800 rounded-md text-gray-300"
              ></textarea>

              <label className="form-control w-full max-w-xs  ">
                <div className="label">
                  <span className="label-text text-gray-300">
                    Attach a photo or video (less than 10MB)
                  </span>
                </div>
              </label>
              <input
                type="file"
                id="file"
                name="file"
                accept="image/*,video/*"
                onChange={(e) => setFile(e.target.files[0])}
                className=" file-input w-full p-2 mb-4 border bg-gray-800   rounded-md border-transparent text-gray-300 "
              />

              {error && <p className="text-red-500 mb-4">{error}</p>}

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
              >
                Raise a complain
              </button>
            </form>
          </div>
        </div>
      </dialog>
      <div
        className={`fixed top-10 left-1/2 transform -translate-x-1/2 h-6 w-96 flex justify-center ${
          showAlert ? "fade-in" : "fade-out"
        }`}
      >
        <Zoom>
          <Alert data="Complaint Raised Successfully" />
        </Zoom>
      </div>
    </>
  );
};

export default ComplaintForm;
