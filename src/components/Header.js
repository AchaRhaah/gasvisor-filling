import React from "react";
import "./headerStyles.css";
import Logo from "../images/logo.svg";

function Header() {
  return (
    <div className="header">
      <div className="content">
        <div className="logo">
          <img src={Logo} alt="" className="gas-logo" />
        </div>
        <div className="right">
          <p className="welcome">Welcome back, MartMich!</p>
          <img
            className="profile"
            alt=""
            src={require("../images/david.png")}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
