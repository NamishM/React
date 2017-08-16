import { put, call, take, select } from 'redux-saga/effects';
import * as types from '../constants/ActionTypes';
import { getDocumentListInfo, getDocumentContent, getDocumentNotes } from '../api';
import * as actions from '../actions';
import { takeLatestWhileAuthenticated } from '../../user/sagas';
import { FILTER_DOCUMENT_LIST,
  DOCUMENT_FILTER_RESET_DEFAULT } from '../../documentFilter/constants/ActionTypes';

// worker Saga : will be fired on SEARCH_INIT actions
export function* bindDocumentList(request) {
  try {
    const orderByColumns = request.sortColumnPrecedence ?
      request.sortColumnPrecedence.map(key => request.sortColumns[key])
      : [];

    const criteria = yield select(
      state => ({
        documentGroupId: state.documentTabs.selectedTabId,
        personId: state.selectedChart.personId,
        showDeleted: state.documentFilter.isShowDeletedChecked,
      }),
    );
    if (criteria.documentGroupId) {
      const documentInfo = yield call(
        getDocumentListInfo,
        request.page,
        orderByColumns,
        criteria.documentGroupId,
        criteria.personId,
        criteria.showDeleted,
      );
      yield put(
        actions.getDocumentListSucceeded(
          documentInfo.result,
          documentInfo.entities,
          documentInfo.stats,
        ),
      );
    } else {
      yield put(actions.skipDocumentListNextDataFlow());
    }
  } catch (e) {
    yield put(actions.getDocumentListFailed(e.message));
  }
}

export function* watchDocumentListRequested() {
  yield* takeLatestWhileAuthenticated(types.DOCUMENTS_FETCH_REQUESTED,
    bindDocumentList);
}
// worker saga: will trap DOCUMENTS_NEXT_PAGE and fire DOCUMENTS_FETCH_REQUESTED
export function* documentListNextPageFlow() {
  let oldPage = 1;
  let skipNextPageFlow = false;
  while (true) { // eslint-disable-line no-constant-condition
    yield take([types.DOCUMENTS_NEXT_PAGE,
      FILTER_DOCUMENT_LIST,
      DOCUMENT_FILTER_RESET_DEFAULT,
      'DOCUMENT_TAB_SELECTION']);

    const criteria = yield select(
      state => ({
        filters: state.documentList.filters,
        sort: state.documentList.sort,
        stats: state.documentList.stats,
      }),
    );
    if (criteria.stats.totalPages <= 1) {
      if (criteria.filters.page === 0 || criteria.stats.totalPages === 1) {
        skipNextPageFlow = true;
      } else {
        skipNextPageFlow = false;
      }
    }
    // restrict paging
    if (!skipNextPageFlow && (oldPage !== criteria.filters.page || oldPage === 1)) {
      yield put(
        actions.getDocumentList(
          criteria.filters.page === 0 ? 1 : criteria.filters.page,
          criteria.sort.columns,
          criteria.sort.precedence,
        ),
      );
      oldPage = criteria.filters.page === 0 ? 1 : criteria.filters.page;
    } else {
      skipNextPageFlow = false;
      yield put(actions.skipDocumentListNextDataFlow());
    }
  }
}

// document selection

// worker Saga : will be fired on DOCUMENTCONTENT_FETCH_REQUESTED actions
export function* bindDocumentContent() {
  try {
    const documentId = yield select(state => state.documentList.selectedDocumentId);
    if (documentId) {
      const documentContent = yield call(getDocumentContent, documentId);
      yield put(
        actions.getDocumentContentSucceeded(documentContent),
      );
    } else {
      yield put(actions.getDocumentContentFailed('Unable to display document'));
    }
  } catch (e) {
    yield put(actions.getDocumentContentFailed(e.message));
  }
}

export function* watchDocumentContentRequested() {
  yield* takeLatestWhileAuthenticated(types.DOCUMENTCONTENT_FETCH_REQUESTED,
    bindDocumentContent);
}

// document notes fetching

// worker Saga : will be fired on DOCUMENTS_VIEW_NOTES actions
export function* bindDocumentNotes() {
  try {
    const criteria = yield select(
      state => ({
        documentId: state.documentList.selectedDocumentId,
        sort: state.documentNotesList.sort,
      }),
    );
    const orderByColumns = criteria.sort.precedence ?
      criteria.sort.precedence.map(key => criteria.sort.columns[key])
      : [];
    if (criteria.documentId) {
      const documentNote = yield call(getDocumentNotes, criteria.documentId, orderByColumns);
      if (documentNote.result) {
        yield put(
          actions.getDocumentNotesSucceeded(
            documentNote.result,
            documentNote.entities,
            documentNote.stats,
          ),
        );
      }
    } else {
      yield put(actions.getDocumentNotesFailed('Unable to display document notes'));
    }
  } catch (e) {
    yield put(actions.getDocumentNotesFailed(e.message));
  }
}

export function* watchDocumentNotesRequested() {
  yield* takeLatestWhileAuthenticated([types.DOCUMENTCONTENT_FETCH_REQUESTED,
    types.DOCUMENT_NOTES_SORT_COLUMN],
  bindDocumentNotes);
}
