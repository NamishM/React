import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'srs/redux/patientAlert/actions';
// TODO: Reaching across components defeats the purpose of css modules.
// Components should own their own styles.
import classes from '../../wireframe/css/headerAlt.css';
import alertClasses from '../css/alertButton.css';

const AlertButton = ({ toggleVisiblity, isPrivate, isAlertExist }) => (
  <button
    id="btnAlert"
    disabled={!isAlertExist}
    className={`${classes.headerButton} btn btn-primary`}
    onClick={(e) => {
      e.preventDefault();
      toggleVisiblity(true);
    }}
  >
    <i
      className={`${classes.alertButton} fa fa-warning
      ${(isAlertExist && isPrivate) ? alertClasses.blink : ''}`}
      style={{ color: (isAlertExist && !isPrivate) ? 'yellow' : '' }}
    />
  </button>
);

AlertButton.propTypes = {
  toggleVisiblity: PropTypes.func.isRequired,
  isPrivate: PropTypes.bool.isRequired,
  isAlertExist: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isPrivate: state.patientAlertExtension.isPrivate,
  isAlertExist: state.patientAlertExtension.isAlertExist,
});

const mapDispatchToProps = dispatch => ({
  toggleVisiblity: (isVisible) => {
    dispatch(actions.toggleVisiblity(isVisible));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AlertButton);
