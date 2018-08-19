import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router';
import browserHistory from './browserHistory';
import { ConnectedRouter } from 'react-router-redux';
import MainView from 'modules/common/components/MainView';

const ErrorPage = () => (
  <h1>400.. Bad Error!</h1> // eslint-disable-line
);

const App = ({ store }) => (
  <Provider store={store}>
    <ConnectedRouter history={browserHistory} >
      <Switch>
        <Route path="/error" component={ErrorPage} />
        <Route path="/" component={MainView} />
        <Route path="*" render={() => <Redirect to="/notfound" />} />
      </Switch>
    </ConnectedRouter>
  </Provider>
);


App.propTypes = {
  store: PropTypes.shape(),
};

export default App;
