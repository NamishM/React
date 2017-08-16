import { normalize, schema } from 'normalizr';

const documentInfo = new schema.Entity('documentInfos', {}, { idAttribute: 'documentId' });

// Reminder: exported functions must be named
export function getDocumentListInfo(
  pageNumber,
  orderByColumns = [],
  documentGroupId = 1,
  personId,
  showDeleted = false,
) {
  // TODO: Explore yielding the request. | don't call end(). See docs in link above;
  let request = global.superagent.get('/document');

  request = orderByColumns.reduce(
    (prev, next) => {
      if (next.state === 'none') {
        return prev;
      }
      const param = {};
      const key = `_sort:${next.state}`;
      param[key] = next.name;
      return prev.query(param);
    },
    request,
  );

  if (!showDeleted) {
    request = request.query({ IsDeleted: false });
  }

  return request
    .query({ documentGroupId })
    .query({ personId })
    .query({ _page: pageNumber })
    .query({ _pageSize: '30' })
    .set('Accept', 'application/json')
    .then((resp) => {
      const data = JSON.parse(resp.text);

      const normalized = normalize({ documentInfos: data.results }, {
        documentInfos: new schema.Array(documentInfo),
      });

      normalized.stats = {
        pageNumber: data.pageNumber,
        pageSize: data.pageSize,
        startIndex: data.startIndex,
        endIndex: data.endIndex,
        totalPages: data.totalPages,
        totalResults: data.totalResults,
      };

      return normalized;
    });
}
// http://localhost/SRSAPI/Generic/document

export const getDocumentContent = documentId =>
  global.superagent
    .get(`/documentContent/${documentId}`)
    .set('Accept', 'application/pdf+base64')
    .then(resp => resp.text);

// http://localhost/SRSAPI/Generic/documentContent

const documentNote = new schema.Entity('documentNotes', {}, { idAttribute: 'msgId' });

export function getDocumentNotes(documentId, orderByColumns = []) {
  // TODO: Explore yielding the request. | don't call end(). See docs in link above;
  let request = global.superagent.get('/Message');

  request = orderByColumns.reduce(
    (prev, next) => {
      if (next.state === 'none') {
        return prev;
      }
      const param = {};
      const key = `_sort:${next.state}`;
      param[key] = next.name;
      return prev.query(param);
    },
    request,
  );

  return request
    .query({ documentId })
    .query({ _pageSize: '999' })
    .set('Accept', 'application/json')
    .then((resp) => {
      const data = JSON.parse(resp.text);

      const normalized = normalize({ documentNotes: data.results }, {
        documentNotes: new schema.Array(documentNote),
      });

      normalized.stats = {
        pageNumber: data.pageNumber,
        pageSize: data.pageSize,
        startIndex: data.startIndex,
        endIndex: data.endIndex,
        totalPages: data.totalPages,
        totalResults: data.totalResults,
      };

      return normalized;
    });
}

// http://localhost/SRSAPI/Generic/Message
