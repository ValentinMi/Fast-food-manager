import React, { Component, Fragment } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";

import NavBar from "../../components/NavBar";
import Board from "../Board";
import UserForm from "../UserForm";

import { history } from "../../store";

import "./index.scss";

class Main extends Component {
  render() {
    return (
      <Router history={history}>
        <NavBar />
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
              component={props => <UserForm {...props} type={"login"} />}
            />
            <Route
              key="update-user"
              exact
              path="/profil"
              component={props => <UserForm {...props} type={"update"} />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Main;
