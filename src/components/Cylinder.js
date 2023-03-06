import React from "react";
import "./styles.css";

function Cylinder() {
  const startingWeight = 20;
  const currentWeight = 19;
  const percentageRemaining = (initialWeight, presentWeight) => {
    var remainingPercent =
      100 - ((initialWeight - presentWeight) / initialWeight) * 100;
    remainingPercent = Math.floor(remainingPercent);
    return remainingPercent;
  };
  return (
    <div style={{ width: "20em", height: "20em", marginBottom: "1em" }}>
      <div className="cylinder">
        <div
          style={{
            height: `${
              percentageRemaining(startingWeight, currentWeight) - 10
            }%`,
          }}
          className="level"
        >
          <div className="wave"></div>
          <div className="wave"></div>
          <p className="percent">
            {percentageRemaining(startingWeight, currentWeight)}%
          </p>
        </div>
      </div>
    </div>
  );
}

export default Cylinder;
