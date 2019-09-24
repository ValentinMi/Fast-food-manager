import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { register, updateUser } from "../../actions/user.actions";
import { login } from "../../actions/auth.actions";

import "./index.scss";

class UserForm extends Component {
  state = {
    formType: this.props.type,
    data: {
      email: "",
      password: ""
    },
    user: this.props.user
  };

  handleChange = event => {
    switch (event.target.name) {
      case "email":
        this.setState({
          data: { ...this.state.data, email: event.target.value }
        });
        break;
      case "password":
        this.setState({
          data: { ...this.state.data, password: event.target.value }
        });
        break;
      case "confirmPassword":
        this.setState({
          data: { ...this.state.data, passwordConfirmation: event.target.value }
        });
        break;
      default:
        break;
    }
  };

  handleSubmit = () => {
    const { formType, data, user } = this.state;
    const { register, updateUser } = this.props.userActions;
    const { login } = this.props.authActions;
    switch (formType) {
      case "register":
        register(data);
        // Redirect to login
        this.props.history.push("/login");
        break;
      case "login":
        login(data);
        // Redirect to home
        this.props.history.push("/");
        break;
      case "update":
        updateUser(user._id, data);
        break;
      default:
        break;
    }
  };

  // validateForm = () => {
  //
  // };

  render() {
    // Destructure props
    const { formType } = this.state;

    return (
      <div className="form-group form-user">
        <h1 className="form-title">{this.state.formType}</h1>
        <label>Email</label>
        <input name="email" type="text" onChange={this.handleChange} />
        <label>Password</label>
        <input name="password" type="password" onChange={this.handleChange} />
        {formType !== "login" && (
          <Fragment>
            <label>Confirm password</label>
            <input
              name="confirmPassword"
              type="password"
              onChange={this.handleChange}
            />
          </Fragment>
        )}
        <button
          className={
            // this.validateForm() ? "btn btn-primary" : "btn btn-primary disabled"
            "btn btn-primary"
          }
          onClick={this.handleSubmit}
        >
          Register
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authReducer.user
});

const mapDispatchToProps = dispatch => ({
  userActions: {
    register: data => dispatch(register(data)),
    updateUser: (userId, data) => dispatch(updateUser(userId, data))
  },
  authActions: {
    login: data => dispatch(login(data))
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserForm);
