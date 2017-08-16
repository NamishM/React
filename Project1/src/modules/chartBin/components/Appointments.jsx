import PropTypes from 'prop-types';
import React from 'react';
import ChartBinFilter from '../containers/ChartBinFilter';
import generateFilterList from '../../filterList/components/generateFilterList';
import Appointment from './Appointment';

const FilterList = generateFilterList(ChartBinFilter);

const Appointments = ({
  appointments,
  onRowClick,
  previousPath,
  selectedTabId,
  sortColumns,
  isInfiniteLoading,
  onInfiniteLoad,
  onSortChanged,
  isFilterBoardVisible,
}) => (
  <FilterList
    sortColumns={sortColumns}
    onSortChanged={onSortChanged}
    isInfiniteLoading={isInfiniteLoading}
    onInfiniteLoad={onInfiniteLoad}
    isFilterBoardVisible={isFilterBoardVisible}
    filterBoardPanelHeight={400}
  >
    {
      !appointments || appointments.length === 0 ?
        <div className="text-center">
            No appointment exist
        </div>
        :
        appointments.map(appointment => (
          <Appointment
            key={appointment.id}
            onRowClick={() => onRowClick(appointment.personId,
              appointment.id, previousPath, selectedTabId)}
            {...appointment}
          />),
        )
    }
  </FilterList>
);

Appointments.propTypes = {
  appointments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    visitType: PropTypes.string.isRequired,
    dob: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
  }).isRequired),
  isInfiniteLoading: PropTypes.bool,
  isFilterBoardVisible: PropTypes.bool.isRequired,
  onRowClick: PropTypes.func.isRequired,
  onInfiniteLoad: PropTypes.func.isRequired,
  onSortChanged: PropTypes.func.isRequired,
  sortColumns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
  }).isRequired),
  previousPath: PropTypes.string,
  selectedTabId: PropTypes.string,
};


export default Appointments;
