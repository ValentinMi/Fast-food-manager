import { useEffect } from "react";
import { connect } from "react-redux";

import { logout } from "../../actions/auth.actions";

const Logout = ({ logout, history }) => {
  useEffect(() => {
    logout();
    history.push("/");
  }, [logout, history]);

  return null;
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout);
