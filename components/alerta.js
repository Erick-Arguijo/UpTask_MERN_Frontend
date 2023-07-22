import React from "react";

const Alerta = ({ alerta }) => {
  return (
    <div
      className={`border-b-2 pl-1 mx-auto max-w-fit ${
        alerta.ok ? "border-sky-600" : "border-red-500"
      } `}
    >
      <h1
        className={` font-bold text-lg flex mx-auto ${
          alerta.ok ? "text-sky-600" : "text-red-500"
        }`}
      >
        {alerta.ok === false ?
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 mr-2 mt-0.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg>
        :
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 mr-2 mt-0.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>
        }
        {alerta.msj}
      </h1>
    </div>
  );
};

export default Alerta;
