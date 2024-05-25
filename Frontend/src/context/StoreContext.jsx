import { useState, useEffect } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, set_food_list] = useState([]);

  const [token, setToken] = useState("");
  axios.defaults.withCredentials = true;
  const url = "";

  const getFoodList = async () => {
    let res = await axios.get(`${url}/api/food/list`);
    if (res?.data?.success) {
      set_food_list(res?.data?.data);
    }
  };

  const getCartData = async (token) => {
    try {
      let res = await axios.post(url+'/api/cart/get',{},{headers:{token}});
      setCartItems(res?.data?.cartData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const setterFunction = async () => {
      await getFoodList();
      if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"));
        await getCartData(localStorage.getItem('token'))
      }
    };
    setterFunction();
  }, [token]);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      const cartData = await axios.post(url + "/api/cart/add",{ itemId }, { headers: { token } });
      if(cartData?.data?.success) toast.success(cartData?.data?.message);
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    if (token) {
      const cartData = await axios.post(url + "/api/cart/remove",{ itemId }, { headers: { token } });
      if(cartData?.data?.success) toast.success(cartData?.data?.message);
    }
  };


  const totalAmount = () => {
    let total = 0;
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        total += item.price * cartItems[item._id];
      }
    });
    return total;
  };

  const contextValue = {
    food_list,
    addToCart,
    removeFromCart,
    cartItems,
    setCartItems,
    totalAmount,
    token,
    setToken,
    url,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
