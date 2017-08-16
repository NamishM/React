import PropTypes from 'prop-types';
import React from 'react';
import classes from '../css/ExpandButton.css';

const ExpandButton = ({
  expanded,
  disabled,
  onClick,
}) => (
  <button
    type="button"
    disabled={disabled}
    className={`btn btn-default ${classes.expandButton}`}
    onClick={onClick}
  >
    <i
      className={`${expanded ? 'fa fa-minus' : 'fa fa-plus'} ${classes.icon}`}
      aria-hidden="true"
    />
  </button>
);

ExpandButton.propTypes = {
  expanded: PropTypes.bool,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ExpandButton;
