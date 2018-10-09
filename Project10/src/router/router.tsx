import * as React from 'react';
import { Route, Redirect, Switch } from 'react-router';
import browserHistory from './browserHistory';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import initStore from '../store';
import MainView from '../modules/landing/containers/MainView';
import Login from '../modules/login/containers/Login';
import ErrorPage from '../modules/error/components/ErrorPage';
import NotFound from '../modules/notfound/components/NotFound';

const store = initStore();

export const AppRouter: React.StatelessComponent<{}> = () => {

  return (
    <Provider store={store}>
      <ConnectedRouter history={browserHistory} >
        <Switch>
          <Route path="/notfound" component={NotFound} />
          <Route path="/error" component={ErrorPage} />
          <Route path="/main" component={MainView} />
          <Route path="/" component={Login} />
          <Route path="*" render={() => <Redirect to="/notfound" />} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
}