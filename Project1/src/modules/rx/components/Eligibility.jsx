import PropTypes from 'prop-types';
import React from 'react';
import classes from '../css/rx.css';

const Eligibility = ({
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

Eligibility.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  id: PropTypes.string,
  widgetName: PropTypes.string,
  onFailure: PropTypes.func,
  showWidget: PropTypes.func,
};

export default Eligibility;
