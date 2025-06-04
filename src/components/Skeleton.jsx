import React from "react";
import "../styles/Skeleton.css";

const Skeleton = ({ height = 200, width = "100%" }) => {
  return (
    <div
      className="skeleton"
      style={{
        height: `${height}px`,
        width: width,
      }}
    ></div>
  );
};

export default Skeleton;
