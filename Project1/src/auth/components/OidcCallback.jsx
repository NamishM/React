import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { CallbackComponent } from 'redux-oidc';
import { userManager } from '../oidc';
import {
  getOidcUserSuccess,
  getOidcUserFailed,
} from 'srs/redux/user/actions';

const OidcCallback = ({ loggedInRedirect, loggedOutRedirect }) => (
  <CallbackComponent
    successCallback={user => loggedInRedirect(user)}
    errorCallback={() => loggedOutRedirect()}
    userManager={userManager}
  />
);

OidcCallback.propTypes = {
  loggedInRedirect: PropTypes.func.isRequired,
  loggedOutRedirect: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    loggedInRedirect: (user) => {
      // todo: do we need to check for user expiration here?
      // what if user replays a previous url redirec to this route?
      dispatch(getOidcUserSuccess(user));
    },
    loggedOutRedirect: () => {
      dispatch(getOidcUserFailed('User not loaded in callback.'));
    },
  };
}

export default connect(null, mapDispatchToProps)(OidcCallback);
