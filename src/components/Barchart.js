import React from "react";
import { Bar } from "react-chartjs-2";
import "./barchart.css";
function Barchart({ chartData, usedWeight }) {
  return (
    <div className="barchart-container">
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
                ticks: {
                  beginAtZero: true,
                  steps: 5,
                  stepSize: 10,
                  max: 110,
                },
                grid: {
                  drawBorder: false,

                  display: false,
                },
              },
            },
            plugins: {
              tooltip: {
                callbacks: {
                  body: function (context) {
                    return "body";
                  },
                  afterBody: function (context) {
                    return `Used weight: ${
                      usedWeight[context[0].dataIndex]
                    } kg`;
                  },
                  label: function (context) {
                    return ` current weight: ${context.raw} kg`
                  }
                },
              },
              legend: {
                display: false,
              },
            },
          }}
        />
      </div>
      <h3 className="caption">Real time weekly usage</h3>
    </div>
  );
}

export default Barchart;
