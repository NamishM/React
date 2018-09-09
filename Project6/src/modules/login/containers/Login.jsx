import { connect } from 'react-redux';
import {
  checkCredentials,
  LoginFaied,
} from 'src/redux/actions/ItemsAction';
import LoginUI from '../components/LoginUI';

const mapStateToProps = state => ({
  loginSuccess: state.auth.loginSuccess,
});

const mapDispatchToProps = dispatch => ({
  onCheckCredentials: (username, password) =>
    dispatch(checkCredentials(username, password)),
  setLoginfailed: () => dispatch(LoginFaied()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginUI);
