import React from "react";
import "./Home.css";
import Header from "../../components/header/Header";
import ExploreMenu from "../../components/exploreMenu/ExploreMenu";
import { useState } from "react";
import FoodDisplay from "../../components/foodDisplay/FoodDisplay";
import AppDownload from "../../components/appDownload/AppDownload";

const Home = ({ showLogin }) => {
  const [category, setCategory] = useState("All");
  return (
    <div style={{ opacity: showLogin ? 0.6 : 1 }}>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDownload />
    </div>
  );
};

export default Home;
