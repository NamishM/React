import { connect } from 'react-redux';
import { login, loginFailed } from 'srs/redux/user/actions';
import LoginUI from '../components/LoginUI';

const mapStateToProps = state => ({
  dataSources: state.login.dataSources,
  isLoading: state.login.isLoading,
  errorMessage: state.login.errorMessage,
  isLoggedIn: state.login.loggedIn,
  userForm: state.userForm,
  user: state.user,
  userLocked: state.login.userLocked,
  progressValueNow: state.login.progressValueNow,
  loginUrl: state.login.identityServerModel.loginUrl,
  serverErrorMessage: state.login.identityServerModel.errorMessage,
});

const Login = connect(
  mapStateToProps,
  {
    login,
    loginFailed,
  },
)(LoginUI);

export default Login;
