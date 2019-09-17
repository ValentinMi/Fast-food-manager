import React, { Component } from "react";
import { connect } from "react-redux";

import {
  addProduct,
  removeProduct,
  refoundProduct
} from "../../actions/product.actions";

import {
  addProductToOrder,
  removeProductFromOrder,
  buyOrder,
  sendOrder
} from "../../actions/order.actions";

import { becomeCustomer, becomeAdmin } from "../../actions/user.actions";

import ProductCard from "../../components/productCard";
import ProductForm from "../../components/productForm";
import UserMagicButton from "../../components/userMagicButton";
import OrderList from "../../components/orderList";

import "./index.scss";

class Main extends Component {
  render() {
    // Props variables
    const { products, orders, user } = this.props;

    //  Product props actions
    const { productActions } = this.props;

    // Order props actions
    const { orderActions } = this.props;

    // User props actions
    const { userActions } = this.props;

    return (
      <div className="main">
        <div className="row row-form">
          <UserMagicButton user={user} actions={userActions} />
          {// Render ProductForm if user is admin
          user.isAdmin && <ProductForm actions={productActions} />}
        </div>
        <div className="row">
          <div className="col-9">
            <div className="row product-cont">
              {products.map((product, index) => (
                <div key={product.name} className="col-4">
                  <ProductCard
                    product={product}
                    user={user}
                    actions={{ orderActions, productActions }}
                    index={index}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="col-3">
            <OrderList
              orders={orders}
              user={user}
              actions={{ orderActions, productActions }}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.productReducer.products,
  orders: state.orderReducer.orders,
  user: state.userReducer.user
});

const mapDispatchToProps = dispatch => ({
  // Product
  productActions: {
    addProduct: newProduct => dispatch(addProduct(newProduct)),
    removeProduct: index => dispatch(removeProduct(index)),
    refoundProduct: (index, selectValue) =>
      dispatch(refoundProduct(index, selectValue))
  },
  // Order
  orderActions: {
    addProductToOrder: (product, quantity, price) =>
      dispatch(addProductToOrder(product, quantity, price)),
    removeProductFromOrder: index => dispatch(removeProductFromOrder(index)),
    buyOrder: orderList => dispatch(buyOrder(orderList)),
    sendOrder: index => dispatch(sendOrder(index))
  },
  // User
  userActions: {
    becomeCustomer: () => dispatch(becomeCustomer()),
    becomeAdmin: () => dispatch(becomeAdmin())
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
