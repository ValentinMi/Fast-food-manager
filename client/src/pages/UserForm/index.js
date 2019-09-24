import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { register, updateUser } from "../../actions/user.actions";
import { login } from "../../actions/auth.actions";

import "./index.scss";

class UserForm extends Component {
  state = {
    formType: "",
    data: {
      email: "",
      password: "",
      passwordConfirmation: ""
    },
    user: this.props.user
  };

  componentDidMount() {
    this.setState({ formType: this.props.type });
  }

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
    switch (formType) {
      case "register":
        register(data);
        break;
      case "login":
        login(data);
        break;
      case "update":
        updateUser(user._id, data);
        break;
      default:
        break;
    }
    // Go to home
    // this.props.history.push("/");
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
  user: state.userReducer.user
});

const mapDispatchToProps = dispatch => ({
  register: data => dispatch(register(data)),
  updateUser: (userId, data) => dispatch(updateUser(userId, data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserForm);
