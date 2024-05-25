import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";
import "./Verify.css";

const Verify = () => {
  const [URLSearchParams, SetURLSearchParams] = useSearchParams();
  let success = URLSearchParams.get("success");
  let orderId = URLSearchParams.get("orderId");
  const { url } = useContext(StoreContext);
  const navigate = useNavigate()

  const verifyPayment = async () => {
    let resp = await axios.post(url + "/api/order/verify", {orderId,success}, { withCredentials: true });
    if(resp.data.success){
      toast.success(resp?.data?.message)
      navigate('/myorders')
    }
    else{
      toast.error(resp?.data?.message)
      navigate('/')
    }
  };

  useEffect(() => {
    verifyPayment()
  },[])

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
