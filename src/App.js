import { useEffect, useState } from "react";

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
  const daysWeight = (currnetWeight) => {
    const usedWeight = startingWeightForDay - currnetWeight;
    startingWeightForDay = currnetWeight;
    console.log(startingWeightForDay);
    return usedWeight;
  };
  const [data, setData] = useState({
    labels: ["mon", "tues", "wed", "thurs", "fri", "sat", "sun"],
    datasets: [
      {
        data: [
          daysWeight(17),
          daysWeight(14),
          daysWeight(8),
          daysWeight(5),
          daysWeight(0),
          daysWeight(0),
          daysWeight(0),
        ],
        backgroundColor: ["#2A297D", "#FDBD2B"],
        barThickness: 30,
        borderWidth: 2,
        borderRadius: 20, // This will round the corners
        borderSkipped: false,
      },
    ],
  });
  useEffect(() => {
    const fetchData = () => {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((data) => {
          const res = data.json();
          return res;
          // console.log("ress: ", res);
        })
        .then((res) => {
          const data = [];
          for (var i of 7) {
            data.push(i.id);
          }
          setData({
            datasets: [
              {
                data: data,
                backgroundColor: ["#1C1B52", "#FDBD2B"],
              },
            ],

            // These labels appear in the legend and in the tooltips when hovering different arcs
          });
        })
        .catch((e) => {
          console.log("error: ", e);
        });
    };
    fetchData();
  }, []);
  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        // justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <h1 style={{ fontSize: "2.5em", color: "#1C1B52", fontWeight: "normal" }}>
        Cylinder 1
      </h1>
      <Cylinder />
      <Barchart chartData={data} />
    </div>
  );
}

export default App;
