import PropTypes from 'prop-types';
import React from 'react';
import classes from '../css/rx.css';

const PrescriptionMgt = ({
  showWidget,
  isAuthenticated,
  onFailure,
  id,
  widgetName,
}) => (
  <div
    className={`col-xs-12 col-sm-12 col-md-12 col-lg-12 full-height ${classes.fullHeightOverride}`}
    id={id}
  >
    {isAuthenticated ? showWidget(widgetName, id) : onFailure(widgetName, id) }
  </div>
);

PrescriptionMgt.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  widgetName: PropTypes.string.isRequired,
  showWidget: PropTypes.func,
  onFailure: PropTypes.func,
};

export default PrescriptionMgt;
