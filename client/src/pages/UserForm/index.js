import React, { Component } from "react";
import { connect } from "react-redux";

import { register, updateUser } from "../../actions/user.actions";

import "./index.scss";

class UserForm extends Component {
  state = {
    email: "",
    password: "",
    passwordConfirmation: ""
  };

  handleChange = event => {
    switch (event.target.name) {
      case "email":
        this.setState({ email: event.target.value });
        break;
      case "password":
        this.setState({ password: event.target.value });
        break;
      case "confirmPassword":
        this.setState({ passwordConfirmation: event.target.value });
        break;
      default:
        break;
    }
  };

  handleSubmit = () => {
    const { user, register, updateUser } = this.props;
    if (!user.isLogged) register(this.state);
    updateUser(user._id, this.state);
  };

  render() {
    // Destructure props
    const { user } = this.props;

    return (
      <div className="form-group form-user">
        {user.isLogged ? <h1>Update</h1> : <h1>Register</h1>}
        <label>Email</label>
        <input name="email" type="text" onChange={this.handleChange} />
        <label>Password</label>
        <input name="password" type="password" onChange={this.handleChange} />
        <label>Confirm password</label>
        <input
          name="confirmPassword"
          type="password"
          onChange={this.handleChange}
        />
        <button className="btn btn-primary" onClick={this.handleSubmit}>
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
