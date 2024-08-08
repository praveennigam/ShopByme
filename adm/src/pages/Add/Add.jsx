import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ url }) => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "Women",
    price: "",
    sizes: "", // Add sizes field
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
    formData.append("sizes", data.sizes); // Append sizes to formData

    try {
      const response = await axios.post(`${url}/api/food/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        setData({
          name: "",
          description: "",
          category: "Women",
          price: "",
          sizes: "", // Reset sizes field
        });
        setImage(null);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error adding food");
    }
  };

  return (
    <div className="add">
      <form onSubmit={onSubmitHandler} className="flex-col">
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
            required
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            placeholder="Write Content Here"
            rows="6"
            required
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select
              onChange={onChangeHandler}
              value={data.category}
              name="category"
              required
            >
              <option value="Women">Women</option>
              <option value="Men">Men</option>
              <option value="IndianWear">IndianWear</option>
              <option value="Footwear">Footwear</option>
              <option value="Kids">Kids</option>
              <option value="HomeStop">HomeStop</option>
              <option value="Watches">Watches</option>
              <option value="Bags">Bags</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="Amount"
              required
              min="0"
            />
          </div>
        </div>
        <div className="add-sizes flex-col">
          <p>Available Sizes (comma separated)</p>
          <input
            onChange={onChangeHandler}
            value={data.sizes}
            type="text"
            name="sizes"
            placeholder="e.g., Small, Medium, Large"
            required
          />
        </div>
        <button type="submit" className="add-btn">
          Add
        </button>
      </form>
    </div>
  );
};

export default Add;
