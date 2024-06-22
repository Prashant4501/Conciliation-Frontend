import {React,useEffect,useState} from "react";
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
  const navigate = useNavigate();
  const onclickHandle = () => {
    navigate("/register");
  };
  useEffect(() => {
    const loggedIn = sessionStorage.getItem("loggedin");
    setIsLoggedIn(loggedIn === "true");
  }, []);
  if(isLoggedIn){
    const role = localStorage.getItem("role")
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
  }else{
    document.title = "Conciliation";
  }
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
    </>
  );
};

export default Home;
