import React from "react";
import "./headerStyles.css";

function Header() {
  return (
    <div className="header">
      <img src={require("../images/logo.png")} alt="" />
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
