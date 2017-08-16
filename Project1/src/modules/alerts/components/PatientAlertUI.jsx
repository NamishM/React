import PropTypes from 'prop-types';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classes from '../css/patientAlert.css';

const PatientAlertUI = ({
  isPrivate = false,
  personId,
  isAlertExist,
  isVisible,
  isReadOnly,
  changeAlertDetails,
  patientAlertSaveUpdate,
  patientAlertDelete,
  toggleEditMode,
  resetToDefault,
  resizeModal,
  isExpanded,
  isTaskingAlert = false,
  alertDetails = {},
  isFullScreenMode = false,
}) => {
  let alertField;
  let privacyField;
  return personId ? (
    <div>
      { isAlertExist && isVisible ?
        <div
          className={classes.modalBackground}
          style={{ margin: isFullScreenMode ? '0px' : '0 -15px' }}
          onClick={() => {
            changeAlertDetails(alertDetails.alertMessage, isPrivate);
            resetToDefault();
          }}
        />
        : null}
      <ReactCSSTransitionGroup
        transitionEnterTimeout={325}
        transitionAppearTimeout={325}
        transitionLeaveTimeout={325}
        transitionAppear
        transitionName={{
          enter: classes.enter,
          enterActive: classes.enterActive,
          appear: classes.appear,
          appearActive: classes.appearActive,
          leave: classes.leave,
          leaveActive: classes.leaveActive,
        }}
      >
        { isAlertExist && isVisible ?
          <div
            data-auto="alertPopUp"
            className={`${classes.modal} ${classes.border}`}
            style={{ height: isExpanded ? '100%' : '150px',
              margin: isFullScreenMode ? '0px' : '0 -15px',
            }}
          >
            <div
              data-auto="alertHeader"
              className={`alert-${alertDetails.iconStatus || 'warning'} ${classes.header} ${classes.border}`}
            >
              <div>
                { isTaskingAlert ?
                  null :
                  <button
                    type="button"
                    className={`btn btn-${alertDetails.iconStatus || 'warning'}`}
                    disabled
                    onClick={() => toggleEditMode(!isReadOnly)}
                    onChange={(e) => {
                      e.preventDefault();
                      changeAlertDetails(alertField.value, !isPrivate);
                    }}
                  >
                    <i className={`fa fa-eye${isPrivate ? '-slash' : ''}`} aria-hidden="true" />
                    <span className="hidden-xs"> {isPrivate ? 'Private' : 'Public'}</span>
                  </button>
                }
              </div>
              <h4>
                <i className={`fa ${alertDetails.icon || 'fa-exclamation-triangle'}`} aria-hidden="true" /> {alertDetails.titleText}
              </h4>
              <div className={classes.rightCornerButtons}>
                { isTaskingAlert ?
                  null :
                  <div className="btn group">
                    <button
                      type="button"
                      id="btnEdit"
                      className={`btn btn-${alertDetails.iconStatus || 'warning'}`}
                      disabled
                      onClick={() => toggleEditMode(!isReadOnly)}
                    >
                      <i className="fa fa-pencil-square-o" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      className={`btn btn-${alertDetails.iconStatus || 'warning'}`}
                      style={{ display: isReadOnly ? 'none' : 'block' }}
                      onClick={(e) => {
                        e.preventDefault();
                        patientAlertSaveUpdate(alertField.value, privacyField.value, personId);
                        toggleEditMode(!isReadOnly);
                      }}
                    >
                      <i className="fa fa-floppy-o" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      className={`btn btn-${alertDetails.iconStatus || 'warning'}`}
                      style={{ display: isReadOnly ? 'none' : 'block' }}
                      onClick={(e) => {
                        e.preventDefault();
                        patientAlertDelete(personId);
                        toggleEditMode(!isReadOnly);
                      }}
                    >
                      <i className="fa fa-trash" aria-hidden="true" />
                    </button>
                  </div>
                }
                <button
                  type="button"
                  id="btnClose"
                  data-auto="alert-btnClose"
                  className={`btn btn-${alertDetails.iconStatus || 'warning'}`}
                  onClick={() => {
                    // changeAlertDetails(alertDetails.alertMessage, isPrivate);
                    resetToDefault();
                  }}
                >
                  <i className="fa fa-times-circle" aria-hidden="true" />
                </button>
              </div>
            </div>
            <div
              data-auto="alert-message"
              className={`alert-${alertDetails.iconStatus || 'warning'} ${classes.body} ${classes.border}`}
              style={{ overflow: isExpanded ? 'auto' : 'hidden' }}
            >
              {
                alertDetails.alertMessage.split(/\\r\\n|\\r|\\n/).map(item => (
                  <span>
                    {item}
                    <br />
                  </span>
                ))
              }
            </div>
            <button
              type="button"
              data-auto="alert-btnResize"
              className={`btn-${alertDetails.iconStatus || 'warning'} ${classes.expandButton}`}
              onClick={() => resizeModal()}
            >
              <i
                className={`fa fa-angle-double-${isExpanded ? 'up' : 'down'} fa-2x`}
                aria-hidden="true"
              />
            </button>
          </div>
          : null}
      </ReactCSSTransitionGroup>
    </div>
  ) : null;
};

PatientAlertUI.propTypes = {
  isPrivate: PropTypes.bool,
  isAlertExist: PropTypes.bool,
  changeAlertDetails: PropTypes.func.isRequired,
  patientAlertSaveUpdate: PropTypes.func,
  patientAlertDelete: PropTypes.func,
  personId: PropTypes.number,
  isVisible: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  resetToDefault: PropTypes.func.isRequired,
  toggleEditMode: PropTypes.func,
  resizeModal: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool,
  isTaskingAlert: PropTypes.bool,
  alertDetails: PropTypes.oneOfType([PropTypes.object]),
  isFullScreenMode: PropTypes.bool,
};

export default PatientAlertUI;

