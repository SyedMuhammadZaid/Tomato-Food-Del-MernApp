import React, { useState, useEffect, useContext } from "react";
import "./MyOrder.css";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const { token, url,totalAmount } = useContext(StoreContext);
  console.log(token)
  const navigate = useNavigate()
  const [data, setData] = useState([]);

  const fetchData = async () => {
    let resp = await axios.post(
      url + "/api/order/userorders",
      {},
      { headers: { token },  withCredentials: true  }
    );
    console.log(resp);
    if (resp.data.success) {
      setData(resp?.data?.data);
    }
  };

  useEffect(() => {
    if(!token){
      navigate('/cart')
    }
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [token]);

  console.log(data);
  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data?.orders?.map((order, index) => {
          return (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="" />
              <p>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + " , ";
                  }
                })}
              </p>
              <p>${order.amount}.00</p>
              <p>Items: {order?.items?.length}</p>
              <p>
                <span>&#x25cf;</span>
                <b>{order.status}</b>
              </p>
              <button onClick={fetchData}>Track Order</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
