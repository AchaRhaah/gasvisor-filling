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
import Doughnutchart from "./components/Doughnutchart";
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
        backgroundColor: ["#1C1B52", "#FDBD2B"],
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
          for (var i of res) {
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
        Current Level
      </h1>
      <Doughnutchart chartData={data} />
      <button
        style={{
          width: "15em",
          height: "3.5em",
          background: "#1C1B52",
          border: "none",
          color: "#FDBD2B",
          fontWeight: "bold",
        }}
      >
        ORDER NEW CYLINDER
      </button>
      <h1
        style={{
          fontSize: "2.5em",
          color: "#1C1B52",
          fontWeight: "normal",
          marginTop: "1.5em",
        }}
      >
        Weekly Usage
      </h1>
      <Barchart chartData={data} />
    </div>
  );
}

export default App;
