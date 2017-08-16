
import { call, put } from 'redux-saga/effects';
import { getDocumentListInfo } from '../../api';
import { bindDocumentList } from '../../sagas';
import * as actions from '../../actions';

const describe = global.describe;
const it = global.test;

const expect = global.expect;

const request = {
  page: 1,
  sortColumns: {
    0: {
      name: 'documentName',
      label: 'Name',
      state: 'none',
    },
    1: {
      name: 'encounterDate',
      label: 'Date',
      state: 'asc',
    },
  },
  sortColumnPrecedence: [0],
};

const orderByColumns = request.sortColumnPrecedence ?
  request.sortColumnPrecedence.map(key => request.sortColumns[key])
  : [];
const criteria = {
  documentGroupId: 312,
  personId: 3822207,
  showDeleted: true,
};
const documents =
  {
    0: [
      {
        documentId: 1823146999,
        personId: 3822207,
        documentGroupId: 312,
        documentTypeId: 'doc',
        documentSize: 108544,
        documentName: '_x007E_Armstrong - Vascular MD Recall Sheet',
        documentTime: '2007-11-26T00:00:00',
        sealed: ' ',
        isDeleted: true,
        lastModified: '2007-09-14T00:00:00',
        encounterDate: '2007-11-26T00:00:00',
        isProgressNote: false,
        sealerId: null,
        sealTime: null,
        sealCode: null,
        encounterDateSortSeq: 100798,
        dbInsertTime: '2007-11-26T15:50:38.167',
        deleterId: 1,
        locked: false,
        lockByUserId: null,
        lockTime: null,
      },
    ],
    entities: {
      documents: {
        0: {
          name: '_x007E_Armstrong - Vascular MD Recall Sheet',
          id: 1823146999,
          documentTypeId: 'doc',
          documentSize: 108544,
          encounterDate: '2007-11-26T00:00:00',
          isDeleted: true,
          isSelected: true,
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

describe('documentList saga: bindDocumentList', () => {
  it('should call our getDocumentListInfo ' +
      'API and then call the succeed action', () => {
    const generator = bindDocumentList(request);

    // move to the first yield statement to get user id
    let next = generator.next();

    // move to the second yield statement
    next = generator.next(criteria);

    expect(next.value).toEqual(
      call(
        getDocumentListInfo,
        1,
        orderByColumns,
        criteria.documentGroupId,
        criteria.personId,
        criteria.showDeleted,
      ));

    next = generator.next(documents);

    expect(next.value).toEqual(put(actions.getDocumentListSucceeded(
      documents.result,
      documents.entities,
      documents.stats,
    )));
  });
});

describe('documentList saga: bindDocumentList', () => {
  it('should call our getDocumentListInfo ' +
  'API and then call the failed action', () => {
    const generator = bindDocumentList(request);

    // move to the first yield statement to get user id
    let next = generator.next();

    // move to the second yield statement
    next = generator.next(criteria);

    // Mock the failure of our API call
    next = generator.throw(new Error('API called failed'));

    expect(next.value).toEqual(put(actions.getDocumentListFailed('API called failed')));
  });
});
