import PropTypes from 'prop-types';
import React from 'react';
import classes from '../css/documentTab.css';

const DocumentTab = ({ name, hasFiles, isSelected, onRowClick, index, desktopLayout }) => (
  <div
    onClick={onRowClick}
    className={`${classes.dtRow}
      ${desktopLayout ? // eslint-disable-line no-nested-ternary
  (!hasFiles ? classes.odd : classes.even) :
    (index % 2 ? classes.odd : classes.even)}
      `}
    style={
      isSelected ?
        {
          backgroundColor: '#d9edf7',
        } : null
    }
  >
    <div
      className={classes.documentTabColumn}
      title={name}
    >
      {name}
      {
        hasFiles ?
          <i
            className={`${classes.documentTabHasFiles} fa fa-file-o`}
            aria-hidden="true"
          /> :
          null
      }
    </div>
  </div>
);

DocumentTab.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  hasFiles: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onRowClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  desktopLayout: PropTypes.bool.isRequired,
};

export default DocumentTab;
