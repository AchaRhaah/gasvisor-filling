import { useEffect, useState } from "react";
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
  var startingWeightForDay = 20;
  const weightOfFullBottle = 20;
  const currentWeight = 9;
  // const backgroundArray = []

  const percentageRemaining = (presentWeight) => {
    var remainingPercent =
      100 - ((weightOfFullBottle - presentWeight) / weightOfFullBottle) * 100;
    remainingPercent = Math.floor(remainingPercent);
    return remainingPercent;
  };

  const daysWeight = (currnetWeight) => {
    const usedWeight = startingWeightForDay - currnetWeight;
    startingWeightForDay = currnetWeight;
    console.log(startingWeightForDay);
    var percentage = percentageRemaining(currnetWeight);
    return { usedWeight, percentage };
  };

  const [data, setData] = useState({
    labels: ["mon", "tues", "wed", "thurs", "fri", "sat", "sun"],
    datasets: [
      {
        data: [
          daysWeight(17).usedWeight,
          daysWeight(14).usedWeight,
          daysWeight(8).usedWeight,
          daysWeight(5).usedWeight,
          daysWeight(3).usedWeight,
          daysWeight(2).usedWeight,
          daysWeight(0).usedWeight,
        ],
        backgroundColor: ["#2A297D", "#FDBD2B"],
        barThickness: 30,
        borderWidth: 2,
        borderRadius: 20,
        borderSkipped: false,
      },
    ],
  });
  return (
    <div className="App">
      <h1 className="heading">Cylinder 1</h1>
      <div className="graph-container">
        <di>
          <Cylinder percentageRemaining={percentageRemaining(currentWeight)} />
        </di>
        <di>
          <Barchart chartData={data} />
        </di>
      </div>
    </div>
  );
}

export default App;
