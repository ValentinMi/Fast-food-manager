import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";

import {
  savePendingOrderLocally,
  getSavedPendingOrder,
  removeSavedPendingOrder
} from "../../actions/pendingOrder.actions";

import ProductCard from "../ProductCard/index";

import "./index.scss";

const OrderList = ({
  user,
  pendingOrder,
  payedOrders,
  pendingOrderActions
}) => {
  const [totalPrice, setTotalPrice] = useState(0);

  // Destructure actions props
  const { savePendingOrderLocally, getSavedPendingOrder } = pendingOrderActions;

  // On mount
  // eslint-disable-next-line
  useEffect(() => {
    // Get saved pendingOrder
    getSavedPendingOrder(user);
  }, []);

  const handleTotalPrice = array => {
    let total = 0;
    array.forEach(product => {
      total += product.price;
    });
    return total;
  };

  // const handleBuy = () => {
  //   // Subtract bought quantity from each product stock
  // };

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
                  {order.map(product => (
                    <ProductCard
                      key={`payed${product.name}${orderIndex}`}
                      user={user}
                      product={product}
                      inOrderList={true}
                    />
                  ))}
                  <div className="order-payed-footer">
                    <span className="order-price">
                      {handleTotalPrice(order)} €
                    </span>
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
              // onClick={() => handleBuy()}
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
  user: state.authReducer.user
});

const mapDispatchToProps = dispatch => ({
  // PendingOrderobject
  pendingOrderActions: {
    savePendingOrderLocally: (pendingOrder, user) =>
      dispatch(savePendingOrderLocally(pendingOrder, user)),
    getSavedPendingOrder: user => dispatch(getSavedPendingOrder(user)),
    removeSavedPendingOrder: user => dispatch(removeSavedPendingOrder(user))
  },
  // PayedOrders
  payedOrdersActions: {}
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderList);
