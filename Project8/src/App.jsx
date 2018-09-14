import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import './App.css';
import MainView from 'modules/common/components/MainView';

const ErrorPage = () => (
  <h1>400.. Bad Error!</h1>
);

const App = () => (
  <Router>
    <div>
      <Route exact path={'/'} component={MainView} />
      <Route path={'/error'} component={ErrorPage} />
    </div>
  </Router>
);

export default App;
