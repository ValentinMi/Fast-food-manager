import React, { useState } from "react";

import "./index.scss";

const CardForm = ({ actions }) => {
  const [form, setForm] = useState({
    name: "",
    stock: "",
    price: ""
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
      default:
        break;
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      actions.addProduct(form);
    } else return;
  };

  // Need change for joi-browser validation
  const validateForm = () => {
    if (form.name !== "" && form.stock !== "" && form.price !== "") return true;
    return () => alert("Formulaire incomplet");
  };
  //////////////////////////////////////////////////

  return (
    <div className="col-2 col-form">
      {// Conditionnal rendering on form
      isVisible ? (
        <div className="form-group form-card">
          <label>Name</label>
          <input name="name" type="text" onChange={handleChange} />
          <label>Stock</label>
          <input name="stock" type="number" onChange={handleChange} />
          <label>Price</label>
          <input name="price" type="number" onChange={handleChange} />
          <button className="btn btn-primary" onClick={handleSubmit}>
            Add
          </button>
        </div>
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

export default CardForm;
