import React, { useState } from "react";
import { toast } from "react-toastify";

import "./index.scss";

const ProductForm = ({ actions }) => {
  const [form, setForm] = useState({
    name: "",
    stock: "",
    price: "",
    image: null
  });

  const [isVisible, setIsVisible] = useState(false);

  const handleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleChange = event => {
    switch (event.target.name) {
      case "name":
        setForm({ ...form, name: event.target.value });
        break;
      case "stock":
        setForm({ ...form, stock: parseInt(event.target.value) });
        break;
      case "price":
        setForm({ ...form, price: parseFloat(event.target.value) });
        break;
      case "file":
        setForm({ ...form, image: event.target.files[0] });
      default:
        break;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("stock", form.stock);
    formData.append("image", form.image, form.image.name);
    console.log(formData);
    actions.postProduct(formData);
  };

  // Need change for joi-browser validation
  // const validateForm = () => {
  //   if (
  //     form.name !== "" &&
  //     form.stock !== "" &&
  //     form.price !== "" &&
  //     form.productImage !== ""
  //   )
  //     return true;
  //   toast.warn("Incomplete form");
  // };
  //////////////////////////////////////////////////

  return (
    <div className="col-2 col-form">
      {// Conditionnal rendering on form
      isVisible ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group form-card">
            <label>Name</label>
            <input name="name" type="text" onChange={handleChange} />
            <label>Stock</label>
            <input name="stock" type="number" onChange={handleChange} />
            <label>Price</label>
            <input name="price" type="number" onChange={handleChange} />
            <label>Image</label>
            <input
              name="file"
              type="file"
              className="form-control-file"
              onChange={handleChange}
            />
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Add
            </button>
          </div>
        </form>
      ) : (
        <button
          className="btn btn-success btn-lg btn-new-product"
          onClick={handleVisibility}
        >
          Add product
        </button>
      )}
    </div>
  );
};

export default ProductForm;
