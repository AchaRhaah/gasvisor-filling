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
  const backgroundArray = [];
  const [percent, setPercent] = useState(100);
  const [weightOfFullBottle, setWeight] = useState(105);
  var currnetWeight = [];
  var [apiData, setApiData] = useState([]);
  var [usedWeight, setUsedWeight] = useState([])
  var [loading, setLoding] = useState(false)
  const date = new Date();
  const dt = date.getDay()
  var dob = new Date(date);
  var dobArr = dob.toDateString().split(" ");
  var dobFormat = dobArr[2] + " " + dobArr[1] + " " + dobArr[3];
  const emptyDays = [10, 10, 10, 10, 10, 10, 10];
  const emptyDaysUsedWeight = [0,0,0,0,0,0,0]

    const [data, setData] = useState({
    labels: ["mon", "tues", "wed", "thurs", "fri", "sat", "sun"],
    datasets: [
      {
        data: currnetWeight,
        backgroundColor: backgroundArray,
        barThickness: 30,
        borderRadius: 20,
        borderSkipped: false,
      },
    ],
  });
  
  
  useEffect(() => {
    fetch("https://api.gasvisor.eu/api/sensors/data", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((data) => {
        // apiData = data
        setLoding(true)
        setApiData(data)
        setPercent(Math.trunc(data[data.length - 1].percentage_weight));
        setWeight(Math.trunc(data[data.length - 1].cylinder_weigth_full));
        currnetWeight.push(Math.trunc(data[data.length - 1].calculated_weight))
        usedWeight.push(Math.trunc(data[data.length - 1].weight_used))

          
        currnetWeight = currnetWeight.slice(0, dt).concat(emptyDays.slice(0, 7 - dt))
  const background = () => {
    currnetWeight.map((num, index) => { 
      index == dt -1 ? backgroundArray.push("#fdbd2b") : index < dt-1 ? backgroundArray.push("#2a297d") : backgroundArray.push('#c9c9da')
    })
  }

        background();
        setData({
    labels: ["mon", "tues", "wed", "thurs", "fri", "sat", "sun"],
    datasets: [
      {
        data: currnetWeight,
        backgroundColor: backgroundArray,
        barThickness: 30,
        borderRadius: 20,
        borderSkipped: false,
      },
    ],
        })
        usedWeight = usedWeight.slice(0, dt).concat(emptyDaysUsedWeight.slice(0, 7 - dt))
        setUsedWeight(usedWeight)

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
          <Barchart chartData={data} usedWeight={usedWeight} />
        </di>
      </div>
     {loading ?  <div className="info-box">
        <h3 className="heading heading2">Real time details for {dobFormat}</h3>
        <p className="info">Weight of full bottle: {Math.trunc(apiData[apiData.length - 1].cylinder_weigth_full)} kg</p>
        <p className="info">Current weight: {Math.trunc(apiData[apiData.length - 1].calculated_weight)} kg</p>
        <p className="info">Weight used: {Math.trunc(apiData[apiData.length - 1].weight_used)} kg</p>
      </div> : ""}
     
    </div>
  );
}

export default App;
