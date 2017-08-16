import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'srs/redux/timeOutAlert/actions';
import classes from '../css/timeOutAlert.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import distanceInWordsStrict from 'date-fns/distance_in_words_strict';
import addSeconds from 'date-fns/add_seconds';

const TimeOutAlertUI = ({
  continueSession,
  signOutFromSession,
  countDownTime,
}) => (
  <div className={classes.modalBackground}>
    <ReactCSSTransitionGroup
      component="div"
      className={classes.container}
      transitionEnterTimeout={325}
      transitionLeaveTimeout={325}
      transitionName={{
        enter: classes.enter,
        enterActive: classes.enterActive,
        leave: classes.leave,
        leaveActive: classes.leaveActive,
      }}
    >
      <div className={`${classes.modal} ${classes.border}`}>
        <div className={`alert-danger ${classes.header}`}>
          <h4>
            <i className="fa fa-exclamation-triangle" aria-hidden="true" /> Session Expiring
          </h4>
        </div>
        <div
          className={classes.body}
          style={{ overflow: 'hidden' }}
        >
          <div className={classes.warningtext}>
            <p>Your session will expire in</p>
            <p>
              <span className={classes.timer}>
                {
                  countDownTime > 0 ?
                    distanceInWordsStrict(
                      addSeconds(Date.now(), countDownTime),
                      Date.now(),
                    ) : null
                }
              </span>
            </p>
            <p>Do you want to stay signed in?</p>
          </div>
        </div>
        <div className="text-center">
          <button
            type="button"
            id="btnContinue"
            className={`btn btn-primary btn-md ${classes.bottombuttons}`}
            onClick={(e) => {
              e.preventDefault();
              continueSession();
            }}
          >
            Yes
          </button>
          <button
            type="button"
            id="btnClose"
            className={`btn btn-danger btn-md ${classes.bottombuttons}`}
            onClick={(e) => {
              e.preventDefault();
              signOutFromSession();
            }}
          >
            No, sign me out
          </button>
        </div>
      </div>
    </ReactCSSTransitionGroup>
  </div>
);

TimeOutAlertUI.propTypes = {
  continueSession: PropTypes.func.isRequired,
  signOutFromSession: PropTypes.func.isRequired,
  countDownTime: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  countDownTime: state.timeOutAlertExtension.countDownTime,
});

const mapDispatchToProps = dispatch => ({
  signOutFromSession: () => {
    dispatch(actions.signOutFromSession());
  },
  continueSession: () => {
    dispatch(actions.continueSession());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TimeOutAlertUI);
