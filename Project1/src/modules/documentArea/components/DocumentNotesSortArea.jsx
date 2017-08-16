import PropTypes from 'prop-types';
import React from 'react';
import classes from '../css/documentNotes.css';
import SortIndicator from '../../../common/components/SortIndicator';

const DocumentNotesSortArea = ({ sortColumns, onSortChanged }) => (
  <div className={`${classes.sortArea} col-xs-7 col-sm-8 col-md-8 col-lg-8`}>
    {
      sortColumns.map(column => (
        column.label !== '' ?
          <SortIndicator
            key={column.id}
            onClick={() => onSortChanged(column.id)}
            label={column.label}
            status={column.state}
            disabled={!column.name}
            externalCssClass={classes.sortIndicator}
          /> :
          null
      ))
    }
  </div>
);

DocumentNotesSortArea.propTypes = {
  sortColumns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
  }).isRequired),
  onSortChanged: PropTypes.func.isRequired,
};

export default DocumentNotesSortArea;

