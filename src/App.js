import React, { useState, useEffect } from "react";
import "./App.css";

import {
  Chart as ChartJs,
  Tooltip,
  Title,
  ArcElement,
  Legend,
  BarElement,
  LinearScale,
  CategoryScale,
} from "chart.js";
import Cylinder from "./components/Cylinder";
import Barchart from "./components/Barchart";
import Header from "./components/Header";
ChartJs.register(
  Tooltip,
  Title,
  LinearScale,
  CategoryScale,
  ArcElement,
  BarElement,
  Legend
);

function App() {
  const backgroundArray = [];
  const [percent, setPercent] = useState(100);
  var currentWeight = [0, 0, 0, 0, 0, 0, 0];
  var [maxYscaleVal, setMaxYScale] = useState(0);
  var cylinderWeight = [];
  var [usedWeight, setUsedWeight] = useState([0, 0, 0, 0, 0, 0, 0]);
  var percentArr = ["none", "none", "none", "none", "none", "none", "none"];
  var [apiData, setApiData] = useState([]);
  var [loading, setLoding] = useState(false);
  var [fetchedDate, setFetchedDate] = useState("");

  const [data, setData] = useState({
    labels: ["mon", "tues", "wed", "thurs", "fri", "sat", "sun"],
    datasets: [
      {
        data: currentWeight,
        backgroundColor: backgroundArray,
        barThickness: 30,
        borderRadius: 20,
        borderSkipped: false,
      },
    ],
  });

  useEffect(() => {
    fetch("https://api.gasvisor.eu/api/sensors/data/gasvisor_sensor_02", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((data) => {
        setApiData(data);
        currentWeight = [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1];
        // To get the currnet day's date in words format
        var date = new Date(data[data.length - 1].date_created);
        const dt = date.getDay();
        var dateArr = date.toDateString().split(" ");
        var dateFormat = dateArr[2] + " " + dateArr[1] + " " + dateArr[3];
        setFetchedDate(dateFormat);
        setLoding(true);
        setPercent(Math.trunc(data[data.length - 1].percentage_weight));

        // variables needed to separate api data into days

        var arrFirstDate = new Date(data[0].date_created).getDate();
        var arrDayIndex = new Date(data[0].date_created).getDay();
        data.map((item, index) => {
          cylinderWeight.push(parseInt(item.cylinder_weight));

          // if date of index is different from the date of the previous object then it is a new day

          if (new Date(data[index].date_created).getDate() != arrFirstDate) {
            currentWeight.splice(
              arrDayIndex - 1,
              1,
              parseFloat(data[index - 1].calculated_weight).toFixed(2)
            );

            usedWeight.splice(arrDayIndex - 1, 1, data[index - 1].weight_used);
            percentArr.splice(
              arrDayIndex - 1,
              1,
              parseFloat(data[index - 1].percentage_weight).toFixed(2)
            );

            arrFirstDate = new Date(data[index].date_created).getDate();
            arrDayIndex = new Date(data[index].date_created).getDay();
          }

          // The last object in the array is the most current reading for that day

          if (index === data.length - 1) {
            currentWeight.splice(
              arrDayIndex - 1,
              1,
              parseFloat(item.calculated_weight).toFixed(2)
            );
            usedWeight.splice(
              arrDayIndex - 1,
              1,
              parseFloat(item.weight_used).toFixed(2)
            );
            percentArr.splice(
              arrDayIndex - 1,
              1,
              parseFloat(item.percentage_weight).toFixed(2)
            );
          }
        });
        setUsedWeight(usedWeight);
        const background = () => {
          percentArr.map((num, index) => {
            num === "none"
              ? backgroundArray.push("#c9c9da")
              : num <= 15 && index <= dt - 1
              ? backgroundArray.push("#E64646")
              : index < dt - 1
              ? backgroundArray.push("#2A297D")
              : index === dt - 1
              ? backgroundArray.push("#FDBD2B")
              : backgroundArray.push("#c9c9da");
          });
        };

        background();
        maxYscaleVal =
          data[data.length - 1].cylinder_weight_full -
          data[data.length - 1].cylinder_weight_empty;
        setMaxYScale(maxYscaleVal);
        setData({
          labels: ["mon", "tues", "wed", "thurs", "fri", "sat", "sun"],
          datasets: [
            {
              data: currentWeight,
              backgroundColor: backgroundArray,
              barThickness: 30,
              borderRadius: 20,
              borderSkipped: false,
            },
          ],
        });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <Header />
      <h1 className="heading">Cylinder 1</h1>
      <div className="graph-container">
        <di>
          <Cylinder percentageRemaining={percent} />
        </di>
        <di>
          <Barchart
            chartData={data}
            usedWeight={usedWeight}
            maxYscaleVal={maxYscaleVal}
          />
        </di>
      </div>
      {loading ? (
        <div className="info-box">
          <h3 className="heading heading2">
            Real time details for {fetchedDate}
          </h3>
          <p className="info">Weight of full cylinder: {maxYscaleVal} kg</p>
          <p className="info">
            Current weight of gas:{" "}
            {parseFloat(apiData[apiData.length - 1].calculated_weight).toFixed(
              2
            )}{" "}
            kg
          </p>
          <p className="info">
            Weight used:{" "}
            {parseFloat(apiData[apiData.length - 1].weight_used).toFixed(2)} kg
          </p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
