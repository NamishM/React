import { put, call } from 'redux-saga/effects';
import * as rxActions from '../../rx/actions';
import { addApi, getEntityIdApi, updateApi, deleteApi, searchPharmacyApi,
  searchByPersonIdApi, readApi, getAvailableProperty } from '../../rx/api';
import * as types from '../constants/ActionTypes';
import { takeLatest, takeEvery } from 'redux-saga';

export function* postPayload(payload) {
  try {
    let result;
    let externalId = '';
    switch (payload.operation) {
      case 'created':
        result = yield call(addApi, payload.apiName, payload.data);
        break;
      case 'updated': {
        const integrationData = yield call(getEntityIdApi, 'EntityMapping',
          payload.data.ExternalId, payload.integrationInfo.sourceId,
          payload.integrationInfo.groupId, payload.integrationInfo.entityId);

        if (integrationData && integrationData.length > 0) {
          const id = integrationData[0].entityId;// eslint-disable-line
          externalId = payload.data.ExternalId; //  ExternalId is not required in update operation.
          payload.data.ExternalId = null; // eslint-disable-line no-param-reassign

          result = yield call(updateApi, payload.apiName, payload.data,
            id);
          payload.data.ExternalId = externalId; // eslint-disable-line no-param-reassign
        }
        break;
      }
      case 'deleted': {
        const integrationData = yield call(getEntityIdApi, 'EntityMapping',
          payload.data.ExternalId, payload.integrationInfo.sourceId,
          payload.integrationInfo.groupId, payload.integrationInfo.entityId);

        if (integrationData && integrationData.length > 0) {
          const id = integrationData[0].entityId;
          result = yield call(deleteApi, payload.apiName, id);
        }
        break;
      }
      default:
        result = undefined;
    }
    if (result) {
      yield put(rxActions.widgetDataAddedSucceeded(result, payload.widgetName, payload.operation));
    } else {
      yield put(rxActions.widgetDataAddedFailed(payload.data, payload.widgetName,
        'Exception in '.concat(payload.operation).concat(payload.widgetName).concat('data')));
    }
  } catch (e) {
    yield put(rxActions.widgetDataAddedFailed(payload.data, payload.widgetName,
      'Exception in '.concat(payload.operation).concat(payload.widgetName).concat('data')));
  }
}

export function* updatePharmacyWidget(payload) {
  try {
    let result;
    const integrationData = yield call(getEntityIdApi, 'EntityMapping',
      payload.data.ExternalId, payload.integrationInfo.sourceId,
      payload.integrationInfo.groupId, payload.integrationInfo.entityId);

    if (integrationData && integrationData.length > 0) {
      const pharmacyId = integrationData[0].entityId;// eslint-disable-line

      const pharmacySearchResult = yield call(searchPharmacyApi, payload.apiName,
        pharmacyId, payload.data.PersonId);

      if (pharmacySearchResult && pharmacySearchResult.length > 0) {
        switch (payload.operation) {
          case 'updated': {
            payload.data.PersonId = 0;// eslint-disable-line
            result = yield call(updateApi, payload.apiName, payload.data,
              pharmacySearchResult[0].patientPharmacyId);
            break;
          }
          case 'deleted': {
            result = yield call(deleteApi, payload.apiName,
              pharmacySearchResult[0].patientPharmacyId);
            break;
          }
          default:
            result = undefined;
        }
      }
    }
    if (result) {
      yield put(rxActions.widgetDataAddedSucceeded(result, payload.widgetName, payload.operation));
    } else {
      yield put(rxActions.widgetDataAddedFailed(payload.data, payload.widgetName,
        'Exception in '.concat(payload.operation).concat(payload.widgetName).concat('data')));
    }
  } catch (e) {
    yield put(rxActions.widgetDataAddedFailed(payload.data, payload.widgetName,
      'Exception in '.concat(payload.operation).concat(payload.widgetName).concat('data')));
  }
}

