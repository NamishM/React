import PropTypes from 'prop-types';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classes from '../css/taskEditorPopup.css';
import TaskingEditor from '../containers/App';

const TaskEditorPopup = ({
  isExpanded,
  isVisible,
  resetToDefault,
}) => (
  <div>
    <ReactCSSTransitionGroup
      transitionEnterTimeout={325}
      transitionLeaveTimeout={325}
      transitionName={{
        enter: classes.enter,
        enterActive: classes.enterActive,
        leave: classes.leave,
        leaveActive: classes.leaveActive,
      }}
    >
      { isVisible ?
        <div
          className={`${classes.modal} ${classes.border}`}
          style={{ height: isExpanded ? '100%' : '150px' }}
        >
          <div className={`srs-header-primary ${classes.header} ${classes.border}`}>
            <div />
            <h4
              style={{
                color: '#fff',
              }}
            >
              Patient Tasks
            </h4>
            <button
              type="button"
              id="btnClose"
              className="btn btn-default"
              onClick={resetToDefault}
            >
              <i className="fa fa-times-circle" aria-hidden="true" />
            </button>
          </div>
          <div
            className={`${classes.body} ${classes.border}`}
            style={{ overflow: isExpanded ? 'auto' : 'hidden' }}
          >
            <TaskingEditor />
          </div>
        </div>
        : null}
    </ReactCSSTransitionGroup>
  </div>
);

TaskEditorPopup.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  resetToDefault: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool.isRequired,
};

export default TaskEditorPopup;

