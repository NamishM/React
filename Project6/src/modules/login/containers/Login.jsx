import { connect } from 'react-redux';
import {
  checkCredentials,
} from 'src/redux/actions/ItemsAction';
import MainViewUI from '../components/LoginUI';

const mapStateToProps = (state) => ({
  loginSuccess: state.auth.loginSuccess,
});

const mapDispatchToProps = dispatch => ({
  onCheckCredentials: ({
    credentials,
  }) => dispatch(checkCredentials(credentials)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginUI);
