import React from "react";
import Cylinder from "./components/Cylinder";

function App() {
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
      <Cylinder />
      <h1
        style={{
          fontSize: "2.5em",
          color: "#1C1B52",
          fontWeight: "normal",
          marginTop: "1.5em",
        }}
      >
        Cylinder 1
      </h1>
      <Barchart />
    </div>
  );
}

export default App;
