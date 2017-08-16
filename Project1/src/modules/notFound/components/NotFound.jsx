import React from 'react';
import 'srs/modules/login/css/login.less';
import classes from '../css/notFound.css';

const NotFound = () => (
  <div className="login-background full-height">
    <div className={classes.message}>
      <h2>Not Found</h2>
      {"We can't seem to find what you were looking for."}
    </div>
  </div>
);

export default NotFound;
