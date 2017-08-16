import PropTypes from 'prop-types';
import React from 'react';

const Medication = ({
  showWidget,
  isAuthenticated,
  onFailure,
  id,
  widgetName,
}) => (
  <div
    id={id}
  >
    {isAuthenticated ? showWidget(widgetName, id) : onFailure() }
  </div>
);

Medication.propTypes = {
  onFailure: PropTypes.func,
  isAuthenticated: PropTypes.bool.isRequired,
  showWidget: PropTypes.func,
  id: PropTypes.string,
  widgetName: PropTypes.string,
};

export default Medication;
