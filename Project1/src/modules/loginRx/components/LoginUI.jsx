import PropTypes from 'prop-types';
import React from 'react';
import Option from './Option';
import getYear from 'date-fns/get_year';
import { Field } from 'react-redux-form';
import { isNull, isInt } from 'validator';
import LogoutButton from '../containers/LogoutButton';

const required = value => !isNull(value);

const LoginUI = ({
  dataSources,
  isLoading,
  login,
  loginFailed,
  errorMessage,
  isLoggedIn,
  userForm: { fields },
  user,
  userLocked,
  progressValueNow,
}) => (
  <div className="login-background full-height">
    <div className="login-form">
      <form
        className="form-horizontal"
        onSubmit={(e) => {
          e.preventDefault();

          // TODO: perhaps move to reducer?
          const message = [
            !fields.dataSourceId.valid ? 'Please provide a valid data source' : null,
            !fields.password.valid && !fields.userName.valid ?
              'You must enter your User Name and Password' : null,
            !fields.userName.valid ? 'You must enter your User Name' : null,
            !fields.password.valid ? 'You must enter your Password' : null,
          ].reduce((prev, next) => prev || next, null);

          if (!message) {
            login(user.userName, user.password, user.dataSourceId);
          } else {
            loginFailed(message);
          }
        }}
      >
        <div className="logo" />
        <div className="input-form">
          <div className="form-group source-input">
            <label
              htmlFor="dataSources"
              className="col-xs-12 col-sm-3 control-label label-input"
            >
              Login to:
            </label>
            <div className="col-xs-12 col-sm-9">
              <Field
                model="user.dataSourceId"
                validators={{
                  required: value => isInt(`${value}`),
                }}
              >
                <select
                  id="dataSources"
                  className="form-control"
                  disabled={isLoggedIn}
                >
                  {dataSources.map(dataSource => (
                    <Option
                      key={dataSource.id}
                      {...dataSource}
                    />),
                  )}
                </select>
              </Field>
            </div>
          </div>
          <div className={`form-group ${fields.userName.valid ? 'has-success' : 'has-error'}`}>
            <label
              htmlFor="txtUserName"
              style={{ whiteSpace: 'nowrap' }}
              className="col-xs-12 col-sm-3 control-label label-input"
            >
              Username:
            </label>
            <div className="col-xs-12 col-sm-9">
              <Field
                model="user.userName"
                validators={{
                  required,
                }}
              >
                <input
                  autoFocus
                  id="txtUserName"
                  type="text"
                  className="form-control"
                  autoComplete={'off'}
                  disabled={isLoggedIn || userLocked}
                />
              </Field>
            </div>
          </div>
          <div className={`form-group ${fields.password.valid ? 'has-success' : 'has-error'}`}>
            <label
              htmlFor="txtPassword"
              className="col-xs-12 col-sm-3 control-label label-input"
            >
              Password:
            </label>
            <div className="col-xs-12 col-sm-9">
              <Field
                model="user.password"
                validators={{
                  required,
                }}
              >
                <input
                  id="txtPassword"
                  type="password"
                  className="form-control"
                  autoComplete={'off'}
                  disabled={isLoggedIn || userLocked}
                />
              </Field>
            </div>
          </div>
          <div className="form-group">
            <div data-auto="chk_Emergency" className="col-xs-12 col-sm-offset-3 col-sm-9">
              <Field model="user.isEmergencyAccess">
                <label className="text-danger" htmlFor="chkEmergency">
                  <input
                    id="chkEmergency"
                    type="checkbox"
                    disabled={isLoggedIn || userLocked}
                  /> Emergency Access
                </label>
              </Field>
            </div>
          </div>
          <div className="form-group">
            <div data-auto="label_ErrorMessage" className="col-xs-12 col-sm-offset-3 col-sm-9">
              <span className="control-label label-Error">
                {errorMessage}
              </span>
            </div>
          </div>
          <div
            className="form-group"
            style={{ margin: '0 -20px' }}
          >
            <div
              className="progressbar"
              style={{
                visibility: isLoading ? 'visible' : 'hidden',
              }}
            >
              <div
                className="progress"
                style={{
                  marginBottom: 0,
                  height: '10px',
                  margin: 0,
                  borderRadius: 0,
                }}
              >
                <div
                  className="progress-bar progress-bar-info progress-bar-striped"
                  role="progressbar"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-valuenow={progressValueNow}
                  style={{
                    width: `${progressValueNow}%`,
                    lineHeight: '10px',
                  }}
                >
                  {progressValueNow}%
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12 text-center">
          <button
            data-auto="btn_Login"
            className="btn btn-lg btn-danger"
            disabled={isLoading || isLoggedIn || userLocked}
            style={{ marginRight: '4px' }}
          >
            Log In
          </button>
          {
            isLoggedIn ? <LogoutButton className="btn btn-lg btn-danger" /> : null
          }
        </div>
      </form>
    </div>
    <div data-auto="label_Copyright" className="copyright-info">
      <label>
        Powered by IMO
        <span className="fa fa-registered" /> terminology.
        <span className="fa fa-copyright" /> 1995-{ getYear(new Date()) } Intelligent Medical
        Objects, Inc. All rights reserved.
      </label>
    </div>
  </div>
);

LoginUI.propTypes = {
  dataSources: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  isLoading: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  loginFailed: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  userForm: PropTypes.shape().isRequired,
  user: PropTypes.shape().isRequired,
  userLocked: PropTypes.bool.isRequired,
  progressValueNow: PropTypes.number.isRequired,
};

export default LoginUI;
