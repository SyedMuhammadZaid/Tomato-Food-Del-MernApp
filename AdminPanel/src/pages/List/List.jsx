import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "./List.css";

const List = ({url}) => {
  const [list, setList] = useState([]);


  const fetchList = async () => {
    const res = await axios.get(`${url}/api/food/list`);
    if (res?.data?.success) {
      setList(res?.data?.data);
    } else {
      toast.error(res?.data?.message);
    }
  };

  const removeItemHandler = async (id) => {
    const res = await axios.post(`${url}/api/food/remove`, {id: id});
    if (res?.data?.success) {
      toast.success(res?.data?.message);
      await fetchList()
      return
    } else {
      toast.error(res?.data?.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All food list</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list?.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/` + item.image} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p className="cursor" onClick={() => removeItemHandler(item._id)}>
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
