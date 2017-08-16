import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { logout as actionLogout } from 'srs/redux/user/actions';
import Link from 'react-router/lib/Link';

const LogoutButton = ({ loggedIn, logout, className, style, hideLogoutWhenSmall }) => (
  <Link
    disabled={!loggedIn}
    className={className}
    style={style}
    onClick={() => {
      if (loggedIn) {
        logout();
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
  className: PropTypes.string,
  style: PropTypes.shape(),
  hideLogoutWhenSmall: PropTypes.bool,
};

export default connect(
  state => ({
    loggedIn: state.login.loggedIn,
  }),
  dispatch => ({
    logout: () => {
      dispatch(actionLogout());
    },
  }),
)(LogoutButton);
