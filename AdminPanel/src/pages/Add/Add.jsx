import React, { useState } from "react";
import { assets } from "../../assets/assets";
import axios from "axios";
import "./Add.css";
import { toast } from "react-toastify";

const Add = ({url}) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "Salad",
    price: "",
  });


  const changeHandler = (event) => {
    const name = event?.target?.name;
    const value = event?.target?.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", Number(data.price));
    formData.append("image", image);

    let res = await axios.post(`${url}/api/food/add`, formData);
    if (res?.data.success) {
      setData({
        name: "",
        description: "",
        category: "Salad",
        price: "",
      });
      setImage(false)
      toast.success(res?.data?.message)
    }
    else{
      toast.error(res?.data?.message)
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={submitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            type="text"
            name="name"
            onChange={changeHandler}
            value={data?.name}
            placeholder="Type here"
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            name="description"
            onChange={changeHandler}
            value={data?.description}
            rows="6"
            placeholder="Write some thing"
            required
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select
              name="category"
              onChange={changeHandler}
              value={data?.category}
            >
              <option value="Rolls">Rolls</option>
              <option value="Salad">Salad</option>
              <option value="Desert">Desert</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Pasta">Pasta</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input
              type="Number"
              name="price"
              onChange={changeHandler}
              value={data?.price}
              placeholder="20$"
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
