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
  var startingWeightForDay = 105;
  const backgroundArray = [];
  var apiData = [];
  var weeklyUseageArr = [];
  const [percent, setPercent] = useState(100);
  const [weightOfFullBottle, setWeight] = useState(105);
  const currnetWeight = [90, 85, 77, 60, 50, 40, 35];
  const date = new Date();
  const dtvar = date.getDay()
  const dt = 7;
  var dob = new Date(date);
  var dobArr = dob.toDateString().split(" ");
  var dobFormat = dobArr[2] + " " + dobArr[1] + " " + dobArr[3];

  const emptyDays = [10, 10, 10, 10, 10, 10, 10];

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
        setPercent(Math.trunc(apiData[data.length - 1].percentage_weight));
        setWeight(Math.trunc(apiData[data.length - 1].cylinder_weigth_full));
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
    return { usedWeight, percentage, currnetWeight };
  };

  const currentAmount = () =>
    currnetWeight.map((item) => {
      weeklyUseageArr.push(weightUsedPerDay(item));
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
  currentAmount();
  background();

  var weeklyData = weeklyUseageArr.map((num) => {
    return num.currnetWeight;
  });

  weeklyData = weeklyData.slice(0, dt).concat(emptyDays.slice(0, 7 - dt))
  console.log("dt", dt)
  // weeklyData = weeklyData.slice(0, dt + 1).concat(emptyDays.slice(0, 7 - dt));

  var usedWeight = weeklyUseageArr.map((num) => {
    return num.usedWeight;
  });

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
  const tooltip = {
    callbacks: {
      beforeTitle: function (context) {
        console.log(context);
        return "before title";
      },
    },
  };
  return (
    <div className="App">
      <Header />
      <h1 className="heading">Cylinder 1</h1>
      <div className="graph-container">
        <di>
          <Cylinder percentageRemaining={percent} />
        </di>
        <di>
          <Barchart chartData={data} usedWeight={usedWeight} />
        </di>
      </div>
      <div className="info-box">
        <h3 className="heading heading2">Real time details for {dobFormat}</h3>
        <p className="info">Weight of full bottle: {weightOfFullBottle} kg</p>
        <p className="info">Current weight: {currnetWeight[dtvar-1]} kg</p>
        <p className="info">Weight used: {usedWeight[dtvar-1]} kg</p>
      </div>
    </div>
  );
}

export default App;
