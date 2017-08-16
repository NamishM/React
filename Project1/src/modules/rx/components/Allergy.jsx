import PropTypes from 'prop-types';
import React from 'react';
import classes from '../css/rx.css';

const Allergy = ({
  showWidget,
  addAllergySubscriber,
  isAuthenticated,
  onFailure,
  id,
  widgetName,
  patientId,
}) => {
  if (isAuthenticated) {
    showWidget(widgetName, id);
    addAllergySubscriber(widgetName, patientId);
  } else {
    onFailure();
  }
  return (
    <div
      className={`col-xs-12 col-sm-12 col-md-12 col-lg-12  full-height ${classes.fullHeightOverride}`}
      id={id}
    />
  );
};

Allergy.propTypes = {
  onFailure: PropTypes.func,
  isAuthenticated: PropTypes.bool.isRequired,
  showWidget: PropTypes.func,
  addAllergySubscriber: PropTypes.func,
  id: PropTypes.string,
  widgetName: PropTypes.string,
  patientId: PropTypes.number.isRequired,
};

export default Allergy;
