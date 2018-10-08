import { connect } from 'react-redux';
import {
  checkCredentials,
  getPlanetsData,
}
  from 'src/redux/actions/ItemsAction';
import MainViewUI from '../components/MainViewUI';

const mapStateToProps = (state: any) => ({
  loginSuccess: state.auth.loginSuccess,
  items: state.results,
  planetsItem: state.planetsItem,
});

const mapDispatchToProps = (dispatch: any) => ({
  getPlanetsData: (url: string) => dispatch(getPlanetsData(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainViewUI);
