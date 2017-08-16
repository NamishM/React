import PropTypes from 'prop-types';
import React from 'react';
import RegistrationForm from './RegistrationForm';
import RegistrationSuccess from './RegistrationSuccess';
import getYear from 'date-fns/get_year';


const AppRegistrationUI = ({
  endpoints,
  isRegistered,
  registrationGuid,
  appName,
  onRegisterClicked,
  onUnregisterClicked,
  onEndpointSelected,
  onEndpointUnselected,
}) =>
  (
    <div className="login-background full-height">
      <div className="col-md-3 col-lg-4" />
      <div className="col-centered col-md-6 col-lg-4 login-form">
        {
          isRegistered ?
            <RegistrationSuccess
              endpoints={endpoints}
              appName={appName}
              registrationGuid={registrationGuid}
              onUnregisterClicked={onUnregisterClicked}

            />
            :
            <RegistrationForm
              endpoints={endpoints}
              appName={appName}
              onRegisterClicked={onRegisterClicked}
              onEndpointSelected={onEndpointSelected}
              onEndpointUnselected={onEndpointUnselected}
            />
        }
      </div>
      <div className="col-md-3 col-lg-4" />
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 copyright-info">
        <label>
        Powered by IMO
          <span className="fa fa-registered" /> terminology. <span className="fa fa-copyright" />
        1995-{ getYear(new Date()) } Intelligent Medical
        Objects, Inc. All rights reserved.
        </label>
      </div>
    </div>
  );

AppRegistrationUI.propTypes = {
  endpoints: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
  }).isRequired),
  isRegistered: PropTypes.bool.isRequired,
  registrationGuid: PropTypes.string,
  appName: PropTypes.string,
  onRegisterClicked: PropTypes.func.isRequired,
  onUnregisterClicked: PropTypes.func.isRequired,
  onEndpointSelected: PropTypes.func.isRequired,
  onEndpointUnselected: PropTypes.func.isRequired,
};

export default AppRegistrationUI;
