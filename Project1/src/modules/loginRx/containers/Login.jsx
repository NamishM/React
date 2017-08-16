import { connect } from 'react-redux';
import { login, loginFailed } from 'srs/redux/userRx/actions';
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
});

const Login = connect(
  mapStateToProps,
  {
    login,
    loginFailed,
  },
)(LoginUI);

export default Login;
