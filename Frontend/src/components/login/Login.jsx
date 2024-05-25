import React, { useContext } from "react";
import { useState } from "react";
import { assets } from "../../assets/assets";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, signUpSchema } from "../../context/Schema";
import "./Login.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = ({ setShowLogin }) => {
  const { token, setToken, url } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");
  const { handleSubmit, control, reset } = useForm({
    resolver: yupResolver(currState === "Sign Up" ? signUpSchema : loginSchema),
    mode: "onChange",
  });

  const loginHandler = async (newUrl, data) => {
    try {
      let res = await axios.post(newUrl, data, { withCredentials: true });
      if (res?.data.success) {
        setShowLogin(false);
        toast.success(res?.data?.message);
        setToken(res?.data?.token);
        localStorage.setItem("token", res?.data?.token);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (err) {
      alert(err);
    }
  };

  const accountHandler = (data) => {
    let newUrl = url;

    if (currState == "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }
    return loginHandler(newUrl, data);
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <div className="login-popup-cross">
            <img
              onClick={() => setShowLogin(false)}
              src={assets.cross_icon}
              alt=""
            />
          </div>
        </div>
        <div className="login-popup-inputs">
          {currState === "Sign Up" ? (
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => {
                return (
                  <>
                    <input type="text" {...field} placeholder="Your Name" />
                    {fieldState?.error ? (
                      <p
                        style={{
                          color: "red",
                          textAlign: "left",
                          width: "100%",
                        }}
                      >
                        {fieldState.error?.message}
                      </p>
                    ) : (
                      ""
                    )}
                  </>
                );
              }}
            />
          ) : (
            <></>
          )}
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <>
                  <input type="email" {...field} placeholder="Your Email" />
                  {fieldState?.error ? (
                    <p
                      style={{ color: "red", textAlign: "left", width: "100%" }}
                    >
                      {fieldState.error?.message}
                    </p>
                  ) : (
                    ""
                  )}
                </>
              );
            }}
          />
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <>
                  <input
                    type="password"
                    {...field}
                    placeholder="Your Password"
                  />
                  {fieldState?.error ? (
                    <p
                      style={{ color: "red", textAlign: "left", width: "100%" }}
                    >
                      {fieldState.error?.message}
                    </p>
                  ) : (
                    ""
                  )}
                </>
              );
            }}
          />
        </div>
        <button onClick={handleSubmit(accountHandler)}>
          {currState === "Sign Up" ? "Sign Up" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use and Privacy policy.</p>
        </div>
        {currState === "Login" ? (
          <p onClick={() => setCurrState("Sign Up")}>
            Create a new account? <span>Click here</span>
          </p>
        ) : (
          <p onClick={() => setCurrState("Login")}>
            Already have an account? <span>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
