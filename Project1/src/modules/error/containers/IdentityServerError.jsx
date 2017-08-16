import { connect } from 'react-redux';
import ErrorUI from '../components/ErrorUI';

export default connect(
  state => ({
    errorMessage: state.login.identityServerModel.errorMessage,
  }),
)(ErrorUI);
