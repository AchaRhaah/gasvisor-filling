import React from "react";
import { Bar } from "react-chartjs-2";
function Barchart({ chartData }) {
  return (
    <div
      style={{
        width: "40em",
        height: "20em",
      }}
    >
      <Bar
        data={chartData}
        options={{
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
}

export default Barchart;
