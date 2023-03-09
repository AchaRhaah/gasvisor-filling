import React from "react";
import "./headerStyles.css";

function Header() {
  return (
    <div className="header">
      <div className="logo">
        <img src={require("../images/logo.png")} alt="" className="gas-logo" />
      </div>
      <div className="right">
        {/* <div> */}
        <p className="welcome">Welcome back MartMich</p>
        {/* </div> */}
        <img className="profile" alt="" src={require("../images/david.png")} />
      </div>
    </div>
  );
}

export default Header;
