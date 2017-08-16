import PropTypes from 'prop-types';
import React from 'react';
import classes from '../../logout/css/logout.css';

const ErrorUI = ({ errorMessage }) => (
  <div className={`${classes.background} full-height`}>
    <div className={classes.message}>
      <h2>Unexpected Error</h2>
      {errorMessage ? <h4>{errorMessage}</h4> : null }
      <ul>
        <li><p>Try what you were doing again.</p>
          <p>This may be a one-time/intermittent error.
            Leaving this page & returning may also help.</p></li>
        <li><p>Make sure you still have a network connection.</p>
          <p>Open a browser and try to access Google or any other website.</p></li>
        <li><p>Clear your browser history.</p></li>
        <li><p>Notify your practice/network administrator.</p>
          <p>They may be aware of the issue and/or the solution to the problem.</p></li>
        <li><p>If all else fails, please contact SRSsoft support.</p>
          <p>By email <a href="mailto:support@srssoft.com" target="_top">support@srssoft.com</a></p></li>
      </ul>
    </div>
  </div>
);

ErrorUI.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};


export default ErrorUI;
