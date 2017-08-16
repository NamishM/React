import { connect } from 'react-redux';
import Rx from '../components/RxApp';
import { authenticationSuccess, authenticationFailed, widgetOpened,
  widgetDataUpdate, setPatientContext, initiatAuthentication, getRxDetails, rxWidgetGetSettings,
  updatePrescriptionCompleteStatus, addCompletePrescriptionData,
  prescriptionAction, loadScriptStack, unBlockUI } from 'srs/redux/rx/actions';
import SubscribeEventList from 'srs/redux/rx/constants/SubscribeEvents';
import { callMapper } from 'srs/redux/rx/mappers/parentMapper';
import * as eventType from 'srs/redux/rx/constants/EventType';

const mapStateToProps = state => ({
  isAuthenticated: state.Rx.isAuthenticated,
  hasPatientContext: state.Rx.hasPatientContext,
  isAuthenticationInitiated: state.Rx.isAuthenticationInitiated,
  token: state.Rx.token,
  encounterId: state.Rx.encounterId,
  patientExternalId: state.Rx.patientExternalId,
  widgetName: state.Rx.widgetName,
  systemName: state.Rx.systemName,
  userName: state.Rx.userName,
  interfaceUsername: state.Rx.interfaceUsername,
  interfacePassword: state.Rx.interfacePassword,
  hasLatestWidgetDetails: state.Rx.hasLatestWidgetDetails,
  consentStatus: state.Rx.RxInfo.consentStatus,
  hasAllergy: state.Rx.RxInfo.allergy.hasAllergy,
  allergyList: state.Rx.RxInfo.allergy.allergyList,
  hasPharmacy: state.Rx.RxInfo.pharmacy.hasPharmacy,
  defaultPharmacy: state.Rx.RxInfo.pharmacy.defaultPharmacy,
  prescriptionData: state.Rx.completePrescriptionDetails,
  scriptsStack: state.Rx.scriptsStack,
  isRendered: state.Rx.isRendered,
});

const mapDispatchToProps = dispatch => ({
  loadScripts: (callback) => {
    let z = 0;
    let script = null;
    document.body.setAttribute('rcopia', '');
    const scriptArray = global.config.rcopiaBaseUriArray;
    scriptArray.forEach((src) => {
      script = document.createElement('script');
      script.src = src;
      script.async = false;
      document.body.appendChild(script);
      script.onload = function onload() {
        z += 1;
        if (z === scriptArray.length) {
          dispatch(loadScriptStack(script));
          global.Rcopia.bootstrapWidgets();
          callback();
        }
      };
    });
  },
  setInitialData: (username, interfaceUsername, interfacePassword,
    addSubscriber, patientId, encounterId, setPatient, systemName,
    showWidget, widgetType, id) => {
    const authenticationByUserProps =
      {
        interfaceUsername,
        interfacePassword,
        userId: { username },
      };
    dispatch(initiatAuthentication());
    global.Rcopia.authenticateByProxy(authenticationByUserProps, (authResult) => {
      if (authResult.status !== 'error') {
        //  global.Rcopia.setUITimeout(global.config.rcopiaTimeout);
        dispatch(authenticationSuccess(authResult));
        addSubscriber(patientId, encounterId);
        setPatient(patientId, systemName, () => showWidget(widgetType, id));
      } else {
        dispatch(authenticationFailed('Authentication Failed, Please Try Again.'));
      }
    });
  },
  setPatient: (patientExternalId, systemName, callback) => {
    global.Rcopia.setPatient({
      externalId: patientExternalId,
      systemName,
    }).then(() => {
      dispatch(getRxDetails(patientExternalId));
      dispatch(setPatientContext());
      if (callback) {
        callback();
      }
    });
  },
  showWidget: (widgetName, targetDiv) => {
    dispatch(unBlockUI(false));
    setTimeout(() => { dispatch(unBlockUI(true)); }, 2000);
    global.Rcopia.embedWidget({
      widgetName,
      targetDiv,
      properties: {
        patientKey: 'default',
        viewMode: 'full',
      } },
    () => {
      dispatch(widgetOpened(widgetName));
      dispatch(unBlockUI(true));
      // dispatch(showWidgetInitiation(true));
    },
    );
  },
  getSettings: () => {
    dispatch(rxWidgetGetSettings());
  },
  addSubscriber: (patientId, encounterId) => {
    SubscribeEventList.forEach((obj) => {
      global.Rcopia.subscribeEvent(
        { eventName: obj.eventName,
          callback: (data) => {
            const result = callMapper(obj, data, patientId, encounterId);
            if (result) {
              if (((data.eventName !== eventType.PRESCRIPTION_ACTION)
                && (data.eventName !== eventType.PRESCRIPTION_CHANGE))
                || result.operation !== undefined) {
              //  dispatcher for all mappers
                dispatch(
                  widgetDataUpdate(
                    obj.eventName,
                    result.data,
                    obj.widgetName,
                    result.apiName,
                    result.operation,
                    result.integration,
                    result.type,
                  ));
              } else if (result !== null) {
              //  Responsiblity of this event is to get prescription rcopiaId and status
              //  If Prescription not exist in state then add it.
                dispatch(prescriptionAction(result.type, result.data, 0));
              }
            }
          },
        },
      );
    },
    );
  },
  onAddPrescription: (filteredData) => {
    //  To set the status to default value after successfull call.
    dispatch(updatePrescriptionCompleteStatus(0, null));
    //  Initiate the saving mechanism.
    dispatch(widgetDataUpdate(undefined, filteredData.RxPrescriptionV2, 'prescribe', 'RxPrescription', filteredData.operation, filteredData.integration));
  },
  onCreatePrescriptionRetry: (prescriptionData) => {
    if (prescriptionData) {
      setTimeout(() => {
        dispatch(addCompletePrescriptionData(prescriptionData.prescription, 2));
      }, 3000);
    }
  },
  onPrescriptionFailed: (prescriptionData) => {
    //  dispatch(prescriptionFailed(prescriptionData));
    //  convert to med
    console.log('Prescription failed'.concat(prescriptionData)); // eslint-disable-line no-console
  },
  onGetLatestWidgetsStatus: (personId) => {
    dispatch(getRxDetails(personId));
  },
  onFailure: () => {
    console.log('Problem in loading RcopiaJs'); // eslint-disable-line no-console
  },
});

const App = connect(mapStateToProps, mapDispatchToProps)(Rx);

export default App;
