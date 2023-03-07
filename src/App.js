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
  const [data, setData] = useState({
    labels: ["#1C1B52", "#FDBD2B"],
    datasets: [
      {
        data: [10, 20, 30],
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
          console.log("res: ", res);
          const label = [];
          const data = [];
          for (var i of 7) {
            label.push(i.name);
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
            labels: label,
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
