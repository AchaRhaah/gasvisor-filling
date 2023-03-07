import React from "react";
import "./styles.css";

function Cylinder({ percentageRemaining }) {
  return (
    <div className="cylinder-container">
      <img src={require("./top.png")} alt="" className="top" />
      <div className="cylinder">
        <div
          style={{
            height: `${percentageRemaining - 10}%`,
          }}
          className="level"
        >
          <div className="wave"></div>
          <div className="wave"></div>
          <p className="percent">{percentageRemaining}%</p>
        </div>
      </div>
    </div>
  );
}

export default Cylinder;
