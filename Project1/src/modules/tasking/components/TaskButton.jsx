import PropTypes from 'prop-types';
import React from 'react';
import classes from '../css/TaskButton.css';

const TaskButton = ({
  label = '',
  onClick = () => {},
  className = null,
  disabled = false,
  unAuthorizeText = '',
}) => (
  <button
    disabled={disabled}
    type="button"
    className={`btn btn-xs btn-default ${className === null ? classes.taskButton : className}`}
    onClick={onClick}
    title={unAuthorizeText || label}
  >
    {label}
  </button>
);

TaskButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  unAuthorizeText: PropTypes.string,
};

export default TaskButton;
