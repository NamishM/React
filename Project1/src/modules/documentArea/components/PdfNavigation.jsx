import PropTypes from 'prop-types';
import React from 'react';
import classes from '../css/documentArea.css';
import SortArea from '../containers/SortArea';

const PdfNavigation = ({
  pageNumber,
  pageCount,
  isNotesVisible,
  onPreviousPageClick,
  onNextPageClick,
  onZoomPlusClick,
  onZoomOutClick,
  onRotateLeftClick,
  onRotateRightClick,
  onNotesButtonClick,
}) => (
  <div className={`${classes.pdfNav}`}>
    {isNotesVisible ? <SortArea /> : null}
    <div
      className={`${isNotesVisible ? classes.visibilityHidden : ''} btn-group`}
    >
      <button
        type="button"
        className="btn btn-primary"
        disabled={isNotesVisible}
        onClick={() => {
          if (pageNumber > 1) {
            onPreviousPageClick();
          }
        }}
      >
        <i className="fa fa-step-backward" aria-hidden="true" />
      </button>
      <button
        type="button"
        className="btn btn-primary"
        disabled={isNotesVisible}
        onClick={() => {
          if (pageNumber < pageCount) {
            onNextPageClick();
          }
        }}
      >
        <i className="fa fa-step-forward" aria-hidden="true" />
      </button>
    </div>

    <span
      className={`${isNotesVisible ? classes.displayNone : ''} ${classes.pageNumbers}`}
    >
      {pageNumber} / {pageCount}
    </span>

    <div
      className={`${isNotesVisible ? classes.displayNone : ''} btn-group`}
    >
      <button
        type="button"
        className="btn btn-primary"
        disabled={isNotesVisible}
        onClick={onZoomOutClick}
      >
        <i className="fa fa-search-minus" aria-hidden="true" />
      </button>
      <button
        type="button"
        className="btn btn-primary"
        disabled={isNotesVisible}
        onClick={onZoomPlusClick}
      >
        <i className="fa fa-search-plus" aria-hidden="true" />
      </button>
      <button
        type="button"
        className="btn btn-primary"
        disabled={isNotesVisible}
        onClick={onRotateLeftClick}
      >
        <i className="fa fa-undo" aria-hidden="true" />
      </button>
      <button
        type="button"
        className="btn btn-primary"
        disabled={isNotesVisible}
        onClick={onRotateRightClick}
      >
        <i className="fa fa-repeat" aria-hidden="true" />
      </button>
    </div>
    <button
      type="button"
      className={`${classes.notesButton} btn btn-primary`}
      onClick={onNotesButtonClick}
    >
      <i className="fa fa-sticky-note" aria-hidden="true" />
    </button>
  </div>
);

PdfNavigation.propTypes = {
  pageNumber: PropTypes.number,
  pageCount: PropTypes.number,
  onPreviousPageClick: PropTypes.func.isRequired,
  onNextPageClick: PropTypes.func.isRequired,
  onZoomPlusClick: PropTypes.func.isRequired,
  onZoomOutClick: PropTypes.func.isRequired,
  onRotateLeftClick: PropTypes.func.isRequired,
  onRotateRightClick: PropTypes.func.isRequired,
  onNotesButtonClick: PropTypes.func.isRequired,
  isNotesVisible: PropTypes.bool,
};

export default PdfNavigation;
