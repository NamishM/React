import '../../login/css/login.less';
import React from 'react';
import { connect } from 'react-redux';
import {
  registerApplication,
  unregisterApplication,
  selectEndpoint,
  unselectEndpoint,
} from 'srs/redux/appRegistration/actions';
import AppRegistrationUI from '../components/AppRegistrationUI';

const mapStateToProps = state => ({
  endpoints: state.appRegistration.endpoints,
  isRegistered: state.appRegistration.isRegistered,
  registrationGuid: state.appRegistration.registrationGuid,
  appName: state.appRegistration.appName,
});

const mapDispatchToProps = dispatch => ({
  onRegisterClicked: (appName) => {
    dispatch(registerApplication(appName));
  },
  onUnregisterClicked: () => dispatch(unregisterApplication()),
  onEndpointSelected: endpoint => dispatch(selectEndpoint(endpoint)),
  onEndpointUnselected: endpoint => dispatch(unselectEndpoint(endpoint)),
});

const AppRegistration = connect(mapStateToProps, mapDispatchToProps)(AppRegistrationUI);

const App = () => (
  <AppRegistration />
);

export default App;
