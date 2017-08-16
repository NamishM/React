import React from 'react';
import { connect } from 'react-redux';
import DocumentHeader from '../components/DocumentHeader';
import DocumentArea from './DocumentArea';
import classes from '../css/app.css';

const App = () => (
  <div className={classes.container}>
    <DocumentHeader />
    <DocumentArea />
  </div>
);

export default connect()(App);
