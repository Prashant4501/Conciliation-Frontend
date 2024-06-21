import React, { useState, useEffect } from "react";

const GoToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 50) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed animate-bounce bottom-9 mb-5 right-7 z-20">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="p-3 bg-blue-500 text-white rounded-full w-10 h-auto shadow-lg  hover:bg-blue-700 focus:outline-none "
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default GoToTop;
