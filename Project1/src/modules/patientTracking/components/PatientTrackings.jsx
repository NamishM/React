import PropTypes from 'prop-types';
import React, { Component } from 'react';
import PatientTracking from './PatientTracking';
import SortIndicator from '../../../common/components/SortIndicator';
import classes from '../css/patientTrackings.css';
import Infinite from 'react-infinite';

class PatientTrackings extends Component {
  constructor(props) {
    super(props);
    this.state = { scrollHeight: 200 };
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
      patientTrackings,
      isInfiniteLoading = false,
      sortColumns,
      onInfiniteLoad,
      onSortChanged,
      elementHeight,
    } = this.props;

    return (
      <div ref={(c) => { this.container = c; }} className={classes.container}>
        <div className={classes.sortArea}>
          {
            // NOTE on: disabled={!!!sortColumns[column].name}
            // !! is a shortcut to convert to a boolean
            // empty string is falsy so !!'' === false
            // the third ! inverts the value
            sortColumns.map(column => (
              column.label !== '' && column.name !== '' ?
                <SortIndicator
                  key={column.id}
                  onClick={() => onSortChanged(column.id)}
                  label={column.label}
                  status={column.state}
                  disabled={!column.name}
                  gridDivisionRatio="2"
                /> :
                null
            ))
          }
        </div>
        <Infinite
          elementHeight={elementHeight}
          containerHeight={this.state.scrollHeight}
          className={classes.infiniteScroller}
          infiniteLoadBeginEdgeOffset={200}
          onInfiniteLoad={onInfiniteLoad}
          loadingSpinnerDelegate={
            <div className="infinite-list-item">
              Loading...
            </div>
          }
          isInfiniteLoading={isInfiniteLoading}
        >
          {
            !patientTrackings ?
              <div />
              :
              patientTrackings.map((patientTracking, index) => (
                <PatientTracking
                  key={patientTracking.appointmentId}
                  {...patientTracking}
                  index={index}
                />),
              )
          }
        </Infinite>
      </div>
    );
  }
}

PatientTrackings.propTypes = {
  patientTrackings: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    doctorname: PropTypes.string.isRequired,
    encounterDate: PropTypes.string.isRequired,
    roomDescription: PropTypes.string,
    status: PropTypes.string,
    duration: PropTypes.string,
    color: PropTypes.string,
  }).isRequired),
  isInfiniteLoading: PropTypes.bool,
  onInfiniteLoad: PropTypes.func.isRequired,
  onSortChanged: PropTypes.func.isRequired,
  sortColumns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
  }).isRequired),
  elementHeight: PropTypes.number.isRequired,
};

export default PatientTrackings;
