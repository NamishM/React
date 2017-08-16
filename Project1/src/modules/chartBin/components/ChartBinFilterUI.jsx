import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../css/chartBinFilter.less';
import 'react-bootstrap-multiselect/less/bootstrap-multiselect.less';
import SearchBox from 'srs/common/components/SearchBox';
import Multiselect from 'react-bootstrap-multiselect';
import '!!style-loader!css-loader!react-datetime/css/react-datetime.css';
import DateTime from 'react-datetime';
import format from 'date-fns/format';
import { getGroupedPatientStatusTypes }
  from 'srs/redux/chartBinFilter/reducers/chartBinFilter';

class ChartBinFilterUI extends Component {
  render() {
    const {
      toggleVisiblity,
      isFilterBoardVisible,
      providers = [],
      locations = [],
      rooms = [],
      patientStatusTypes = [],
      selectedDate,
      buttonText,
      resetToDefault,
      filterAppointments,
      isOnEncounter,
      onDateChange,
      setRoomsVisibility,
      validateDate,
      isValidDate,
      currentPath,
      isFullScreenMode,
    } = this.props;

    return (
      <div className="filter-Panel" style={{ display: isOnEncounter ? 'none' : 'block' }} >
        <div
          data-auto="SearchBox_ChartBinFilterUI"
        >
          <SearchBox
            textValue={buttonText}
            onAdvancedSearchClick={() => toggleVisiblity()}
            isFilterBoardVisible={isFilterBoardVisible}
          />
        </div>
        <div style={{ display: isFilterBoardVisible ? 'block' : 'none' }} >
          <div>
            <h5>Doctors:</h5>
            <Multiselect
              data={providers}
              multiple
              id="selectDoctors"
              buttonWidth="100%"
              buttonClass="form-control btn-default text-left"
              nonSelectedText="No Doctor Selected"
              includeSelectAllOption="true"
              numberDisplayed="false"
              maxHeight="120"
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
            <h5>Locations:</h5>
            <Multiselect
              data={locations}
              multiple
              id="selectLocations"
              buttonWidth="100%"
              buttonClass="form-control btn-default text-left"
              nonSelectedText="No Location Selected"
              includeSelectAllOption="true"
              numberDisplayed="false"
              maxHeight="120"
              nSelectedText="Locations Selected"
              allSelectedText="All Locations Selected"
              delimiterText=";"
              ref={(input) => { this.locationsSelect = input; }}
              buttonText={(options) => {
                if (options.length === 0) {
                  return 'No Location Selected';
                } else if (options.length === 1) {
                  return options[0].label;
                }
                return 'Multiple Locations';
              }}
              onSelectAll={() => {
                setRoomsVisibility(this.locationsSelect.selectRef.children);
              }}
              onDeselectAll={() => {
                setRoomsVisibility(this.locationsSelect.selectRef.children);
              }}
              onChange={() => {
                setRoomsVisibility(this.locationsSelect.selectRef.children);
              }}
            />
            <h5>Rooms:</h5>
            <Multiselect
              data={rooms.filter(r => r.visible)}
              multiple
              id="selectRooms"
              buttonWidth="100%"
              buttonClass="form-control btn-default text-left"
              nonSelectedText="No Rooms Selected"
              includeSelectAllOption="true"
              numberDisplayed="false"
              maxHeight="120"
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
            <h5>Patient Status:</h5>
            <Multiselect
              data={getGroupedPatientStatusTypes(patientStatusTypes)}
              multiple
              id="selectStatus"
              buttonWidth="100%"
              buttonClass="form-control btn-default text-left"
              nonSelectedText="No Status Selected"
              includeSelectAllOption="true"
              numberDisplayed="false"
              maxHeight="120"
              nSelectedText="Patient Status Selected"
              allSelectedText="All Patient Status Selected"
              delimiterText=";"
              ref={(input) => { this.patientStatusTypesSelect = input; }}
              buttonText={(options) => {
                if (options.length === 0) {
                  return 'No Status Selected';
                } else if (options.length === 1) {
                  return options[0].label;
                }
                return 'Multiple Patient Status';
              }}
            />
            <h5>Encounter Date:</h5>
            <DateTime
              className={isValidDate ? '' : 'has-error'}
              id="filterDate"
              dateFormat="MM/DD/YYYY"
              defaultValue={format(new Date(), 'MM/DD/YYYY')}
              value={format(selectedDate, 'MM/DD/YYYY')}
              timeFormat={false}
              utc
              closeOnSelect
              closeOnTab
              onChange={(value) => {
                let validatedDate = false;
                if (value && value.isValid && value.isValid()) {
                  onDateChange(value.format('YYYY-MM-DD'));
                  validatedDate = true;
                }
                validateDate(validatedDate);
              }}
            />
          </div>
          <div className="row button-container">
            <div className="col-md-12 text-right">
              <button
                type="button"
                id="btnFilter"
                className="btn btn-primary btn-md"
                disabled={!isValidDate}
                onClick={() =>
                  filterAppointments({
                    selectedProviders: this.providersSelect.selectRef.children,
                    selectedLocations: this.locationsSelect.selectRef.children,
                    selectedRooms: this.roomsSelect.selectRef.children,
                    selectedPatientStatusTypes:
                      this.patientStatusTypesSelect.selectRef.children,
                    selectedDate,
                    currentPath,
                    isFullScreenMode,
                  })
                }
              >
                Filter
              </button>
              <button
                type="button"
                id="btnReset"
                className="btn btn-primary btn-md"
                onClick={() => {
                  resetToDefault({ currentPath, isFullScreenMode });
                }}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ChartBinFilterUI.propTypes = {
  currentPath: PropTypes.string.isRequired,
  isFullScreenMode: PropTypes.bool.isRequired,
  toggleVisiblity: PropTypes.func.isRequired,
  resetToDefault: PropTypes.func.isRequired,
  filterAppointments: PropTypes.func.isRequired,
  onDateChange: PropTypes.func.isRequired,
  setRoomsVisibility: PropTypes.func.isRequired,
  isFilterBoardVisible: PropTypes.bool.isRequired,
  buttonText: PropTypes.string.isRequired,
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
    selected: PropTypes.bool.isRequired,
  }).isRequired),
  patientStatusTypes: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
  }).isRequired),
  selectedDate: PropTypes.string,
  isOnEncounter: PropTypes.bool.isRequired,
  validateDate: PropTypes.func.isRequired,
  isValidDate: PropTypes.bool.isRequired,
};

export default ChartBinFilterUI;
