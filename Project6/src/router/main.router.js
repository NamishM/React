import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router';
import browserHistory from './browserHistory';
import { ConnectedRouter } from 'react-router-redux';
import Loadable from 'react-loadable';

const ErrorPage = () => (
  <h1>400.. Bad Error!</h1> // eslint-disable-line
);

const Loading = () => <div>Loading...</div>;

const MainView = Loadable({
  loader: () => import(
    /* webpackMode: "lazy" */
    /* webpackChunkName: "MainView" */
    'modules/landing/containers/MainView',
  ),
  loading: Loading,
});

const Login = Loadable({
  loader: () => import(
    /* webpackMode: "lazy" */
    /* webpackChunkName: "LoginView" */
    'modules/login/containers/Login',
  ),
  loading: Loading,
});

const App = ({ store }) => (
  <Provider store={store}>
    <ConnectedRouter history={browserHistory} >
      <Switch>
        <Route path="/error" component={ErrorPage} />
        <Route path="/main" component={MainView} />
        <Route path="/" component={Login} />
        <Route path="*" render={() => <Redirect to="/notfound" />} />
      </Switch>
    </ConnectedRouter>
  </Provider>
);


App.propTypes = {
  store: PropTypes.shape(),
};

export default App;
