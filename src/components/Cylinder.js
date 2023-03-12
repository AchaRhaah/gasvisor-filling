import React from "react";
import "./styles.css";

function Cylinder({ percentageRemaining, weightOfFullBottle }) {
  return (
    <div className="cylinder-container">
      <div className="cylinder">
        <img src={require("../images/top.png")} alt="" className="top" />
        <div className="cylinder-body">
          <p className="percent">{percentageRemaining}%</p>
          <div
            style={{
              height: `${percentageRemaining}%`,
            }}
            className="level"
          >
            <div className="wave"></div>
            <div className="wave"></div>
          </div>
        </div>
      </div>

      <h3 className="cylinder-caption">Real time daily usage</h3>
    </div>
  );
}

export default Cylinder;
