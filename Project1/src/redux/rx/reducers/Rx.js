import * as types from '../constants/ActionTypes';
import * as widgetType from '../constants/WidgetType';

const initialState = {
  isAuthenticated: false,
  isAuthenticationInitiated: false,
  hasPatientContext: false,
  token: null,
  patientExternalId: '',
  encounterId: null,
  widgetName: widgetType.RX,
  systemName: '',
  userName: '',
  userPassword: '',
  interfaceUsername: '',
  interfacePassword: '',
  practiceId: '',
  locationId: { externalId: '' },
  completePrescriptionDetails: {
    prescriptionPreSet: [],
    prescription: {},
    IsprescriptionReady: 0,
  },
  isMedWidgetOpened: false,
  widgetData: {
    status: types.NO_REQUEST,
    errorMsg: '',
    payload: '',
    widgetName: '',
    apiName: '',
    operation: '',
  },
  hasLatestWidgetDetails: false,
  RxInfo: {
    status: types.NO_REQUEST,
    errorMsg: '',
    consentStatus: types.CONSENT_NOT_SET,
    allergy: {
      hasAllergy: false,
      isNKDA: false,
      allergyList: '',
    },
    pharmacy: {
      hasPharmacy: false,
      defaultPharmacy: null,
    },
  },
  scriptsStack: '',
  isRendered: false,
};

const addNewPrescription = (prescriptionData, prescription) => {
  if (prescriptionData.length > 0) {
    for (const obj of prescriptionData) {
      if (obj.ExternalId !== prescription.ExternalId) {
        prescriptionData.push(prescription);
        break;
      }
    }
  } else {
    prescriptionData.push(prescription);
  }
  return prescriptionData;
};

const mapPrescription = (prescriptionData, data, status) => {
  let isMatched = false;
  if (data.RxPrescriptionV2) {
    const prescriptionExternalId = data.RxPrescriptionV2.ExternalId;
    for (let i = 0; i < prescriptionData.length; i++) { // eslint-disable-line no-plusplus
      if (prescriptionData[i].ExternalId === prescriptionExternalId) {
        data.RxPrescriptionV2.PrescriptionStatus = // eslint-disable-line no-param-reassign
        prescriptionData[i].PrescriptionStatus;
        if (data.RxPrescriptionV2.PharmacyExternalId === undefined ||
          data.RxPrescriptionV2.PharmacyExternalId === null) {
          data.RxPrescriptionV2.PharmacyExternalId = // eslint-disable-line no-param-reassign
          prescriptionData[i].PharmacyExternalId;
        }
        prescriptionData.splice(i, 1);
        isMatched = true;
        break;
      }
    }
  }
  if (isMatched) {
    return {
      prescriptionPreSet: prescriptionData,
      prescription: data,
      IsprescriptionReady: 1,
    };
  }
  if (status !== 2) { //  first retry hit
    return {
      prescriptionPreSet: prescriptionData,
      prescription: data,
      IsprescriptionReady: 2,
    };
  }
  return { //  Failed call
    prescriptionPreSet: prescriptionData,
    prescription: data,
    IsprescriptionReady: 3,
  };
};

