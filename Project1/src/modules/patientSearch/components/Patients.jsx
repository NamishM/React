import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Patient from './Patient';
import SortIndicator from '../../../common/components/SortIndicator';
import '../css/patientSearch.less';
import classes from '../../chartBin/css/appointments.css';
import Infinite from 'react-infinite';

class Patients extends Component {
  constructor(props) {
    super(props);
    this.state = { scrollHeight: 200 };
    this.handleResize = () => {
      const offsetHeight = this.container.parentElement.parentElement.offsetHeight || 200;
      if (
        this.state.scrollHeight !== offsetHeight &&
        this.container.parentElement.parentElement.offsetHeight !== 0
      ) {
        this.setState({ scrollHeight: offsetHeight });
      }
    };
  }
  componentDidMount() {
    // TODO: stop gap. Infinite does not work well with responsive heights.
    // Is this the best way to handle this?
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }
  componentWillReceiveProps() {
    this.handleResize();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
  render() {
    const {
      patients,
      onRowClick,
      isInfiniteLoading = false,
      islastPageArrived = false,
      handleInfiniteLoad,
      sortColumn,
      sortColumns,
      hasAdvanceSearch = false,
      previousPath,
      selectedTabId,
    } = this.props;

    return (
      <div ref={(c) => { this.container = c; }} className={classes.container}>
        <div className={classes.sortArea}>
          {
            sortColumns.map(column => (
              column.label !== '' && column.name !== '' ?
                <SortIndicator
                  key={column.id}
                  onClick={() => sortColumn(column.id)}
                  label={column.label}
                  status={column.state}
                  disabled={patients === undefined || patients.length === 0 ? true : !column.name}
                /> :
                null
            ))
          }
        </div>
        <Infinite
          elementHeight={80}
          containerHeight={hasAdvanceSearch
            ? this.state.scrollHeight - 155 : this.state.scrollHeight}
          className={classes.infiniteScroller}
          infiniteLoadBeginEdgeOffset={200}
          onInfiniteLoad={() => handleInfiniteLoad(islastPageArrived)}
          loadingSpinnerDelegate={
            <div className={`${!isInfiniteLoading ? 'hideLoading' : null} infinite-list-item`}>
              Loading...
            </div>
          }
          isInfiniteLoading={isInfiniteLoading}
        >
          {
            patients === undefined || patients.length === 0 ?
              <div /> :
              patients.map(patient => (
                <Patient
                  key={patient.id}
                  {...patient}
                  onRowClick={
                    () => onRowClick(patient.id, previousPath, selectedTabId)}
                />),
              )
          }
        </Infinite>
      </div>
    );
  }
}

Patients.propTypes = {
  patients: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    dob: PropTypes.string,
    isSelected: PropTypes.bool.isRequired,
  }).isRequired),
  onRowClick: PropTypes.func.isRequired,
  isInfiniteLoading: PropTypes.bool,
  handleInfiniteLoad: PropTypes.func.isRequired,
  hasAdvanceSearch: PropTypes.bool,
  islastPageArrived: PropTypes.bool,
  sortColumn: PropTypes.func.isRequired,
  sortColumns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
  }).isRequired),
  previousPath: PropTypes.string,
  selectedTabId: PropTypes.string,
};

export default Patients;
