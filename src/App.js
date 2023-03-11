import { useState, useEffect } from "react";
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
  var startingWeightForDay = 60;
  const weightOfFullBottle = 60;
  const currentWeight = 25;
  const backgroundArray = [];
  var apiData = [];
  const [percent, setPercent] = useState(0);
  const emptyDays = [5, 5, 5, 5, 5, 5, 5];
  var dt = new Date().getDay();

  useEffect(() => {
    fetch("https://api.gasvisor.eu/api/sensors/data", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((data) => {
        apiData = data;
        // console.log(apiData[data.length - 1].percentage_weight);
        setPercent(Math.trunc(apiData[data.length - 1].percentage_weight));
        console.log("percent", percent);
      })
      .catch((err) => console.log(err));
  }, []);

  const percentageRemaining = (presentWeight) => {
    var remainingPercent =
      100 - ((weightOfFullBottle - presentWeight) / weightOfFullBottle) * 100;

    remainingPercent = Math.floor(remainingPercent);
    return remainingPercent;
  };

  const weightUsedPerDay = (currnetWeight) => {
    const usedWeight = startingWeightForDay - currnetWeight;
    startingWeightForDay = currnetWeight;
    var percentage = percentageRemaining(currnetWeight);
    return { usedWeight, percentage };
  };
  const weeklyUseageArr = [
    weightUsedPerDay(40),
    weightUsedPerDay(25),
    weightUsedPerDay(15),
    weightUsedPerDay(5),
    weightUsedPerDay(3),
    weightUsedPerDay(0),
    weightUsedPerDay(0),
  ];

  var weeklyData = weeklyUseageArr.map((num) => {
    return num.usedWeight;
  });
  weeklyData = weeklyData.slice(0, dt).concat(emptyDays.slice(0, 7 - dt));
  const [data, setData] = useState({
    labels: ["mon", "tues", "wed", "thurs", "fri", "sat", "sun"],
    datasets: [
      {
        data: weeklyData,
        backgroundColor: backgroundArray,
        barThickness: 30,
        borderRadius: 20,
        borderSkipped: false,
      },
    ],
  });
  const background = () => {
    weeklyUseageArr.map((num, index) => {
      dt - 1 < index
        ? backgroundArray.push("#c9c9da")
        : index === dt - 1 && num.percentage > 15
        ? backgroundArray.push("#FDBD2B")
        : num.percentage <= 15
        ? backgroundArray.push("#E64646")
        : backgroundArray.push("#2A297D");
    });
  };

  background();

  return (
    <div className="App">
      <Header />
      <h1 className="heading">Cylinder 1</h1>
      <div className="graph-container">
        <di>
          <Cylinder percentageRemaining={percent} />
        </di>
        <di>
          <Barchart chartData={data} />
        </di>
      </div>
    </div>
  );
}

export default App;
