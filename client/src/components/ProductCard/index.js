import React, { useState, Fragment } from "react";
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

import "./index.scss";

const ProductCard = ({
  user,
  product,
  inOrderList,
  addProductToOrder,
  removeProductFromOrder,
  removeProductById,
  updateProductById
}) => {
  const [selectValue, setSelectValue] = useState(1);

  // Destructure product obj
  const { name, stock, quantity, price } = product;

  // Destructure user
  const { isAdmin } = user.data;

  const handleSelectChange = newValue => {
    setSelectValue(newValue);
  };

  const handleProductRefound = quantity => {
    updateProductById(product._id, {
      name: product.name,
      price: product.price,
      stock: product.stock + quantity
    });
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
    console.log();
    return (
      <div className="order-box">
        <span>Quantity: {quantity}</span>
        <p>{price * quantity} €</p>
        {!isAdmin && (
          <button
            className="btn btn-danger"
            onClick={() => removeProductFromOrder(name)}
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
            onClick={() => removeProductById(product._id)}
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
        {user.isLogged && (
          <Fragment>
            <SelectInput
              length={stock}
              name={name}
              onChange={handleSelectChange}
            />
            <button
              className="btn btn-success"
              onClick={() => addProductToOrder(name, selectValue, price)}
            >
              ADD
            </button>
          </Fragment>
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
  // Pending Order
  addProductToOrder: (name, quantity, totalPrice) =>
    dispatch(addProductToOrder(name, quantity, totalPrice)),
  removeProductFromOrder: name => dispatch(removeProductFromOrder(name)),
  // Product
  removeProductById: productId => dispatch(removeProductById(productId)),
  updateProductById: (productId, data) =>
    dispatch(updateProductById(productId, data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductCard);
