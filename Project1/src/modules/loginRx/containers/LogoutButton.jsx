import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { logout as actionLogout } from 'srs/redux/user/actions';
import Link from 'react-router/lib/Link';

const LogoutButton = ({ loggedIn, logout, token, className, style, hideLogoutWhenSmall }) => (
  <Link
    disabled={!loggedIn}
    to="/login"
    className={className}
    style={style}
    onClick={() => {
      if (loggedIn) {
        logout(token);
      }
    }}
  >
    <i className="fa fa-sign-out" aria-hidden="true" />
    <span className={hideLogoutWhenSmall ? 'hidden-xs' : null}>Log out</span>
  </Link>
);

LogoutButton.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  token: PropTypes.shape().isRequired,
  className: PropTypes.string,
  style: PropTypes.shape(),
  hideLogoutWhenSmall: PropTypes.bool,
};

export default connect(
  state => ({
    loggedIn: state.login.loggedIn,
    token: state.login.token,
  }),
  dispatch => ({
    logout: (token) => {
      dispatch(actionLogout(token));
    },
  }),
)(LogoutButton);
