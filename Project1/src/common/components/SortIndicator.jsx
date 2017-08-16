import PropTypes from 'prop-types';
import React from 'react';

const getSortStatus = (value) => {
  switch (value) {
    case 'asc':
      return 'sort-asc';
    case 'desc':
      return 'sort-desc';
    default:
      return 'sort';
  }
};

const SortIndicator = ({
  onClick,
  label,
  status,
  disabled = false,
  gridDivisionRatio = '3',
  externalCssClass = '',
}) => (
  <button
    type="button"
    className={`btn btn-link col-xs-${gridDivisionRatio === '2' ? '4' : gridDivisionRatio}
        col-sm-${gridDivisionRatio}
        col-md-${gridDivisionRatio} col-lg-${gridDivisionRatio}
        ${externalCssClass === '' ? 'appointmentHeader' : externalCssClass}`}
    disabled={disabled}
    onClick={onClick}
  >
    <strong>{label} </strong>
    <i className={status === '' ? '' : `fa fa-${getSortStatus(status)}`} aria-hidden="true" />
  </button>
);

SortIndicator.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  gridDivisionRatio: PropTypes.string,
  externalCssClass: PropTypes.string,
};

export default SortIndicator;
