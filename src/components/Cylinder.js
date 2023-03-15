import React from "react";
import "./cylinderStyles.css";

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
              background: `${percentageRemaining <= 15 ? "#E64646": "#FDBD2B"}`
            }}
            className="level"
          >
            {percentageRemaining <= 15 ?  <div>
            <div className="wave wave2"></div>
            <div className="wave wave2"></div>
            </div> :  <div>
            <div className="wave"></div>
            <div className="wave"></div>
            </div>}
           
          </div>
        </div>
      </div>

      <h3 className="cylinder-caption">Real time daily usage</h3>
    </div>
  );
}

export default Cylinder;
