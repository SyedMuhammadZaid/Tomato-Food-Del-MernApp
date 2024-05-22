import React from "react";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Login from "./components/login/Login";
import NavBar from "./components/navBar/NavBar";
import Cart from "./pages/cart/Cart";
import Home from "./pages/home/Home";
import PlaceOrder from "./pages/placeOrder/PlaceOrder";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Verify from "./pages/verify/Verify";
import MyOrders from "./pages/orders/MyOrders";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <ToastContainer />
        <NavBar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home showLogin={showLogin} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
