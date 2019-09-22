import React from "react";
import OrderList from "../OrderList";
import ProductCard from "../ProductCard";

const Board = ({ products, user, actions, orders }) => {
  //  Product props actions
  const { productActions } = actions;

  // Order props actions
  const { orderActions } = actions;

  return (
    <div className="row">
      <div className="col-9">
        <div className="row product-cont">
          {products.map((product, index) => (
            <div key={product.name} className="col-4">
              <ProductCard
                product={product}
                user={user}
                actions={{ orderActions, productActions }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="col-3">
        <OrderList
          products={products}
          orders={orders}
          user={user}
          actions={{ orderActions, productActions }}
        />
      </div>
    </div>
  );
};

export default Board;
