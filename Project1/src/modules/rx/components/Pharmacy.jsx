import PropTypes from 'prop-types';
import React from 'react';
import classes from '../css/rx.css';

const Pharmacy = ({
  showWidget,
  isAuthenticated,
  onFailure,
  id,
  widgetName,
}) => (
  <div
    className={`col-xs-12 col-sm-12 col-md-7 col-lg-7 full-height ${classes.fullHeightOverride}`}
    id={id}
  >
    {isAuthenticated ? showWidget(widgetName, id) : onFailure() }
  </div>
);
Pharmacy.propTypes = {
  onFailure: PropTypes.func,
  isAuthenticated: PropTypes.bool.isRequired,
  showWidget: PropTypes.func,
  id: PropTypes.string,
  widgetName: PropTypes.string,
};

export default Pharmacy;
