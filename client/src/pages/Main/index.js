import React, { Component, Fragment } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";

import NavBar from "../../components/NavBar";
import Board from "../../components/Board";
import UserForm from "../../components/UserForm";

import { history } from "../../store";

import "./index.scss";

class Main extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <Router history={history}>
          <div className="main">
            <Switch>
              <Route exact path="/" component={Board} />
              <Route exact path="/register" component={UserForm} />
            </Switch>
          </div>
        </Router>
      </Fragment>
    );
  }
}

export default Main;
