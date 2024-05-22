import React from "react";
import { useState } from "react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

const NavBar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const navigate = useNavigate();

  const { totalAmount, token, setToken } = useContext(StoreContext);

  // to create a smooth transition to the section whenever an nav item click
  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth",
      });
    }
  }

  const logOutHandler = () => {
    setToken("");
    localStorage.clear("token");
  };

  return (
    <div className="navbar">
      <img
        src={assets.logo}
        alt=""
        className="logo"
        onClick={() => navigate("/")}
      />
      <ul className="navbar-menu">
        <li
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          home
        </li>
        <li
          onClick={() => {
            setMenu("menu");
            scrollToSection("explore-menu");
          }}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </li>
        <li
          onClick={() => {
            setMenu("mobile-app");
            scrollToSection("app-download");
          }}
          className={menu === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </li>
        <li
          onClick={() => {
            setMenu("contact-us");
            scrollToSection("footer");
          }}
          className={menu === "contact-us" ? "active" : ""}
        >
          contact us
        </li>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <img
            src={assets.basket_icon}
            alt=""
            onClick={() => navigate("/cart")}
          />
          {totalAmount() !== 0 ? <div className="dot"></div> : ""}
        </div>
        {token ? (
          <div className="navbar-profile">
            <img
              src={assets.profile_image}
              className="profile"
            />
            <ul className="nav-profile-dropdown">
              <li>
                <img src={assets.bag_icon} alt="" />
                <p onClick={() => navigate('/myorders')}>Orders</p>
              </li>
              <hr />
              <li onClick={logOutHandler}>
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        ) : (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
