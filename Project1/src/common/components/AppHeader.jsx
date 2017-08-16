import PropTypes from 'prop-types';
import React from 'react';
import classes from '../css/appHeader.css';

const AppHeader = ({ appName }) => (
  <div className={classes.header}>
    <h1>{appName}</h1>
  </div>
);

AppHeader.propTypes = {
  appName: PropTypes.string.isRequired,
};

export default AppHeader;
