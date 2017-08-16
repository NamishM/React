import PropTypes from 'prop-types';
import React from 'react';
import Pdf from '@srssoft/react-pdfjs';
import classes from '../css/documentArea.css';

const PleaseSelectATab = () => (
  <div className="text-center">
    <h5>
      <i className="fa fa-table" aria-hidden="true" />
      &nbsp;&nbsp;&nbsp;
      Please select a Tab.
    </h5>
  </div>
);

const PleaseSelectADocument = () => (
  <div className="text-center">
    <h5>
      <i className="fa fa-file-o" aria-hidden="true" />
        &nbsp;&nbsp;&nbsp;
        Please select a Document.
    </h5>
  </div>
);

const Document = ({
  documentContent,
  pageNumber,
  scale,
  rotation,
  onDocumentLoaded,
}) => (
  documentContent ?
    (<Pdf
      content={documentContent}
      scale={scale}
      rotate={rotation}
      page={pageNumber}
      loading={(<span>Loading Document...</span>)}
      onDocumentComplete={onDocumentLoaded}
    />)
    : (<div />)
);

Document.propTypes = {
  documentContent: PropTypes.string,
  pageNumber: PropTypes.number,
  scale: PropTypes.number,
  rotation: PropTypes.number,
  onDocumentLoaded: PropTypes.func.isRequired,
};


const DocumentContentUI = ({
  isTabSelected,
  isDocumentSelected,
  documentContent,
  pageNumber,
  scale,
  rotation,
  onDocumentLoaded,
}) => (
  <div className={classes.documentArea}>
    {!isTabSelected ? <PleaseSelectATab /> : null }
    {isTabSelected && !isDocumentSelected ? <PleaseSelectADocument /> : null }
    {isTabSelected && isDocumentSelected ?
      <Document
        content={documentContent}
        scale={scale}
        rotate={rotation}
        page={pageNumber}
        loading={(<span>Loading Document...</span>)}
        onDocumentComplete={onDocumentLoaded}
      /> : null
    }
  </div>
);

DocumentContentUI.propTypes = {
  isTabSelected: PropTypes.bool,
  isDocumentSelected: PropTypes.bool,
  documentContent: PropTypes.string,
  pageNumber: PropTypes.number,
  scale: PropTypes.number,
  rotation: PropTypes.number,
  onDocumentLoaded: PropTypes.func.isRequired,
};

export default DocumentContentUI;

