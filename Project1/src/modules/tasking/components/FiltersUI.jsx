import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../css/Tasking.less';
import classes from '../css/Tasking.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Multiselect from 'react-bootstrap-multiselect';
import { findObjectsInIdString } from '../../../utilities';
import Link from 'react-router/lib/Link';

const getProviderFromEHR = (providers) => {
  const chartBinFilter = JSON.parse(global.sessionStorage.getItem('chartBinFilter'));
  return chartBinFilter ? findObjectsInIdString({
    idString: chartBinFilter.providerId,
    items: providers,
    property: 'value',
    onFind: item => ({ ...item }),
  }) : providers;
};

class FiltersUI extends Component {
  constructor(props) {
    super(props);
    this.patientStatusTypesSelect = null;
    this.providersSelect = null;
    this.roomsSelect = null;
  }

  render() {
    const {
      toggleVisiblity,
      isFilterBoardVisible,
      providers = [],
      locations = [],
      rooms = [],
      patientStatusTypes = [],
      selectedDate,
      resetToDefault,
      filterAppointments,
      currentPath,
      isFullScreenMode = false,
    } = this.props;

    return (
      <div style={{ height: '100%' }}>
        <Link
          type="button"
          id="btnHamburger"
          className="btn btn-primary"
          title="Filters"
          onClick={toggleVisiblity}
        >
          <i
            className={isFilterBoardVisible ? 'fa fa-times-circle' : 'fa fa-filter'}
            aria-hidden="true"
          />
        </Link>
        <ReactCSSTransitionGroup
          transitionEnterTimeout={500}
          transitionLeaveTimeout={325}
          transitionName={{
            enter: classes.enter,
            enterActive: classes.enterActive,
            leave: classes.leave,
            leaveActive: classes.leaveActive,
          }}
        >
          {
            isFilterBoardVisible ?
              <div className="filtersContainer">
                <div>
                  <h5>Doctors:</h5>
                  <Multiselect
                    data={getProviderFromEHR(providers)}
                    multiple
                    id="selectDoctors"
                    buttonWidth="100%"
                    buttonClass="form-control btn-default text-left"
                    nonSelectedText="No Doctor Selected"
                    includeSelectAllOption="true"
                    numberDisplayed="false"
                    maxHeight="200"
                    nSelectedText="Doctors Selected"
                    allSelectedText="All Doctors Selected"
                    delimiterText=";"
                    ref={(input) => { this.providersSelect = input; }}
                    buttonText={(options) => {
                      if (options.length === 0) {
                        return 'No Doctor Selected';
                      } else if (options.length === 1) {
                        return options[0].label;
                      }
                      return 'Multiple Doctors';
                    }}
                  />
                  <h5 className="groupsHeading">Tasking Groups:</h5>
                  <Multiselect
                    data={patientStatusTypes.filter(ps => ps.statusType === 4)}
                    multiple
                    id="selectTaskingGroup"
                    buttonWidth="100%"
                    buttonClass="form-control btn-default text-left"
                    nonSelectedText="No Group Selected"
                    includeSelectAllOption="true"
                    numberDisplayed="false"
                    maxHeight="200"
                    nSelectedText="Tasking Group Selected"
                    allSelectedText="All Tasking Groups Selected"
                    delimiterText=";"
                    ref={(input) => { this.patientStatusTypesSelect = input; }}
                    buttonText={(options) => {
                      if (options.length === 0) {
                        return 'No Group Selected';
                      } else if (options.length === 1) {
                        return options[0].label;
                      }
                      return 'Multiple Tasking Groups';
                    }}
                  />
                  <h5 className="roomsHeading">Rooms:</h5>
                  <Multiselect
                    data={rooms.filter(r => r.visible)}
                    multiple
                    id="selectRooms"
                    buttonWidth="100%"
                    buttonClass="form-control btn-default text-left"
                    nonSelectedText="No Room Selected"
                    includeSelectAllOption="true"
                    numberDisplayed="false"
                    maxHeight="200"
                    nSelectedText="Rooms Selected"
                    allSelectedText="All Rooms Selected"
                    delimiterText=";"
                    ref={(input) => { this.roomsSelect = input; }}
                    buttonText={(options) => {
                      if (options.length === 0) {
                        return 'No Room Selected';
                      } else if (options.length === 1) {
                        return options[0].label;
                      }
                      return 'Multiple Rooms';
                    }}
                  />
                </div>
                <div className="button-container">
                  <div className="text-left">
                    <button
                      type="button"
                      id="btnFilter"
                      className="btn btn-primary btn-md"
                      onClick={() => {
                        filterAppointments({
                          selectedProviders: this.providersSelect.selectRef.children,
                          selectedLocations: locations,
                          selectedRooms: this.roomsSelect.selectRef.children,
                          selectedPatientStatusTypes:
                            this.patientStatusTypesSelect.selectRef.children,
                          selectedDate,
                          currentPath,
                          isFullScreenMode,
                        });
                        toggleVisiblity();
                      }}
                    >
                      Filter
                    </button>
                    <button
                      type="button"
                      id="btnReset"
                      className="btn btn-primary btn-md"
                      onClick={() => {
                        resetToDefault({ currentPath, isFullScreenMode });
                        toggleVisiblity();
                      }}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div> : null
          }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

FiltersUI.propTypes = {
  currentPath: PropTypes.string.isRequired,
  isFullScreenMode: PropTypes.bool.isRequired,
  toggleVisiblity: PropTypes.func.isRequired,
  resetToDefault: PropTypes.func.isRequired,
  filterAppointments: PropTypes.func.isRequired,
  isFilterBoardVisible: PropTypes.bool.isRequired,
  providers: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
  }).isRequired),
  locations: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
  }).isRequired),
  rooms: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    locationId: PropTypes.number.isRequired,
    visible: PropTypes.bool,
  }).isRequired),
  patientStatusTypes: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
  }).isRequired),
  selectedDate: PropTypes.string,
};

export default FiltersUI;
