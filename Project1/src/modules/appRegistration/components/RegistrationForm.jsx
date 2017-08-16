import classes from '../css/appRegistration.css';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class RegistrationForm extends Component {
  render() {
    const {
      endpoints,
      appName,
      onRegisterClicked,
      onEndpointSelected,
      onEndpointUnselected,
    } = this.props;

    return (
      <form
        className="form-horizontal"
        onSubmit={(e) => {
          e.preventDefault();
          onRegisterClicked(this.applicationName.value);
        }}
      >
        <div className="logo" />

        <div className="input-form">
          <div className={classes.appRegistration}>
            <div className="form-group">
              <label
                htmlFor="txtAppName"
                className="col-xs-12 col-sm-3 control-label label-input"
              >
                Application Name:
              </label>
              <div className="col-xs-12 col-sm-9">
                <input
                  autoFocus
                  id="txtAppName"
                  type="text"
                  className="form-control"
                  value={appName}
                  ref={(input) => { this.applicationName = input; }}
                />
              </div>
            </div>
            <div className="form-group">
              <label
                htmlFor="txtAppName"
                className="col-xs-12 col-sm-3 control-label label-input"
              >
                Endpoints:
              </label>
              <div className="col-xs-12 col-sm-9">
                <div>
                  {endpoints.map(ep => (
                    <div className="checkbox">
                      <label>
                        <input
                          type="checkbox"
                          {...ep.isSelected ? { checked: 'true' } : {}}
                          onClick={() => {
                            if (ep.isSelected) {
                              onEndpointUnselected(ep);
                            } else {
                              onEndpointSelected(ep);
                            }
                          }}
                        /> {ep.name}
                      </label>
                    </div>),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-12 text-center">
          <button className="btn btn-lg btn-default button-login">
            Register Application
          </button>
        </div>
      </form>
    );
  }
}

RegistrationForm.propTypes = {
  endpoints: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
  }).isRequired),
  appName: PropTypes.string,
  onRegisterClicked: PropTypes.func.isRequired,
  onEndpointSelected: PropTypes.func.isRequired,
  onEndpointUnselected: PropTypes.func.isRequired,
};


export default RegistrationForm;
