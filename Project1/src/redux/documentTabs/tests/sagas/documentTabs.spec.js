
import { call, select, put } from 'redux-saga/effects';
import { getDocumentTabsInfo } from '../../api';
import { bindDocumentTabsList } from '../../sagas';
import * as actions from '../../actions';
import { getFilterCriteria } from '../../../documentTabsFilter/reducers/documentTabsFilter';

const describe = global.describe;
const it = global.test;

const expect = global.expect;

const request = {
  page: 1,
  sortColumns: {
    0: {
      name: 'documentGroupDesc',
      label: 'Name',
      state: 'none',
    },
    1: {
      name: 'sortSeq',
      label: '',
      state: 'asc',
    },
  },
  sortColumnPrecedence: [0],
};

const orderByColumns = request.sortColumnPrecedence ?
  request.sortColumnPrecedence.map(key => request.sortColumns[key])
  : [];

const multipleDrawersId = '32';
const criteria = {
  selectedDrawers: [{
    value: 32,
  }],
  ishasDocumentChecked: false,
};
const documentTabsInfo =
  {
    0: [
      {
        documentGroupId: 1,
        documentGroupDesc: 'Chart Notes',
        isDeleted: false,
        sortSeq: 77,
        isHidden: false,
        msgAutoSeal: 1,
        ocrEnabled: 0,
        documentGroupNotes: null,
        powerLink: false,
        documents: true,
        plugInLink: false,
        isResultTab: false,
        isDefaultResultTab: false,
        hasFiles: true,
      },
    ],
    entities: {
      documentTabsInfos: {
        0: {
          documentGroupId: 1,
          documentGroupDesc: 'Chart Notes',
          isDeleted: false,
          sortSeq: 77,
          isHidden: false,
          msgAutoSeal: 1,
          ocrEnabled: 0,
          documentGroupNotes: null,
          powerLink: false,
          documents: true,
          plugInLink: false,
          isResultTab: false,
          isDefaultResultTab: false,
          hasFiles: true,
        },
      },
    },
    stats:
    {
      totalResults: 143,
      totalPages: 15,
      pageSize: 10,
      pageNumber: 1,
      startIndex: 0,
      endIndex: 9,
    },
  };

describe('documentTabs saga: bindDocumentTabsList', () => {
  it('should call our getDocumentTabsInfo ' +
      'API and then call the succeed action', () => {
    const generator = bindDocumentTabsList(request);

    // move to the first yield statement to get user id
    let next = generator.next();
    // move to the second yield statement
    next = generator.next();
    // Get getFilterCriteria
    expect(next.value).toEqual(select(getFilterCriteria));

    // move to the third yield statement
    next = generator.next({
      selectedDrawers: [{
        value: 32,
      }],
      ishasDocumentChecked: false,
    });

    expect(next.value).toEqual(
      call(
        getDocumentTabsInfo,
        1,
        orderByColumns,
        undefined,
        criteria.ishasDocumentChecked,
        multipleDrawersId,
      ));

    next = generator.next(documentTabsInfo);

    expect(next.value).toEqual(put(actions.getDocumentTabsListSucceeded(
      documentTabsInfo.result,
      documentTabsInfo.entities,
      documentTabsInfo.stats,
    )));
  });
});

describe('documentList saga: bindDocumentTabsList', () => {
  it('should call our getDocumentTabsInfo ' +
  'API and then call the failed action', () => {
    const generator = bindDocumentTabsList(request);

    // move to the first yield statement to get user id
    let next = generator.next();
    next = generator.next();
    // move to the third yield statement
    next = generator.next(criteria);

    // Mock the failure of our API call
    next = generator.throw(new Error('API called failed'));

    expect(next.value).toEqual(put(actions.getDocumentTabsListFailed('API called failed')));
  });
});
