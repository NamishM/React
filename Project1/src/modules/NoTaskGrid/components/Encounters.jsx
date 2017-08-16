import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Encounter from './Encounter';
import classes from '../css/encounters.css';
import Infinite from 'react-infinite';

class Encounters extends Component {
  constructor(props) {
    super(props);
    this.state = { scrollHeight: 500 };
    this.handleResize = () => {
      if (
        this.state.scrollHeight !== this.container.offsetHeight &&
        this.container.offsetHeight !== 0
      ) {
        this.setState({ scrollHeight: this.container.offsetHeight || 200 });
      }
    };
  }
  componentDidMount() {
    // TODO: stop gap. Infinite does not work well with responsive heights.
    // Is this the best way to handle this?
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }
  componentDidUpdate() {
    this.handleResize();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
  render() {
    const {
      encounters,
      isInfiniteLoading = false,
      onInfiniteLoad,
      elementHeight,
      onClickCheckOutButton,
      screenLayout,
      isNoTaskGridVisible,
    } = this.props;
    return (
      <div ref={(c) => { this.container = c; }} className={classes.container}>
        <div className={classes.heading}>
          <div
            data-auto="room"
            className={`${classes.roomHeaderColumn} col-xs-4 col-sm-1 col-md-1 col-lg-1 appointmentHeader`}
          >
            <strong>Room</strong>
          </div>
          <div
            data-auto="patient-name"
            className={`${classes.patientHeaderColumn} col-xs-4 col-sm-3 col-md-3 col-lg-3 appointmentHeader`}
          >
            <strong>Patient Name</strong>
          </div>
          <div
            data-auto="patient-dob"
            className={`${classes.dobHeaderColumn} col-xs-4 col-sm-1 col-md-1 col-lg-1 appointmentHeader`}
          >
            <strong>Patient DOB</strong>
          </div>
          <div
            data-auto="provider"
            className={`${classes.providerHeaderColumn} col-xs-4 col-sm-3 col-md-3 col-lg-3 appointmentHeader`}
          >
            <strong>Encounter Provider</strong>
          </div>
          <div
            data-auto="time"
            className={`${classes.dateHeaderColumn} col-xs-4 col-sm-1 col-md-1 col-lg-1 appointmentHeader`}
          >
            <strong>Check-In Time</strong>
          </div>
          <div
            data-auto="action"
            className={`${classes.actionHeaderColumn} col-xs-4 col-sm-3 col-md-3 col-lg-3 appointmentHeader`}
          >
            <strong>Actions</strong>
          </div>
        </div>
        <Infinite
          elementHeight={elementHeight}
          containerHeight={this.state.scrollHeight - 40}
          className={classes.infiniteScroller}
          infiniteLoadBeginEdgeOffset={200}
          onInfiniteLoad={onInfiniteLoad}
          loadingSpinnerDelegate={
            <div className={`${!isInfiniteLoading ? 'hideLoading' : null} infinite-list-item`}>
              Loading...
            </div>
          }
          isInfiniteLoading={isInfiniteLoading}
        >
          {
            !encounters || encounters.length === 0 ?
              <div className="text-center">
                      No data exist
              </div>
              :
              encounters.map((patientTracking, index) => (
                <Encounter
                  key={patientTracking.id}
                  {...patientTracking}
                  index={index}
                  onClickCheckOutButton={onClickCheckOutButton}
                  isNoTaskGridVisible={isNoTaskGridVisible}
                  screenLayout={screenLayout}
                />
              ),
              )
          }
        </Infinite>
      </div>
    );
  }
}

Encounters.propTypes = {
  encounters: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    doctorname: PropTypes.string.isRequired,
    encounterDate: PropTypes.string.isRequired,
    roomDescription: PropTypes.string,
    status: PropTypes.string,
    duration: PropTypes.string,
    color: PropTypes.string,
    dob: PropTypes.string,
    isTaskAvailable: PropTypes.bool,
    locationId: PropTypes.number,
    currentRoomId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }).isRequired),
  isInfiniteLoading: PropTypes.bool,
  onInfiniteLoad: PropTypes.func.isRequired,
  elementHeight: PropTypes.number.isRequired,
  onClickCheckOutButton: PropTypes.func.isRequired,
  isNoTaskGridVisible: PropTypes.bool,
  screenLayout: PropTypes.string,
};

export default Encounters;
