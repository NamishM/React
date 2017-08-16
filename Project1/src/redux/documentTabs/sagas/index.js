import { put, call, take, select } from 'redux-saga/effects';
import * as types from '../constants/ActionTypes';
import { getDocumentTabsInfo } from '../api';
import * as actions from '../actions';
import { takeLatestWhileAuthenticated } from '../../user/sagas';
import { getFilterCriteria } from '../../documentTabsFilter/reducers/documentTabsFilter';
import {
  FILTER_DOCUMENT_TABS,
  RESET_DOCUMENTTABS_GRID,
} from '../../documentTabsFilter/constants/ActionTypes';
import { reduceObjectsToString } from '../../../utilities';

// worker Saga : will be fired on SEARCH_INIT actions
export function* bindDocumentTabsList(request) {
  try {
    const orderByColumns = request.sortColumnPrecedence ?
      request.sortColumnPrecedence.map(key => request.sortColumns[key])
      : [];
    const personId = yield select(
      state => state.selectedChart.personId,
    );
    // get selected Drawers and ishasDocumentChecked from document Tabs Filter.
    const { selectedDrawers, ishasDocumentChecked } = yield select(getFilterCriteria);

    const multipleDrawersId = reduceObjectsToString(selectedDrawers, 'value');

    const documentTabsInfo = yield call(
      getDocumentTabsInfo,
      request.page,
      orderByColumns,
      personId,
      ishasDocumentChecked,
      multipleDrawersId,
    );
    yield put(
      actions.getDocumentTabsListSucceeded(
        documentTabsInfo.result,
        documentTabsInfo.entities,
        documentTabsInfo.stats,
      ),
    );
  } catch (e) {
    yield put(actions.getDocumentTabsListFailed(e.message));
  }
}

export function* watchDocumentTabsListRequested() {
  yield* takeLatestWhileAuthenticated(types.DOCUMENT_TABS_FETCH_REQUESTED,
    bindDocumentTabsList);
}
// worker saga: will trap DOCUMENT_TABS_NEXT_PAGE and fire DOCUMENT_TABS_FETCH_REQUESTED
export function* documentTabsListNextPageFlow() {
  let oldPage = 1;
  let skipNextPageFlow = false;
  while (true) { // eslint-disable-line no-constant-condition
    yield take([types.DOCUMENT_TABS_NEXT_PAGE,
      FILTER_DOCUMENT_TABS,
      RESET_DOCUMENTTABS_GRID]);

    const criteria = yield select(
      state => ({
        filters: state.documentTabs.filters,
        sort: state.documentTabs.sort,
        stats: state.documentTabs.stats,
        personId: state.selectedChart.personId,
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
    if (criteria.personId) {
      if (!skipNextPageFlow &&
          (oldPage !== criteria.filters.page || oldPage === 1)
      ) {
        yield put(
          actions.getDocumentTabsList(
            criteria.filters.page === 0 ? 1 : criteria.filters.page,
            criteria.sort.columns,
            criteria.sort.precedence,
          ),
        );
        oldPage = criteria.filters.page === 0 ? 1 : criteria.filters.page;
      } else {
        skipNextPageFlow = false;
        yield put(actions.skipDocumentTabsListNextDataFlow());
      }
    }
  }
}
