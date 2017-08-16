import PropTypes from 'prop-types';
import React from 'react';
import classes from '../../../common/css/cardLayout.css';
import docClasses from '../css/document.css';
import format from 'date-fns/format';

const typeToFont = (type) => {
  switch (type) {
    case 'doc':
    case 'docm':
    case 'docx': return 'fa-file-word-o';
    case 'jpeg':
    case 'jpg':
    case 'tif':
    case 'tiff':
    case 'bmp':
    case 'max': return 'fa-file-image-o';
    case 'pdf': return 'fa-file-pdf-o';
    case 'rtf':
    case 'wri':
    case 'txt': return 'fa-file-text-o';
    case 'wav': return 'fa-file-audio-o';
    case 'xls':
    case 'xlsm':
    case 'xlsx': return 'fa-file-excel-o';
    case 'xml':
    case 'xslt':
    case 'htm':
    case 'html': return 'fa-file-code-o';
    case 'xvr':
    case 'mxv':
    case 'wvr':
    default: return 'fa-file';
  }
};

const Document = ({
  name,
  encounterDate,
  isDeleted,
  isSelected,
  onRowClick,
  documentTypeId,
}) => (
  <div
    className={classes.container}
    style={{
      backgroundColor: isSelected ? '#d9edf7' : '#ffffff',
    }}
  >
    <div className={`${classes.header} srs-header-tertiary`}>
      <div>
        <span className={docClasses.fileName}>
          <i
            className={`fa ${typeToFont(documentTypeId)}`}
            aria-hidden="true"
          /> {documentTypeId}
        </span>
      </div>
      {/* <div>
        <button
          type="button"
          className="btn btn-warning"
          disabled
        >
          <i
            className="fa fa-trash"
            aria-hidden="true"
          />
        </button>
      </div> */}
    </div>
    <div
      onClick={onRowClick}
      className={`
        ${classes.body}
        ${isDeleted ? 'text-danger' : null}
      `}
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
      <div
        className={`${classes.documentColumn} ${classes.documentEncounterDate}`}
      >
        {encounterDate === '' ? 'No time' : format(encounterDate, 'MM/DD/YYYY')}
      </div>
    </div>
  </div>
);

Document.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  encounterDate: PropTypes.string.isRequired,
  documentTypeId: PropTypes.string.isRequired,
  isDeleted: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onRowClick: PropTypes.func.isRequired,
};

export default Document;
