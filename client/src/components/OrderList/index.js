import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";

import {
  savePendingOrderLocally,
  getSavedPendingOrder
} from "../../actions/pendingOrder.actions";

import { updateProductById } from "../../actions/product.actions";
import { removeSavedPendingOrder } from "../../actions/pendingOrder.actions";
import {
  postPayedOrder,
  getPayedOrders
} from "../../actions/payedOrder.actions";

import ProductCard from "../ProductCard/index";

import "./index.scss";

const OrderList = ({
  user,
  products,
  pendingOrder,
  payedOrders,
  savePendingOrderLocally,
  getSavedPendingOrder,
  updateProductById,
  removeSavedPendingOrder,
  getPayedOrders,
  postPayedOrder
}) => {
  const [totalPrice, setTotalPrice] = useState(0);

  // On mount
  // eslint-disable-next-line
  useEffect(() => {
    // Get saved pendingOrder
    getSavedPendingOrder(user);
    // Get payedOrders
    if (user.data.isAdmin) {
      getPayedOrders();
    }
  }, []);

  // Reload total price and save when pendingOrder change
  useEffect(() => {
    handleTotalPrice();
    // If customer ==> save locally
    if (!user.data.isAdmin) {
      savePendingOrderLocally(pendingOrder, user);
    }
  }, [pendingOrder]);

  const handleTotalPrice = () => {
    let total = 0;
    pendingOrder.forEach(product => {
      total += product.price * product.quantity;
    });
    setTotalPrice(total);
  };

  const handleBuy = () => {
    // Subtract bought quantity from each product stock
    pendingOrder.forEach(orderProduct => {
      // Find product
      let product = products.find(p => p.name === orderProduct.name);
      // Update stock
      updateProductById(product._id, {
        name: product.name,
        price: product.price,
        stock: product.stock - orderProduct.quantity
      });
      // Post to payedOrder
      // Remove save
      removeSavedPendingOrder(user);
    });
    postPayedOrder(pendingOrder, totalPrice);
  };

  // Destructure user obj
  const { isAdmin } = user.data;

  return (
    <Fragment>
      <h1 className="order-title">{isAdmin ? "Payed" : "Your order:"}</h1>
      <div className="order-cont">
        <div className="order-list">
          {isAdmin
            ? payedOrders.map((order, orderIndex) => (
                <div className="order-payed" key={`${order + orderIndex}`}>
                  <h1>N°{orderIndex}</h1>
                  {order.products.map(product => (
                    <ProductCard
                      key={`payed${product.name}${orderIndex}`}
                      inOrderList={true}
                      product={product}
                    />
                  ))}
                  <div className="order-payed-footer">
                    <span className="order-price">{order.totalPrice} €</span>
                    <button
                      className="btn btn-warning btn-order-send"
                      // onClick={() => orderActions.sendOrder(orderIndex)}
                    >
                      Send
                    </button>
                  </div>
                </div>
              ))
            : pendingOrder.map((product, index) => (
                <ProductCard
                  key={`pending${product.name}${index}`}
                  user={user}
                  product={product}
                  // actions={productActions}
                  inOrderList={true}
                />
              ))}
        </div>
        {!isAdmin && (
          <div className="buy-box">
            <span className="price">{totalPrice} €</span>
            <button
              className="btn btn-lg btn-success btn-buy"
              onClick={() => handleBuy()}
            >
              BUY
            </button>
          </div>
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  pendingOrder: state.pendingOrderReducer.pendingOrder,
  payedOrders: state.payedOrderReducer.payedOrders,
  user: state.authReducer.user,
  products: state.productReducer.products
});

const mapDispatchToProps = dispatch => ({
  // PendingOrder
  savePendingOrderLocally: (pendingOrder, user) =>
    dispatch(savePendingOrderLocally(pendingOrder, user)),
  getSavedPendingOrder: user => dispatch(getSavedPendingOrder(user)),
  removeSavedPendingOrder: user => dispatch(removeSavedPendingOrder(user)),

  // Product
  updateProductById: (productId, data) =>
    dispatch(updateProductById(productId, data)),

  // PayedOrder
  getPayedOrders: () => dispatch(getPayedOrders()),
  postPayedOrder: (order, totalPrice) =>
    dispatch(postPayedOrder(order, totalPrice))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderList);
