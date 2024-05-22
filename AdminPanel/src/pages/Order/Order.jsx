import React, { useState, useEffect } from "react";
import "./Order.css";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const resp = await axios.get(url + "/api/order/list");
    if (resp?.data.success) {
      setOrders(resp?.data?.data);
      console.log(resp?.data?.data);
    } else {
      toast.error("Error");
      return;
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const statusHandler = async (event, orderId) => {
    try{
      let resp = await axios.post(url+'/api/order/status' , {
        orderId,
        status: event.target.value
      })
      if(resp?.data.success){
        await fetchAllOrders();
      }
    }
    catch(error){
      console.log('error');
      toast.error('Error')
    }
  }

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders &&
          orders?.map((order, index) => {
            return (
              <div key={index} className="order-item">
                <img src={assets.parcel_icon} alt="" />
                <div>
                  <p className="order-item-food">
                    {order?.items.map((item, index) => {
                      if (index === order.items.length - 1) {
                        return item.name + " x " + item.quantity;
                      } else {
                        return item.name + " x " + item.quantity + ",";
                      }
                    })}
                  </p>
                  <p className="order-item-name">
                    {order.address.firstName + " " + order.address.lastName}
                  </p>
                  <div className="order-item-address">
                    <p>{order.address.street + ","}</p>
                    <p>
                      {order.address.city +
                        ", " +
                        order.address.state +
                        ", " +
                        order.address.zipCode +
                        ","}
                    </p>
                  </div>
                  <p className="order-item-phone">{order.address.phone}</p>
                </div>
                <p>Items : {order.items.length}</p>
                <p>${order.amount}</p>
                <select onChange={(event) => statusHandler(event, order._id)}>
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out For Delivery">Out For Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Order;
