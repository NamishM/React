import PropTypes from 'prop-types';
import React from 'react';
import generateFilterList from '../../filterList/components/generateFilterList';
import Encounter from './Encounter';

const FilterList = generateFilterList();

const Encounters = ({
  personId,
  appointments,
  onRowClick,
  previousPath,
  selectedTabId,
  sortColumns,
  isInfiniteLoading,
  onInfiniteLoad,
  onSortChanged,
}) => {
  // TODO: this seems less than ideal.
  // Can the onInfiniteLoad encapsulate the dependency on
  // personId
  if (!personId) {
    return null;
  }

  return (
    <FilterList
      sortColumns={sortColumns}
      onSortChanged={onSortChanged}
      isInfiniteLoading={isInfiniteLoading}
      onInfiniteLoad={onInfiniteLoad}
    >
      {
        !appointments || appointments.length === 0 ?
          <div className="text-center">
              No encounter history for selected patient
          </div>
          :
          appointments.map(appointment => (
            <Encounter
              key={appointment.id}
              onRowClick={() => onRowClick(appointment.personId,
                appointment.id, previousPath, selectedTabId)}
              {...appointment}
            />),
          )
      }
    </FilterList>
  );
};

Encounters.propTypes = {
  personId: PropTypes.number.isRequired,
  appointments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    visitType: PropTypes.string.isRequired,
    dob: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
  }).isRequired),
  isInfiniteLoading: PropTypes.bool,
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

export default Encounters;
