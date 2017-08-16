import PropTypes from 'prop-types';
import React from 'react';
import tabClasses from '../css/documentTab.css';
import classes from '../../../common/css/cardLayout.css';

const DocumentTab = ({ name, hasFiles, isSelected, onRowClick }) => (
  <div
    onClick={onRowClick}
    className={classes.container}
    style={{
      backgroundColor: isSelected ? '#d9edf7' : '#ffffff',
    }}
  >
    <div className={`${classes.header} srs-header-tertiary`}>
      <div>
        <span>
          {
            hasFiles ?
              <i
                className={`${tabClasses.documentTabHasFiles} fa fa-file-o`}
                aria-hidden="true"
              /> :
              null
          }
        </span>
      </div>
    </div>
    <div
      className={classes.body}
      style={
        isSelected ?
          {
            backgroundColor: '#d9edf7',
          } : null
      }
    >
      <div
        title={name}
      >
        <strong>{name}</strong>
      </div>
    </div>
  </div>
);

DocumentTab.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  hasFiles: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onRowClick: PropTypes.func.isRequired,
};

export default DocumentTab;
