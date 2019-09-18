import React, { useState } from "react";

import SelectInput from "../shared/SelectInput/index";

import "./index.scss";

const ProductCard = ({ user, product, actions, index, inOrderList }) => {
  const [selectValue, setSelectValue] = useState(1);

  // Destructure product obj
  const { name, stock, quantity, price } = product;

  // Destructure user obj
  const { isAdmin } = user;

  // Destructure actions
  const { removeProduct, refoundProduct } = actions.productActions;
  const { addProductToOrder, removeProductFromOrder } = actions.orderActions;

  const handleSelectChange = newValue => {
    setSelectValue(newValue);
  };

  return (
    <div className="card card-product">
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <div className="btn-container">
          {// IF CARD IS IN ORDER LIST => UI FOR ORDER LIST
          inOrderList
            ? renderOrderUI()
            : // ELSE CARD IS IN PRODUCT BOARD => UI FOR PRODUCT BOARD
            // If user is admin => render admin btn
            isAdmin
            ? renderAdminUI()
            : // Else user is customer => render customer btn
              renderCustomerUI()}
        </div>
      </div>
    </div>
  );

  // UI //

  function renderOrderUI() {
    return (
      <div className="order-box">
        <span>Quantity: {quantity}</span>
        <p>{price} €</p>
        {!isAdmin && (
          <button
            className="btn btn-danger"
            onClick={() => removeProductFromOrder(index)}
          >
            Remove
          </button>
        )}
      </div>
    );
  }

  function renderAdminUI() {
    return (
      <div className="admin-box">
        <span>Stock: {stock}</span>
        <p>{price} €</p>
        <SelectInput length={50} name={name} onChange={handleSelectChange} />
        <div className="admin-btn-cont">
          <button
            onClick={() => refoundProduct(index, selectValue)}
            className="btn btn-success btn-admin"
          >
            Refound
          </button>
          <button
            className="btn btn-danger btn-admin"
            onClick={() => removeProduct(index)}
          >
            Delete product
          </button>
        </div>
      </div>
    );
  }

  function renderCustomerUI() {
    return (
      <div className="customer-box">
        <span>Available: {stock}</span>
        <p>{price * selectValue} €</p>
        <SelectInput length={stock} name={name} onChange={handleSelectChange} />
        <button
          className="btn btn-success"
          onClick={() => addProductToOrder(product, selectValue, price)}
        >
          ADD
        </button>
      </div>
    );
  }
};

export default ProductCard;
