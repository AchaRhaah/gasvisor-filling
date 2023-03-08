import React from "react";
import "./styles.css";

function Cylinder({ percentageRemaining }) {
  return (
    <div className="cylinder-container">
      <img src={require("../images/top.png")} alt="" className="top" />
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
      <h3 className="cylinder-caption">Real time daily usage</h3>
    </div>
  );
}

export default Cylinder;
