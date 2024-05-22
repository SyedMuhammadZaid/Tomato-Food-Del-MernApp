import React from "react";
import "./PlaceOrder.css";
import { useForm, Controller } from "react-hook-form";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { addAddress } from "../../context/Schema";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const { totalAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);

  const { handleSubmit, control } = useForm({
    resolver: yupResolver(addAddress),
    mode: "onChange",
  });

  const orderPlaceHandler = async (data) => {
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: totalAmount() + 2,
    };

    let response = await axios.post(url + "/api/order/place", orderData, {
      headers: { token },
    });

    if (response?.data?.success) {
      const { session_url } = response?.data;
      window.location.replace(session_url);
    } else {
      console.log(response)
      toast.error("Error");
    }
  };

  return (
    <form className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <Controller
            name="firstName"
            required
            control={control}
            render={({ field, fieldState }) => {
              return (
                <>
                  <input
                    required
                    type={"text"}
                    placeholder="First Name"
                    {...field}
                  />
                  {fieldState?.error ? <p>{fieldState?.error?.message}</p> : ""}
                </>
              );
            }}
          />
          <Controller
            name="lastName"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <>
                  <input
                    required
                    type={"text"}
                    placeholder="Last Name"
                    {...field}
                  />
                  {fieldState?.error ? <p>{fieldState?.error?.message}</p> : ""}
                </>
              );
            }}
          />
        </div>

        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => {
            return (
              <>
                <input required type={"email"} placeholder="Email" {...field} />
                {fieldState?.error ? <p>{fieldState?.error?.message}</p> : ""}
              </>
            );
          }}
        />
        <Controller
          name="street"
          control={control}
          render={({ field, fieldState }) => {
            return (
              <>
                <input required type={"text"} placeholder="Street" {...field} />
                {fieldState?.error ? <p>{fieldState?.error?.message}</p> : ""}
              </>
            );
          }}
        />

        <div className="multi-fields">
          <Controller
            name="city"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <>
                  <input required type={"text"} placeholder="City" {...field} />
                  {fieldState?.error ? <p>{fieldState?.error?.message}</p> : ""}
                </>
              );
            }}
          />
          <Controller
            name="state"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <>
                  <input
                    required
                    type={"text"}
                    placeholder="State"
                    {...field}
                  />
                  {fieldState?.error ? <p>{fieldState?.error?.message}</p> : ""}
                </>
              );
            }}
          />
        </div>

        <div className="multi-fields">
          <Controller
            name="zipCode"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <>
                  <input
                    required
                    type={"text"}
                    placeholder="Zip Code"
                    {...field}
                  />
                  {fieldState?.error ? <p>{fieldState?.error?.message}</p> : ""}
                </>
              );
            }}
          />
          <Controller
            name="country"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <>
                  <input
                    required
                    type={"text"}
                    placeholder="Country"
                    {...field}
                  />
                  {fieldState?.error ? <p>{fieldState?.error?.message}</p> : ""}
                </>
              );
            }}
          />
        </div>

        <Controller
          name="phone"
          control={control}
          render={({ field, fieldState }) => {
            return (
              <>
                <input
                  required
                  type={"text"}
                  placeholder="Phone Number"
                  {...field}
                />
                {fieldState?.error ? <p>{fieldState?.error?.message}</p> : ""}
              </>
            );
          }}
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div style={{ width: "100%" }}>
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>{totalAmount()}</p>
            </div>
            <hr className="cart-total-hr" />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{2}</p>
            </div>
            <hr className="cart-total-hr" />
            <div className="cart-total-details">
              <b>Total</b>
              <b>$ {totalAmount() + 2}</b>
            </div>
            <hr className="cart-total-hr" />
          </div>
          <button onClick={handleSubmit(orderPlaceHandler)}>
            PROCEED TO PAYMENT
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
