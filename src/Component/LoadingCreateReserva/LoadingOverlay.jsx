import React from "react"

const LoadingOverlay = ({title}) => {
    return (
      <div className="loading-opacity ">
        <h1 className="text-4xl md:text-5xl font-normal text-white">{title}</h1>
      </div>
    );
  };

  export default LoadingOverlay