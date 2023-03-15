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
  var filteredDataArr = [];
  var percentArr = []
  var [apiData, setApiData] = useState([]);
  var [usedWeight, setUsedWeight] = useState([])
  var [loading, setLoding] = useState(false)
  var [fetchedDate, setFetchedDate] = useState("")
  const emptyDays = [10, 10, 10, 10, 10, 10, 10];
  const emptyDaysUsedWeight = [0, 0, 0, 0, 0, 0, 0]
  

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
    fetch("https://api.gasvisor.eu/api/sensors/data/ID_78560", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((data) => {
        setApiData(data)
        var date = new Date(data[data.length - 1].date_created)
        const dt = date.getDay()
        var dateArr = date.toDateString().split(' ');
        var dateFormat = dateArr[2] + ' ' + dateArr[1] + ' ' + dateArr[3];
        setFetchedDate(dateFormat)

        // date = date.toLocaleDateString
        

        setLoding(true)
        setPercent(Math.trunc(data[data.length - 1].percentage_weight));
        setWeight(Math.trunc(data[data.length - 1].cylinder_weigth_full));

        var arrFirstDate = new Date(data[0].date_created).getDate();


        data.map((item, index) => {
          if (new Date(data[index].date_created).getDate() != arrFirstDate) {
            currnetWeight.push(Math.trunc(data[index - 1].calculated_weight))
            usedWeight.push(Math.trunc(data[index - 1].weight_used))
            arrFirstDate = new Date(data[index].date_created).getDate()
            filteredDataArr.push(item)

          }
          if (index === data.length - 1) {
            currnetWeight.push(Math.trunc(data[index].calculated_weight))
            usedWeight.push(Math.trunc(data[index].weight_used))
            filteredDataArr.push(item)

            
          }
        })

        currnetWeight = currnetWeight.concat(emptyDays.slice(0, 7 - dt))
        percentArr = filteredDataArr.map((num) => { return parseInt(num.percentage_weight) })
        percentArr = percentArr.concat(emptyDaysUsedWeight.slice(0, 7 - dt))


        console.log("percentArr", percentArr)
        const background = () => {
    
          percentArr.map((num, index) => {
            num < 15 && index < dt - 1? backgroundArray.push("#E64646") : index < dt-1 ? backgroundArray.push("#2A297D") : index === dt-1 ? backgroundArray.push("#FDBD2B") : backgroundArray.push("#c9c9da")
          })
  };
    
        background(); 
        console.log("backgroundArray", backgroundArray)
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
        usedWeight = usedWeight.concat(emptyDaysUsedWeight.slice(0, 7 - dt))
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
          <Cylinder percentageRemaining={10} />
        </di>
        <di>
          <Barchart chartData={data} usedWeight={usedWeight} totalWeight={weightOfFullBottle } />
        </di>
      </div>
     {loading ?  <div className="info-box">
        <h3 className="heading heading2">Real time details for {fetchedDate}</h3>
        <p className="info">Weight of full cylinder: {parseFloat(apiData[apiData.length - 1].cylinder_weigth_full).toFixed(2)} kg</p>
        <p className="info">Current weight of gas: {parseFloat(apiData[apiData.length - 1].calculated_weight).toFixed(2)} kg</p>
        <p className="info">Weight used: {parseFloat(apiData[apiData.length - 1].weight_used).toFixed(2)} kg</p>
      </div> : ""}
     
    </div>
  );
}

export default App;
