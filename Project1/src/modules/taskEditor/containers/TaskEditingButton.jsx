import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'srs/redux/taskingForm/actions';
// TODO: Reaching across components defeats the purpose of css modules.
// Components should own their own styles.
import classes from '../../wireframe/css/headerAlt.css';

const TaskEditingButton = ({ toggleVisiblity }) => (
  <button
    id="btnTaskEditing"
    title="Task Editing"
    className={`${classes.headerButton} btn btn-primary`}
    onClick={(e) => {
      e.preventDefault();
      toggleVisiblity(true);
    }}
  >
    T
  </button>
);

TaskEditingButton.propTypes = {
  toggleVisiblity: PropTypes.func.isRequired,
};

export default connect(null, {
  toggleVisiblity: actions.toggleVisiblity,
})(TaskEditingButton);
