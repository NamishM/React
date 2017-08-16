import { normalize, schema } from 'normalizr';
import { insertSortedTask } from '../helpers/helper';

const patientTrackingStatus = new schema.Entity(
  'patientTrackingStatuses',
  {},
  {
    idAttribute: 'encounterId',
    mergeStrategy: (entityA, [entityB]) =>
      insertSortedTask(entityB, (entityA.length ? entityA : [entityA])),
    processStrategy: entity => [entity],
  },
);

export function getTaskingDetailsByEncounterId(
  encounterId,
  taskStatusId,
) {
  return global.superagent
    .get('/task')
    .query({
      _pageSize: '999',
      encounterId,
      taskStatusId,
    })
    .set('Accept', 'application/json')
    .then((resp) => {
      const data = JSON.parse(resp.text);
      const normalized = normalize({ patientTrackingStatuses: data.results }, {
        patientTrackingStatuses: new schema.Array(patientTrackingStatus),
      });

      // only keep unique values
      normalized.result.patientTrackingStatuses =
        [...new Set(normalized.result.patientTrackingStatuses)];

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

// Reminder: exported functions must be named
export function getTaskingDetails(
  multipleProviderId,
  multipleRoomId,
  roomIdQueryString,
  taskGroupsId,
  selectedPersonId,
) {
  let request = global.superagent.get('/task')
    .query({ encountersWithActiveTasks: true });
  if (selectedPersonId) {
    request = request.query({ personId: selectedPersonId });
  } else {
    if (multipleProviderId && multipleProviderId !== '') {
      request = request.query({ personDeskId: multipleProviderId });
    }
    if (multipleRoomId && multipleRoomId !== '') {
      request = request.query(`${roomIdQueryString}=${multipleRoomId}`);
    }
    if (taskGroupsId && taskGroupsId !== '') {
      request =
        request.query({ pT_PatientStatusTypeId: taskGroupsId });
    }
  }
  // -------------------------------------------------------------------------
  // TODO: FIX FOR EHR embedded IE browser - This should be removed if possible
  // The subsequent request will never complete in the VB6 Browser
  // unless the DOM is "touched." It would seem that the browser
  // sleeps when no user activity is detected. Touching the DOM
  // forces the browser to repaint which somehow keeps the browser
  // active. We should see if there's a better way to accomplish this.
  // -------------------------------------------------------------------------
  const ele = document.querySelector('.mainApp > span > span');
  if (ele) {
    ele.innerHTML = ele.innerHTML;
  }
  // -------------------------------------------------------------------------
  // END FIX
  // -------------------------------------------------------------------------
  return request
    .query({ _pageSize: '999' })
    .set('Accept', 'application/json')
    .then((resp) => {
      const data = JSON.parse(resp.text);
      const normalized = normalize({ patientTrackingStatuses: data.results }, {
        patientTrackingStatuses: new schema.Array(patientTrackingStatus),
      });

      normalized.result.patientTrackingStatuses =
        [...new Set(normalized.result.patientTrackingStatuses)];

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

export const updateTaskingStatus = task =>
  global.superagent
    .put(`/task/${task.taskId}`)
    .send({
      pT_PatientStatusTypeId: task.patientStatusTypeId,
      linkedSourceType: task.linkedSourceType,
      linkedSourceId: task.linkedSourceId,
      taskSetSequence: task.taskSetSequence,
      taskStatusId: task.taskStatusId,
      taskDetails: task.unParsedTaskDetails,
      encounterId: task.encounterId,
    })
    .set('Accept', 'application/json')
    .then(resp => JSON.parse(resp.text));

export function getUpdatedSequence(encId, taskSequence) {
  return global.superagent
    .get('/task')
    .query({ encounterId: encId })
    .query({ taskSetSequence: taskSequence })
    .set('Accept', 'application/json')
    .then(resp => JSON.parse(resp.text).results[0]);
}

export const saveTask = task =>
  global.superagent
    .post('/task/')
    .send({
      taskId: 0,
      pT_PatientStatusTypeId: task.patientStatusTypeId,
      taskDetails: task.taskDetails,
      encounterId: task.encounterId,
      linkedSourceType: 0,
      taskStatusId: 1,
      taskSetSequence: 1,
    })
    .set('Accept', 'application/json')
    .then(resp => JSON.parse(resp.text));

export function getFavoriteTask(groupId, userId) {
  return global.superagent
    .get('/FavoriteTask?_sort:desc=favoritesUsedCount')
    .query({ groupId })
    .query({ userId })
    .query({ _pageSize: '9999' })
    .set('Accept', 'application/json')
    .then(resp => JSON.parse(resp.text).results);
}

export function createFavoriteTask(groupId, templateDetails, userId) {
  return global.superagent
    .post('/FavoriteTask')
    .send({ groupId, templateDetails, userId })
    .set('Accept', 'application/json');
}

export function deleteFavoriteTask(templateMappingId) {
  return global.superagent
    .del(`/FavoriteTask/${templateMappingId}`)
    .set('Accept', 'application/json');
}