export function* getRxWidgetDetails(payload) {
  try {
    let consentStatus = types.CONSENT_NOT_SET;
    let hasPharmacy = false;
    let defaultPharmacy = '';
    let allergyList = '';
    let hasAllergy = false;
    let pharmacyId = 0;
    const consentSortInfo = '&_sort:desc=CONSENTDATE';
    const allergyPagingInfo = '&_pageSize=100';
    const consentSearchResult = yield call(searchByPersonIdApi, 'Patientconsent',
      payload.personId, consentSortInfo, '');
    if (consentSearchResult && consentSearchResult.length > 0) {
      consentStatus =
      (consentSearchResult[0].isConsent) ?
        types.CONSENT_SET_TRUE : types.CONSENT_SET_FALSE;
    }
    //  No need to apply paging as one person can only have only 5 pharmacies.
    const pharmacySearchResult = yield call(searchByPersonIdApi, 'RxPatientPharmacy',
      payload.personId, '', '');
    if (pharmacySearchResult && pharmacySearchResult.length > 0) {
      hasPharmacy = true;
      for (const ph of pharmacySearchResult) {
        if (ph.isDefault) {
          pharmacyId = ph.pharmacyId;
        }
      }
      if (pharmacyId) {
        const Pharmacy = yield call(readApi, 'RxPharmacy', pharmacyId);
        defaultPharmacy = Pharmacy.pharmacyName;
      }
    }
    const allergySearchResult = yield call(searchByPersonIdApi, 'Allergy',
      payload.personId, '', allergyPagingInfo);
    for (const allergy of allergySearchResult) {
      if (allergy.isActive) {
        hasAllergy = true;
        if (allergyList === '') {
          allergyList = allergyList.concat(allergy.name);
        } else {
          allergyList = allergyList.concat(', ').concat(allergy.name);
        }
      }
    }
    yield put(rxActions.setRxDetails(consentStatus, hasPharmacy, defaultPharmacy, hasAllergy
      , allergyList));
  } catch (e) {
    console.log('error'); //  eslint-disable-line
  }
}

export function* getRxWidgetSettings() {
  try {
    let systemName;
    let interfaceUsername;
    let interfacePassword;
    let practiceId;
    const userName = global.config.RcopiaUsername; //  TODO

    const properties = 'PropertyName=DRFIRST_PortalSystemName,DRFIRST_VendorName,DRFIRST_VendorPassword,DRFIRST_PracticeUserName';
    const settings = yield call(getAvailableProperty, properties);

    if (settings && settings.length > 0) {
      for (const property of settings) {
        switch (property.propertyName) {
          case 'DRFIRST_PortalSystemName':
            systemName = property.propertyValue;
            break;
          case 'DRFIRST_VendorName':
            interfaceUsername = property.propertyValue;
            break;
          case 'DRFIRST_VendorPassword':
            interfacePassword = property.propertyValue;
            break;
          case 'DRFIRST_PracticeUserName':
            practiceId = property.propertyValue;
            break;
          /*  case 'DrFirst_UserName':
            userName = 'sprovider88'; // property.propertyValue;
            break;  */
          default:
            break;
        }
      }
    }
    if (practiceId && interfacePassword && interfaceUsername && systemName && userName) {
      yield put(rxActions.rxWidgetGetSettingsSucceeded(systemName, interfaceUsername,
        interfacePassword, practiceId, userName));
    } else {
      yield put(rxActions.rxWidgetGetSettingsFailed());
    }
  } catch (e) {
    yield put(rxActions.rxWidgetGetSettingsFailed());
  }
}

export function* watchDownloadPayload() {
  yield* takeEvery(types.WIDGET_DATA_ADDED, postPayload);
}

export function* watchUpdatePharmacyMapping() {
  yield* takeEvery(types.PHARMACY_WIDGET_DATA_UPDATED, updatePharmacyWidget);
}

export function* watchGetRxDetails() {
  yield* takeLatest(types.RX_WIDGETS_DETAILS_GET, getRxWidgetDetails);
}

export function* watchGetSettings() {
  yield* takeLatest(types.RX_WIDGETS_GET_SETTINGS, getRxWidgetSettings);
}
