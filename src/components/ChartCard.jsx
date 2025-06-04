import React from "react";
import { FaExpandAlt, FaCompressAlt } from "react-icons/fa";
import "../styles/ChartCard.css";

const ChartCard = ({ title, children }) => {
  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <h3>{title}</h3>
        <div className="chart-card-actions">
          <FaCompressAlt title="Minimize" />
          <FaExpandAlt title="Maximize" />
        </div>
      </div>
      <div className="chart-card-body">{children}</div>
    </div>
  );
};

export default ChartCard;
