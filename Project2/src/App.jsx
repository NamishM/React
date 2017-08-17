import React from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import './App.css';
import NavBar from 'components/NavBar';
import MainView from 'components/MainView';

const App = () => (
  <Router basename="/">
    <div>
      <NavBar />
      <div className="results">
        <MainView />
      </div>
    </div>
  </Router>
);

export default App;
