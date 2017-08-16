import PropTypes from 'prop-types';
import React from 'react';
import DocumentTabFilter from '../containers/DocumentTabFilter';
import generateFilterList from '../../filterList/components/generateFilterList';
import DocumentTab from '../components/DocumentTab';

const FilterList = generateFilterList(DocumentTabFilter);

const DocumentTabs = ({
  tabs,
  selectedPersonId,
  selectedEncounterId,
  isInfiniteLoading = false,
  sortColumns,
  onRowClick,
  onInfiniteLoad,
  onSortChanged,
  isFilterBoardVisible,
}) => (
  <FilterList
    sortColumns={sortColumns}
    onSortChanged={onSortChanged}
    isInfiniteLoading={isInfiniteLoading}
    onInfiniteLoad={onInfiniteLoad}
    elementHeight={109}
    isFilterBoardVisible={isFilterBoardVisible}
    filterBoardPanelHeight={180}
  >
    {
      !tabs ?
        <div />
        :
        tabs.map(tab => (
          <DocumentTab
            key={tab.id}
            {...tab}
            onRowClick={() => onRowClick(
              tab.id,
              selectedPersonId,
              selectedEncounterId,
            )}
          />),
        )
    }
  </FilterList>
);

DocumentTabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    hasFiles: PropTypes.bool.isRequired,
    isSelected: PropTypes.bool.isRequired,
  }).isRequired),
  isInfiniteLoading: PropTypes.bool,
  onRowClick: PropTypes.func.isRequired,
  isFilterBoardVisible: PropTypes.bool.isRequired,
  onInfiniteLoad: PropTypes.func.isRequired,
  onSortChanged: PropTypes.func.isRequired,
  sortColumns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
  }).isRequired),
  selectedPersonId: PropTypes.number,
  selectedEncounterId: PropTypes.string,
};


export default DocumentTabs;
