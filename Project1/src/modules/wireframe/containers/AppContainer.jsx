import { connect } from 'react-redux';
import App from '../components/App';
import { desktopToggleFullscreen, smallTogglePanels } from 'srs/redux/browser/actions';
import { actions as modelAction } from 'react-redux-form';

const mapStateToProps = state => ({
  isDesktopLayout: state.browser.screenLayout === 'desktop',
  desktopVisiblePanel: state.wireframe.desktopVisiblePanel,
  deviceVisiblePanel: state.wireframe.deviceVisiblePanel,
  pathName: state.routing.currentPath,
  isLoggedIn: state.login.loggedIn,
  isDisplayTimeOutAlert: state.timeOutAlertExtension.isDisplayTimeOutAlert,
  isTaskingEnabled: state.login.isTaskingEnabled,
});

const mapDispatchToprops = dispatch => ({
  onDesktopToggleFullscreen: () => {
    dispatch(modelAction.change('searchCriteria.ssn', ''));
    dispatch(desktopToggleFullscreen());
  },
  onSmallTogglePanels: () => {
    dispatch(modelAction.change('searchCriteria.ssn', ''));
    dispatch(smallTogglePanels());
  },
});

const AppContainer = connect(mapStateToProps, mapDispatchToprops)(App);

export default AppContainer;
