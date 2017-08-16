import PropTypes from 'prop-types';
import React from 'react';
import DocumentFilter from '../containers/DocumentFilter';
import generateFilterList from '../../filterList/components/generateFilterList';
import Document from './Document';

const FilterList = generateFilterList(DocumentFilter);

const Documents = ({
  documents,
  onRowClick,
  desktopLayout,
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
    elementHeight={109}
    isFilterBoardVisible={isFilterBoardVisible}
    filterBoardPanelHeight={480}
  >
    {
      !documents ?
        <div /> :
        documents.map((document, index) => (
          <Document
            key={document.id}
            {...document}
            onRowClick={() => onRowClick(document.id)}
            index={index}
            desktopLayout={desktopLayout}
          />),
        )
    }
  </FilterList>
);


Documents.propTypes = {
  documents: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    documentTypeId: PropTypes.string.isRequired,
    documentSize: PropTypes.string.isRequired,
    encounterDate: PropTypes.string.isRequired,
    isDeleted: PropTypes.bool.isRequired,
    isSelected: PropTypes.bool.isRequired,
  }).isRequired),
  isInfiniteLoading: PropTypes.bool,
  isFilterBoardVisible: PropTypes.bool.isRequired,
  isTabSelected: PropTypes.bool.isRequired,
  onRowClick: PropTypes.func.isRequired,
  onInfiniteLoad: PropTypes.func.isRequired,
  onSortChanged: PropTypes.func.isRequired,
  sortColumns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
  }).isRequired),
  desktopLayout: PropTypes.bool.isRequired,
};


export default Documents;
