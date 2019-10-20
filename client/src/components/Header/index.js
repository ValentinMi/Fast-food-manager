import React from "react";
import { connect, useSelector } from "react-redux";

import { imageURL } from "../../config.json";

import "./index.scss";

const Header = () => {
  const name = useSelector(state => state.themeReducer.appName);

  return (
    <div className="header">
      <span className="header-title">{name}</span>
    </div>
  );
};

export default connect()(Header);
