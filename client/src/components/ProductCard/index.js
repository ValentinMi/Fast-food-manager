import React, { useState } from "react";
import { connect } from "react-redux";

import {
  addProductToOrder,
  removeProductFromOrder
} from "../../actions/pendingOrder.actions";

import {
  removeProductById,
  updateProductById
} from "../../actions/product.actions";

import SelectInput from "../shared/SelectInput/index";

import { imageURL } from "../../config.json";

import "./index.scss";

const ProductCard = ({ user, product, inOrderList, actions }) => {
  const [selectValue, setSelectValue] = useState(1);

  // Destructure product obj
  const { name, stock, quantity, price, image } = product;
  console.log(image);

  // Destructure user
  const { isAdmin } = user.data;

  const handleSelectChange = newValue => {
    setSelectValue(newValue);
  };

  const handleProductRefound = quantity => {
    actions.updateProductById(product._id, {
      name: product.name,
      price: product.price,
      stock: product.stock + quantity
    });
  };

  return (
    <div className="card card-product">
      {!inOrderList && (
        <img
          className="card-img-top"
          src={imageURL + image}
          alt={product.name}
        />
      )}{" "}
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
        <p className="order-price">{price * quantity} €</p>
        {!isAdmin && (
          <button
            className="btn btn-warning"
            onClick={() => actions.removeProductFromOrder(name)}
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
            onClick={() => handleProductRefound(selectValue)}
            className="btn btn-success btn-admin"
          >
            Refound
          </button>
          <button
            className="btn btn-danger btn-admin"
            onClick={() => actions.removeProductById(product._id)}
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
        <span className="customer-box-price">{price * selectValue} €</span>
        {user.isLogged && (
          <div className="customer-box-buttons">
            <SelectInput
              length={stock}
              name={name}
              onChange={handleSelectChange}
            />
            <button
              className={
                stock === 0
                  ? "btn disabled customer-box-button-add  danger"
                  : "btn customer-box-button-add "
              }
              onClick={
                stock !== 0 &&
                (() => actions.addProductToOrder(name, selectValue, price))
              }
            >
              ADD
            </button>
          </div>
        )}
      </div>
    );
  }
};

const mapStateToProps = state => ({
  products: state.productReducer.products,
  pendingOrder: state.pendingOrderReducer.pendingOrder,
  user: state.authReducer.user
});

const mapDispatchToProps = dispatch => ({
  actions: {
    // Pending Order
    addProductToOrder: (name, quantity, totalPrice) =>
      dispatch(addProductToOrder(name, quantity, totalPrice)),
    removeProductFromOrder: name => dispatch(removeProductFromOrder(name)),
    // Product
    removeProductById: productId => dispatch(removeProductById(productId)),
    updateProductById: (productId, data) =>
      dispatch(updateProductById(productId, data))
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductCard);
