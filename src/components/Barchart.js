import React from "react";
import { Bar } from "react-chartjs-2";
import "./barchart.css";
function Barchart({ chartData }) {
  return (
    <div className="container">
      <div className="chart-header-container">
        <h4 className="chart-heading">Weekly usage/kg</h4>
        <h4 className="chart-heading">Feb, 26 - March, 4</h4>
      </div>
      <Bar
        data={chartData}
        options={{
          scales: {
            x: {
              grid: {
                drawBorder: false,
                display: false,
              },
            },
            y: {
              grid: {
                drawBorder: false,

                display: false,
              },
            },
          },
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
