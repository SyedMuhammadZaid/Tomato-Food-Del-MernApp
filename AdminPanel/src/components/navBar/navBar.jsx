import React from "react";
import "./navBar.css";
import { assets } from "../../assets/assets";

const NavBar = () => {
  return (
    <div className="navbar">
      <img className="logo" src={assets.logo} alt="" />
      <img className="profile" height={40} width={43} src={assets.profile_image2} alt="" />
    </div>
  );
};

export default NavBar;
