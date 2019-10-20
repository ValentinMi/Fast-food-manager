import React, { useEffect } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { loginWithJwt } from "../../actions/auth.actions";

import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import Board from "../Board";
import UserForm from "../UserForm";
import Logout from "../Logout";

import { history } from "../../store";

import "./index.scss";

const Main = ({ user, loginWithJwt }) => {
  useEffect(() => {
    if (localStorage.getItem("ffm-token") !== null) {
      loginWithJwt();
    }
  }, [loginWithJwt]);

  return (
    <Router history={history}>
      <NavBar />
      <Header />
      <div className="main">
        <Switch>
          <Route exact path="/" component={Board} />
          <Route
            key="register-user"
            exact
            path="/register"
            component={props => <UserForm {...props} type={"register"} />}
          />
          <Route
            key="login-user"
            exact
            path="/login"
            component={props =>
              user.isLogged ? (
                <Redirect to="/" />
              ) : (
                <UserForm {...props} type={"login"} />
              )
            }
          />
          <Route
            key="update-user"
            exact
            path="/profil"
            component={props => <UserForm {...props} type={"update"} />}
          />
          <Route exact path="/logout" component={Logout} />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    </Router>
  );
};

const mapStateToProps = state => ({
  user: state.authReducer.user
});

const mapDispatchToProps = dispatch => ({
  loginWithJwt: () => dispatch(loginWithJwt())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
