import * as types from '../constants/ActionTypes';

export const getDocumentList = (
  page,
  sortColumns,
  sortColumnPrecedence,
) => ({
  type: types.DOCUMENTS_FETCH_REQUESTED,
  page,
  sortColumns,
  sortColumnPrecedence,
});

export const getDocumentListSucceeded = (result, entities, stats) => ({
  type: types.DOCUMENTS_FETCH_SUCCEEDED,
  result,
  entities,
  stats,
});

export const getDocumentListFailed = (message = 'error in API response') => ({
  type: types.DOCUMENTS_FETCH_FAILED,
  message,
});

export const sortColumn = sortedBy => ({
  type: types.DOCUMENTS_SORT_COLUMN,
  sortedBy,
});

export const getNextPage = () => ({
  type: types.DOCUMENTS_NEXT_PAGE,
});

export const skipDocumentListNextDataFlow = () => ({
  type: types.SKIP_NEXT_DOCUMENTS_DATA,
});

export const onSelection = (id = -1) => ({
  type: types.DOCUMENTCONTENT_FETCH_REQUESTED,
  id,
});

export const getDocumentContentSucceeded = (documentContent = null) => ({
  type: types.DOCUMENTCONTENT_FETCH_SUCCEEDED,
  documentContent,
});

export const getDocumentContentFailed = (message = 'error in API response') => ({
  type: types.DOCUMENTCONTENT_FETCH_FAILED,
  message,
});

export const pdfPreviousPage = () => ({
  type: types.PDF_PREVIOUS_PAGE,
});

export const pdfNextPage = () => ({
  type: types.PDF_NEXT_PAGE,
});

export const pdfZoomIn = () => ({
  type: types.PDF_ZOOM_IN,
});

export const pdfZoomOut = () => ({
  type: types.PDF_ZOOM_OUT,
});

export const pdfRotateLeft = () => ({
  type: types.PDF_ROTATE_LEFT,
});

export const pdfRotateRight = () => ({
  type: types.PDF_ROTATE_RIGHT,
});

export const pdfDocumentLoaded = (pageCount = 1) => ({
  type: types.PDF_DOCUMENT_LOADED,
  pageCount,
});

export const viewNotes = () => ({
  type: types.DOCUMENT_NOTES_VIEW,
});

export const getDocumentNotesSucceeded = (result, entities, stats) => ({
  type: types.DOCUMENT_NOTES_FETCH_SUCCEEDED,
  result,
  entities,
  stats,
});

export const getDocumentNotesFailed = (message = 'error in API response') => ({
  type: types.DOCUMENT_NOTES_FETCH_FAILED,
  message,
});

export const sortNotesColumn = sortedBy => ({
  type: types.DOCUMENT_NOTES_SORT_COLUMN,
  sortedBy,
});
