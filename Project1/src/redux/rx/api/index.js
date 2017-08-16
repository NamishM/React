
export function addApi(apiMethod, payload) {
  return global.superagent
    .post(`/${apiMethod}`)
    .send(payload)
    .set('Accept', 'application/json')
    .then(resp => JSON.parse(resp.text));
}

export function updateApi(apiName, payload, id) {
  return global.superagent
    .put(`/${apiName}/${id}`)
    .send(payload)
    .set('Accept', 'application/json')
    .then(resp => JSON.parse(resp.text));
}

export function deleteApi(apiMethod, id) {
  return global.superagent
    .del(`/${apiMethod}/${id}`)
    .set('Accept', 'application/json');
}

export function readApi(apiMethod, Id) {
  return global.superagent
    .get(`/${apiMethod}/${Id}`)
    .set('Accept', 'application/json')
    .then(resp => JSON.parse(resp.text));
}

export function getEntityIdApi(apiMethod, externalId, sourceId, entityGroupId, entityTypeId) {
  return global.superagent
    .get(`/${apiMethod}?SourceId=${sourceId}&ExternalEntityId=${externalId}&EntityGroupId=${entityGroupId}&EntityTypeId=${entityTypeId}`)
    .set('Accept', 'application/json')
    .then(resp => JSON.parse(resp.text).results);
}

export function searchPharmacyApi(apiMethod, pharmacyId, personId) {
  return global.superagent
    .get(`/${apiMethod}?PharmacyId=${pharmacyId}&PatientId=${personId}`)
    .set('Accept', 'application/json')
    .then(resp => JSON.parse(resp.text).results);
}

export function searchByPersonIdApi(apiMethod, personId, sortInfo, pagingInfo) {
  return global.superagent
    .get(`/${apiMethod}?PatientId=${personId}${sortInfo}${pagingInfo}`)
    .set('Accept', 'application/json')
    .then(resp => JSON.parse(resp.text).results);
}

export function getAvailableProperty(propertiesList) {
  return global.superagent
    .get(`/AvailableProperty?${propertiesList}`)
    .set('Accept', 'application/json')
    .then(resp => JSON.parse(resp.text).results);
}
