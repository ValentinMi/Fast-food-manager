import React, { useState, useEffect } from "react";

import ProductCard from "../productCard/index";

import "./index.scss";

const OrderList = ({ orders, user, actions }) => {
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

  // Recalcul price after each change in OrderList
  // eslint-disable-next-line
  useEffect(() => {
    setTotalPrice(handleTotalPrice(pendingOrder));
  });

  return (
    <div className="order-cont">
      <div className="order-list">
        {user.isAdmin
          ? payedOrders.map((order, index) => (
              <div className="order-payed" key={order}>
                <h1>N°{index}</h1>
                {order.map((product, index) => (
                  <ProductCard
                    key={`payed${product.name}`}
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
                    onClick={() => orderActions.sendOrder(index)}
                  >
                    Send
                  </button>
                </div>
              </div>
            ))
          : pendingOrder.map((product, index) => (
              <ProductCard
                key={`pending${product.name}`}
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
            onClick={() => orderActions.buyOrder(pendingOrder)}
          >
            BUY
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderList;
