import React, { Component } from "react";
import { connect } from "react-redux";

import {
  getProducts,
  postProduct,
  updateProductById,
  removeProductById
} from "../../actions/product.actions";

import OrderList from "../../components/OrderList";
import ProductCard from "../../components/ProductCard";
import ProductForm from "../../components/ProductForm";

class Board extends Component {
  componentDidMount() {
    // Fetch products
    this.props.productActions.getProducts();
  }
  render() {
    // Props variables
    const { products, user } = this.props;

    // Destructure user obj
    const { isAdmin } = user.data;

    //  Props actions
    const { productActions, pendingOrderActions } = this.props;

    return (
      <div className="board">
        <div className="row row-form">
          {// Render ProductForm if user is admin
          isAdmin && <ProductForm actions={productActions} />}
        </div>
        <div className="row">
          <div className="col-9">
            <div className="row product-cont">
              {products.map(product => (
                <div key={product.name} className="col-4">
                  <ProductCard product={product} user={user} />
                </div>
              ))}
            </div>
          </div>
          <div className="col-3">{user.isLogged && <OrderList />}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.productReducer.products,
  pendingOrder: state.pendingOrderReducer.pendingOrder,
  user: state.authReducer.user
});

const mapDispatchToProps = dispatch => ({
  // Product
  productActions: {
    getProducts: () => dispatch(getProducts()),
    postProduct: product => dispatch(postProduct(product)),
    updateProductById: (productId, data) =>
      dispatch(updateProductById(productId, data)),
    removeProductById: productId => dispatch(removeProductById(productId))
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
