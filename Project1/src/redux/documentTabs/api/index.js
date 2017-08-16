import { normalize, schema } from 'normalizr';

const documentTabsInfo = new schema.Entity('documentTabsInfos', {}, { idAttribute: 'documentGroupId' });

// Reminder: exported functions must be named
export function getDocumentTabsInfo(
  pageNumber,
  orderByColumns = [],
  personId,
  hasFiles = false,
  multipleDrawersId,
) {
  // TODO: Explore yielding the request. | don't call end(). See docs in link above;
  let request = global.superagent.get('/DocumentGroup');

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
  if (hasFiles) {
    request = request.query({ hasFiles });
  }
  if (multipleDrawersId && multipleDrawersId !== '') {
    request = request.query({ drawerId: multipleDrawersId });
  }
  return request
    .query({ personId })
    .query({ documents: true })
    .query({ _page: pageNumber })
    .query({ _pageSize: '30' })
    .set('Accept', 'application/json')
    .then((resp) => {
      const data = JSON.parse(resp.text);

      const normalized = normalize({ documentTabsInfos: data.results }, {
        documentTabsInfos: new schema.Array(documentTabsInfo),
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

// http://localhost/SRSAPI/Generic/DocumentGroup
