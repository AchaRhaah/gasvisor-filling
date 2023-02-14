import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from "chart.js";

ChartJs.register(Tooltip, Title, ArcElement, Legend);

function App() {
  const [data, setData] = useState({
    datasets: [
      {
        data: [10, 20, 30],
        backgroundColor: ["red", "blue", "yellow"],
      },
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: ["Red", "Blue", "Yellow"],
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
                backgroundColor: [
                  "red",
                  "blue",
                  "yellow",
                  "purple",
                  "orange",
                  "indigo",
                  "violet",
                  "green",
                  "pink",
                  "gray",
                ],
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
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      {/* <h1>Donut chart</h1> */}
      <Doughnut data={data} style={{ width: "20em", height: "20em" }} />
    </div>
  );
}

export default App;
