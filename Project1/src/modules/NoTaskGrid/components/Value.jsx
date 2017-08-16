import PropTypes from 'prop-types';
import React from 'react';
import classes from '../css/encounter.css';

const getCssClass = (typeOfData) => {
  switch (typeOfData) {
    case 'room':
      return `${classes.roomColumn} col-xs-6 col-sm-6 col-md-1 col-lg-1`;
    case 'patient':
      return `${classes.patientColumn} col-xs-6 col-sm-6 col-md-3 col-lg-3`;
    case 'dob':
      return `${classes.dobColumn} col-xs-6 col-sm-6 col-md-1 col-lg-1`;
    case 'provider':
      return `${classes.providerColumn} col-xs-6 col-sm-6 col-md-3 col-lg-3`;
    case 'date':
      return `${classes.dateColumn} col-xs-6 col-sm-6 col-md-1 col-lg-1`;
    case 'action':
      return `${classes.actionColumn} col-xs-6 col-sm-6 col-md-3 col-lg-3`;
    default:
      return `${classes.dobColumn} col-xs-6 col-sm-6 col-md-2 col-lg-2`;
  }
};

const Value = ({ type, children }) => (
  <div className={getCssClass(type)}>
    {children}
  </div>
);

Value.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node,
};

export default Value;
