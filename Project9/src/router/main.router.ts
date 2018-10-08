import * as React from 'react';
import { Provider } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router';
import browserHistory from './browserHistory';
import { ConnectedRouter } from 'react-router-redux';
import Loadable from 'react-loadable';
import ErrorPage from '../modules/error/components/ErrorPage';
import Notfound from '../modules/notfound/components/NotFound';
import Loader from '../modules/loader/components/Loader';

const MainView = Loadable({
  loader: () => import(
    /* webpackMode: "lazy" */
    /* webpackChunkName: "MainView" */
    '../modules/landing/components/LandingUI',
  ),
  loading: Loader,
});

const Login = Loadable({
  loader: () => import(
    /* webpackMode: "lazy" */
    /* webpackChunkName: "LoginView" */
    '../modules/landing/components/LandingUI',
  ),
  loading: Loader,
});

const Router = () => (
  <Provider>
    <ConnectedRouter history={browserHistory} >
      <Switch>
        <Route path="/error" component={ErrorPage} />
        <Route path="/notfound" component={NotFound} />
        <Route path="/main" component={MainView} />
        <Route path="/" component={Login} />
        <Route path="*" render={() => <Redirect to="/notfound" />} />
      </Switch>
    </ConnectedRouter>
  </Provider>
);

export default Router;
