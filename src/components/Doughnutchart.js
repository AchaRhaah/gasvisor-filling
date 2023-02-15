import React from "react";
import { Doughnut } from "react-chartjs-2";

function Doughnutchart({ chartData }) {
  return (
    <div style={{ width: "20em", height: "20em", marginBottom: "1em" }}>
      <Doughnut
        data={chartData}
        options={{
          plugins: {
            legend: {
              display: false,
            },
            labels: {
              fontColor: ["#1C1B52"],
            },
          },
        }}
      />
    </div>
  );
}

export default Doughnutchart;
