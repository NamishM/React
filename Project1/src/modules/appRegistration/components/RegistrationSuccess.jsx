import classes from '../css/appRegistration.css';
import PropTypes from 'prop-types';
import React from 'react';

const RegistrationSuccess = ({
  endpoints,
  appName,
  registrationGuid,
  onUnregisterClicked,
}) => (
  <form
    className="form-horizontal"
    onSubmit={(e) => {
      e.preventDefault();
      onUnregisterClicked();
    }}
  >
    <div className="logo" />

    <div className="input-form">
      <div className={classes.appRegistration}>
        <div className="form-group">
          <h4>{appName}</h4>
          Has been successfully registered!
        </div>
        <div className="form-group">
          The following endpoints are associated with this registration.
        </div>
        <div className="form-group">
          <ul>
            {endpoints.map((ep) => {
              if (ep.isSelected) {
                return <li>{ep.name}</li>;
              }
              return null;
            })}
          </ul>
        </div>
        <div className="form-group">
          Use the following token for access to the SRS API.<br />
          {registrationGuid}
        </div>
      </div>
    </div>

    <div className="col-md-12 text-center">
      <button className="btn btn-lg btn-default button-login">
        Unregister Application
      </button>
    </div>
  </form>
);

RegistrationSuccess.propTypes = {
  endpoints: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
  }).isRequired),
  appName: PropTypes.string,
  registrationGuid: PropTypes.string,
  onUnregisterClicked: PropTypes.func.isRequired,
};

export default RegistrationSuccess;
