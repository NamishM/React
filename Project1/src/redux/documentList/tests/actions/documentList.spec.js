
import * as types from '../../constants/ActionTypes';
import * as actions from '../../actions';

const describe = global.describe;
const it = global.test;

const expect = global.expect;

const documentContentDesc = 'dywRTkgJUaAGkDKAkRzeBK0wKaZWpqqmcMljK2NNQz';

describe('documentList action', () => {
  it('getDocumentList should create DOCUMENTS_FETCH_REQUESTED', () => {
    expect(actions.getDocumentList(1, {}, {})).toEqual({
      type: types.DOCUMENTS_FETCH_REQUESTED,
      page: 1,
      sortColumns: {},
      sortColumnPrecedence: {},
    });
  });

  it('getDocumentListSucceeded should create DOCUMENTS_FETCH_SUCCEEDED', () => {
    expect(actions.getDocumentListSucceeded([], [], {})).toEqual({
      type: types.DOCUMENTS_FETCH_SUCCEEDED,
      result: [],
      entities: [],
      stats: {},
    });
  });

  it('getDocumentListFailed should create DOCUMENTS_FETCH_FAILED', () => {
    expect(actions.getDocumentListFailed('error in API response')).toEqual({
      type: types.DOCUMENTS_FETCH_FAILED,
      message: 'error in API response',
    });
  });

  it('getDocumentListFailed should create DOCUMENTS_FETCH_FAILED action with no error Message', () => {
    expect(actions.getDocumentListFailed()).toEqual({
      type: types.DOCUMENTS_FETCH_FAILED,
      message: 'error in API response',
    });
  });

  it('sortColumn should create DOCUMENTS_SORT_COLUMN', () => {
    expect(actions.sortColumn(1)).toEqual({
      type: types.DOCUMENTS_SORT_COLUMN,
      sortedBy: 1,
    });
  });

  it('getNextPage should create DOCUMENTS_NEXT_PAGE', () => {
    expect(actions.getNextPage()).toEqual({
      type: types.DOCUMENTS_NEXT_PAGE,
    });
  });

  it('skipDocumentListNextDataFlow should create SKIP_NEXT_DOCUMENTS_DATA', () => {
    expect(actions.skipDocumentListNextDataFlow()).toEqual({
      type: types.SKIP_NEXT_DOCUMENTS_DATA,
    });
  });

  // todo: re-enable this once we see why local test run succeeds but build test fails
  it('onSelection should create DOCUMENTCONTENT_FETCH_REQUESTED', () => {
    expect(actions.onSelection(14)).toEqual({
      type: types.DOCUMENTCONTENT_FETCH_REQUESTED,
      id: 14,
    });
  });

  it('onSelection should create DOCUMENTCONTENT_FETCH_REQUESTED action with no guid', () => {
    expect(actions.onSelection()).toEqual({
      type: types.DOCUMENTCONTENT_FETCH_REQUESTED,
      id: -1,
    });
  });

  it('pdfRotateLeft should create PDF_ROTATE_LEFT', () => {
    expect(actions.pdfRotateLeft()).toEqual({
      type: types.PDF_ROTATE_LEFT,
    });
  });

  it('pdfRotateRight should create PDF_ROTATE_RIGHT', () => {
    expect(actions.pdfRotateRight()).toEqual({
      type: types.PDF_ROTATE_RIGHT,
    });
  });

  it('pdfDocumentLoaded should create PDF_DOCUMENT_LOADED', () => {
    expect(actions.pdfDocumentLoaded(1)).toEqual({
      type: types.PDF_DOCUMENT_LOADED,
      pageCount: 1,
    });
  });

  it('pdfDocumentLoaded should create PDF_DOCUMENT_LOADED action with no page count', () => {
    expect(actions.pdfDocumentLoaded()).toEqual({
      type: types.PDF_DOCUMENT_LOADED,
      pageCount: 1,
    });
  });

  it('viewNotes should create DOCUMENT_NOTES_VIEW', () => {
    expect(actions.viewNotes()).toEqual({
      type: types.DOCUMENT_NOTES_VIEW,
    });
  });

  it('getDocumentNotesSucceeded should create DOCUMENT_NOTES_FETCH_SUCCEEDED', () => {
    expect(actions.getDocumentNotesSucceeded([], [], {})).toEqual({
      type: types.DOCUMENT_NOTES_FETCH_SUCCEEDED,
      result: [],
      entities: [],
      stats: {},
    });
  });

  it('getDocumentNotesFailed should create DOCUMENT_NOTES_FETCH_FAILED', () => {
    expect(actions.getDocumentNotesFailed('error in API response')).toEqual({
      type: types.DOCUMENT_NOTES_FETCH_FAILED,
      message: 'error in API response',
    });
  });

  it('getDocumentNotesFailed should create DOCUMENT_NOTES_FETCH_FAILED action with no error message', () => {
    expect(actions.getDocumentNotesFailed()).toEqual({
      type: types.DOCUMENT_NOTES_FETCH_FAILED,
      message: 'error in API response',
    });
  });

  it('sortNotesColumn should create DOCUMENT_NOTES_SORT_COLUMN', () => {
    expect(actions.sortNotesColumn(1)).toEqual({
      type: types.DOCUMENT_NOTES_SORT_COLUMN,
      sortedBy: 1,
    });
  });

  it('getDocumentContentSucceeded should create DOCUMENTCONTENT_FETCH_SUCCEEDED', () => {
    expect(actions.getDocumentContentSucceeded(documentContentDesc)).toEqual({
      type: types.DOCUMENTCONTENT_FETCH_SUCCEEDED,
      documentContent: documentContentDesc,
    });
  });

  it('getDocumentContentSucceeded should create DOCUMENTCONTENT_FETCH_SUCCEEDED action with no documentContent', () => {
    expect(actions.getDocumentContentSucceeded()).toEqual({
      type: types.DOCUMENTCONTENT_FETCH_SUCCEEDED,
      documentContent: null,
    });
  });

  it('getDocumentContentFailed should create DOCUMENTCONTENT_FETCH_FAILED', () => {
    expect(actions.getDocumentContentFailed('error in API response')).toEqual({
      type: types.DOCUMENTCONTENT_FETCH_FAILED,
      message: 'error in API response',
    });
  });

  it('getDocumentContentFailed should create DOCUMENTCONTENT_FETCH_FAILED action no error message', () => {
    expect(actions.getDocumentContentFailed()).toEqual({
      type: types.DOCUMENTCONTENT_FETCH_FAILED,
      message: 'error in API response',
    });
  });

  it('pdfPreviousPage should create PDF_PREVIOUS_PAGE action', () => {
    expect(actions.pdfPreviousPage()).toEqual({
      type: types.PDF_PREVIOUS_PAGE,
    });
  });

  it('pdfNextPage should create PDF_NEXT_PAGE action', () => {
    expect(actions.pdfNextPage()).toEqual({
      type: types.PDF_NEXT_PAGE,
    });
  });

  it('pdfZoomIn should create PDF_ZOOM_IN action', () => {
    expect(actions.pdfZoomIn()).toEqual({
      type: types.PDF_ZOOM_IN,
    });
  });

  it('pdfZoomOut should create PDF_ZOOM_OUT action', () => {
    expect(actions.pdfZoomOut()).toEqual({
      type: types.PDF_ZOOM_OUT,
    });
  });
});
