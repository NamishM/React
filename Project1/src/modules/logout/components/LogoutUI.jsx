import React from 'react';
import classes from '../css/logout.css';

const LogoutUI = () => (
  <div className={`${classes.background} full-height`}>
    <div className={classes.message}>
      <h2>You have been logged out</h2>
    If you want to login, please go to login page.
    </div>
  </div>
);

export default LogoutUI;
