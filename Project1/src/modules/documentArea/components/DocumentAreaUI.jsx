import PropTypes from 'prop-types';
import React from 'react';
import classes from '../css/documentArea.css';
import PdfControls from '../containers/PdfControls';
import DocumentContentUI from './DocumentContentUI';
import DocumentNotesUI from './DocumentNotesUI';

const DocumentAreaUI = ({
  isTabSelected,
  isDocumentSelected,
  documentContent,
  pageNumber,
  scale,
  rotation,
  isNotesVisible = false,
  onDocumentLoaded,
  notes,
}) => (
  <div className={classes.container}>
    {isDocumentSelected ? <PdfControls /> : null}
    {
      isDocumentSelected && isNotesVisible ?
        <DocumentNotesUI
          notes={notes}
        />
        :
        <DocumentContentUI
          isTabSelected={isTabSelected}
          isDocumentSelected={isDocumentSelected}
          documentContent={documentContent}
          pageNumber={pageNumber}
          scale={scale}
          rotation={rotation}
          onDocumentLoaded={onDocumentLoaded}
        />
    }
  </div>
);

DocumentAreaUI.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    priorityCode: PropTypes.string.isRequired,
    sent: PropTypes.string.isRequired,
    regardingPatient: PropTypes.string.isRequired,
    sender: PropTypes.string.isRequired,
  }).isRequired),
  isTabSelected: PropTypes.bool,
  isDocumentSelected: PropTypes.bool,
  documentContent: PropTypes.string,
  pageNumber: PropTypes.number,
  scale: PropTypes.number,
  rotation: PropTypes.number,
  isNotesVisible: PropTypes.bool,
  onDocumentLoaded: PropTypes.func.isRequired,
};

export default DocumentAreaUI;

