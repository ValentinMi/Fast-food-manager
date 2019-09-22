import React, { Component } from "react";
import { connect } from "react-redux";

import {
  getProducts,
  postProduct,
  updateProductById,
  removeProductById
} from "../../actions/product.actions";

import {
  // addProductToOrder,
  // removeProductFromOrder,
  // buyOrder,
  // sendOrder
} from "../../actions/order.actions";

import { becomeCustomer, becomeAdmin } from "../../actions/user.actions";

import ProductCard from "../../components/ProductCard";
import ProductForm from "../../components/ProductForm";
import OrderList from "../../components/OrderList";

import "./index.scss";

class Main extends Component {

  componentDidMount() {
  // Fetch products
    this.props.productActions.getProducts()
  }

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
    getProducts: () => dispatch(getProducts()),
    postProduct: (product) => dispatch(postProduct(product)),
    updateProductById: (productId, data) => dispatch(updateProductById(productId, data)),
    removeProductById: (productId) => dispatch(removeProductById(productId))
  },
  // Order
  orderActions: {
    // addProductToOrder: (product, quantity, price) =>
    //   dispatch(addProductToOrder(product, quantity, price)),
    // removeProductFromOrder: index => dispatch(removeProductFromOrder(index)),
    // buyOrder: orderList => dispatch(buyOrder(orderList)),
    // sendOrder: index => dispatch(sendOrder(index))
  },
  // User
  userActions: {
    // becomeCustomer: () => dispatch(becomeCustomer()),
    // becomeAdmin: () => dispatch(becomeAdmin())
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
