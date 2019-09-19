import React, { useState, useEffect, Fragment } from "react";

import ProductCard from "../ProductCard/index";

import "./index.scss";

const OrderList = ({ products, orders, user, actions }) => {
  const [totalPrice, setTotalPrice] = useState(0);

  // Destructure order
  const { pendingOrder, payedOrders } = orders;

  // Destructure actions
  const { productActions, orderActions } = actions;

  const handleTotalPrice = array => {
    let total = 0;
    array.forEach(product => {
      total += product.price;
    });
    return total;
  };

  const handleBuy = () => {
    // Subtract bought quantity from each product stock
    pendingOrder.forEach(product => {
      let productIndex = products.findIndex(p => p.name === product.name);
      productActions.substractProduct(productIndex, product.quantity);
    });
    // Send this pendingOrder to payedOrder
    orderActions.buyOrder(pendingOrder);
  };

  // Recalcul price after each change in OrderList
  // eslint-disable-next-line
  useEffect(() => {
    setTotalPrice(handleTotalPrice(pendingOrder));
  });

  return (
    <Fragment>
      <h1 className="order-title">{user.isAdmin ? "Payed" : "Your order:"}</h1>
      <div className="order-cont">
        <div className="order-list">
          {user.isAdmin
            ? payedOrders.map((order, orderIndex) => (
                <div className="order-payed" key={`${order + orderIndex}`}>
                  <h1>N°{orderIndex}</h1>
                  {order.map((product, index) => (
                    <ProductCard
                      key={`payed${product.name}${orderIndex}`}
                      user={user}
                      product={product}
                      actions={{ orderActions, productActions }}
                      index={index}
                      inOrderList={true}
                    />
                  ))}
                  <div className="order-payed-footer">
                    <span className="order-price">
                      {handleTotalPrice(order)} €
                    </span>
                    <button
                      className="btn btn-warning btn-order-send"
                      onClick={() => orderActions.sendOrder(orderIndex)}
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
                  actions={{ orderActions, productActions }}
                  index={index}
                  inOrderList={true}
                />
              ))}
        </div>
        {!user.isAdmin && (
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

export default OrderList;
