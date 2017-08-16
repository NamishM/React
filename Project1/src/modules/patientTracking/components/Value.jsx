import PropTypes from 'prop-types';
import React from 'react';
import classes from '../css/patientTracking.css';

const Value = ({ children }) => (
  <div className={`${classes.patientTrackingColumn} col-xs-6 col-sm-6 col-md-2 col-lg-2`}>
    {children}
  </div>
);

Value.propTypes = {
  children: PropTypes.node,
};

export default Value;
