import { connect } from 'react-redux';
import {
  checkCredentials,
  getPlanetsData,
}
  from 'src/redux/actions/ItemsAction';
import MainViewUI from '../components/MainViewUI';

const mapStateToProps = state => ({
  loginSuccess: state.auth.loginSuccess,
  items: state.results,
  planetsItem: state.planetsItem,
});

const mapDispatchToProps = dispatch => ({
  onCheckCredentials: ({
    credentials,
  }) => dispatch(checkCredentials(credentials)),
  getPlanetsData: url => dispatch(getPlanetsData(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainViewUI);