const Rx = (state = initialState, action) => {
  switch (action.type) {
    case types.ON_INIT:
    {
      return Object.assign({}, state, {
        patientExternalId: action.patientId,
        encounterId: action.encounterId,
      });
    }
    case types.AUTHENTICATION_SUCCESS:
    {
      if (action.authResult.token.token !== null) {
        return Object.assign({}, state, {
          token: action.authResult.token.token,
          isAuthenticated: true,
        });
      }
      return state;
    }
    case types.AUTHENTICATION_INITIATED:
    {
      return Object.assign({}, state, {
        isAuthenticationInitiated: true,
      });
    }
    case types.SET_PATIENT_CONTEXT:
    {
      return Object.assign({}, state, {
        hasPatientContext: true,
      });
    }
    case types.SHOW_WIDGET:
    {
      if (state.token !== null) {
        return Object.assign({}, state, {
          isRendered: action.isRendered,
        });
      }
      return state;
      // To Do : Token null messages to be handled.
    }
    case types.SCRIPT_LOAD_FAILED:
    {
      // TODO
      return state;
    }
    case types.WIDGET_OPENED:
    {
      return Object.assign({}, state, {
        widgetName: action.widgetName,
      });
    }
    case types.WIDGET_DATA_ADDED:
    {
      return Object.assign({}, state, {
        widgetData: {
          status: types.WIDGET_STATUS_PENDING,
          errorMsg: '',
          payload: action.data,
          widgetName: action.widgetName,
          apiName: action.apiName,
          operation: action.operation,
        },
      });
    }
    case types.WIDGET_DATA_ADDED_SUCCESSFULLY:
    {
      return Object.assign({}, state, {
        widgetData: {
          status: types.WIDGET_STATUS_SUCCESS,
          errorMsg: '',
          widgetName: action.widgetName,
          operation: action.operation,
        },
        hasLatestWidgetDetails: true,
      });
    }
    case types.WIDGET_DATA_ADDED_FAILED:
    {
      return Object.assign({}, state, {
        allergy: {
          status: types.WIDGET_STATUS_FAILED,
          errorMsg: action.message,
          widgetName: action.widgetName,
          payload: action.data, // save this payload as due to some error not able to store it.
        },
      });
    }
    case types.RX_WIDGETS_DETAILS_GET_SUCCESSFULLY:
    {
      return Object.assign({}, state, {
        hasLatestWidgetDetails: false,
        RxInfo: {
          status: types.WIDGET_STATUS_SUCCESS,
          errorMsg: '',
          consentStatus: action.consentStatus,
          allergy: {
            hasAllergy: action.hasAllergy,
            isNKDA: false,
            allergyList: action.allergyList,
          },
          pharmacy: {
            hasPharmacy: action.hasPharmacy,
            defaultPharmacy: action.defaultPharmacy,
          },
        },
      });
    }
    case types.RX_WIDGETS_GET_SETTINGS_SUCCESSFULLY:
    {
      return Object.assign({}, state, {
        systemName: action.systemName,
        userName: action.userName,
        userPassword: 'Demo1234', // temp for reference only
        interfaceUsername: action.interfaceUsername,
        interfacePassword: action.interfacePassword,
        practiceId: action.practiceId,
      });
    }
    case types.ADD_PRESCRIPTION_DATA:
    {
      return Object.assign({}, state, {
        completePrescriptionDetails: {
          prescriptionPreSet: addNewPrescription(
            state.completePrescriptionDetails.prescriptionPreSet, action.data),
          prescription: {},
          IsprescriptionReady: 0,
        },
      });
    }
    case types.MAP_COMPLETE_PRESCRIPTION_DATA:
    {
      return Object.assign({}, state, {
        completePrescriptionDetails: mapPrescription(
          state.completePrescriptionDetails.prescriptionPreSet,
          action.data, action.status === undefined ? 0 : action.status),
      });
    }
    case types.UPDATE_PRESCRIPTION_COMPLETE_STATUS:
    {
      return Object.assign({}, state, {
        completePrescriptionDetails: {
          prescriptionPreSet: state.completePrescriptionDetails.prescriptionPreSet,
          prescription: state.completePrescriptionDetails.prescription,
          //  prescription: action.prescriptionPreSet ? action.prescriptionPreSet :
          //  state.prescriptionPreSet,
          IsprescriptionReady: action.status,
        },
      });
    }
    case types.LOAD_SCRIPTS:
    {
      return Object.assign({}, state, {
        scriptsStack: 'loaded',
      });
    }

    /*  case types.UPDATE_PRESCRIPTION_FAILED:
      {
        return Object.assign({}, state, {
          completePrescriptionDetails: {
            prescriptionPreSet: state.completePrescriptionDetails.prescriptionPreSet,
            prescription: state.completePrescriptionDetails.prescription,
            //  prescription: action.prescriptionPreSet ? action.prescriptionPreSet :
            //  state.prescriptionPreSet,
            IsprescriptionReady: action.status,
          },
        });
      } */
    default:
    {
      return state;
    }
  }
};

export default Rx;

