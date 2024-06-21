import { React, useEffect, useState } from "react";

const Alert = (props) => {
  return (
    <>
      <div role="alert" className="alert bg-gray-700 flex flex-nowrap z-50 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <span className="text-gray-400">{props.data}</span>
      </div>
    </>
  );
};

export default Alert;
