import PropTypes from 'prop-types';
import React from 'react';
import classes from '../css/patientTracking.css';

const Label = ({ children }) => (
  <div className={`${classes.patientTrackingColumn} col-xs-6 col-sm-6 hidden-md hidden-lg `}>
    <b>
      {children}
    </b>
  </div>
);

Label.propTypes = {
  children: PropTypes.node,
};

export default Label;
