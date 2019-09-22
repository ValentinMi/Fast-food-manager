import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import {
  getProducts,
  postProduct,
  updateProductById,
  removeProductById
} from "../../actions/product.actions";

import // addProductToOrder,
// removeProductFromOrder,
// buyOrder,
// sendOrder
"../../actions/order.actions";

import { becomeCustomer, becomeAdmin } from "../../actions/user.actions";

import NavBar from "../../components/NavBar";
import ProductForm from "../../components/ProductForm";

import Board from "../../components/Board";

import "./index.scss";

class Main extends Component {
  componentDidMount() {
    // Fetch products
    this.props.productActions.getProducts();
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
      <Fragment>
        <NavBar />
        <div className="main">
          <div className="row row-form">
            {// Render ProductForm if user is admin
            user.isAdmin && <ProductForm actions={productActions} />}
          </div>
          <Board
            products={products}
            orders={orders}
            user={user}
            actions={{ productActions, orderActions }}
          />
        </div>
      </Fragment>
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
    postProduct: product => dispatch(postProduct(product)),
    updateProductById: (productId, data) =>
      dispatch(updateProductById(productId, data)),
    removeProductById: productId => dispatch(removeProductById(productId))
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
