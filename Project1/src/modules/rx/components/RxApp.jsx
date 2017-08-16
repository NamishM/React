import '../css/rx.less';
import classes from '../css/rx.css';
import PropTypes from 'prop-types';
import React from 'react';
import RxRight from '../components/RxRight';
import RxLeft from '../components/RxLeft';
import * as widgetType from 'srs/redux/rx/constants/WidgetType';

const RxApp = ({ setInitialData,
  isAuthenticated, systemName, userName, interfaceUsername, interfacePassword,
  patientExternalId, showWidget, isAuthenticationInitiated,
  addSubscriber, setPatient, consentStatus, hasAllergy, allergyList, hasPharmacy,
  defaultPharmacy, widgetName, onGetLatestWidgetsStatus, getSettings, hasLatestWidgetDetails,
  id = 'divWidget', encounterId, onAddPrescription, prescriptionData, onCreatePrescriptionRetry,
  onPrescriptionFailed, loadScripts, scriptsStack,
}) => {
  if (systemName && userName && interfaceUsername && interfacePassword) {
    if (scriptsStack === '') {
      loadScripts(
        () => {
          if (!isAuthenticated) {
            if (!isAuthenticationInitiated) {
              setInitialData(userName, interfaceUsername, interfacePassword, addSubscriber,
                patientExternalId, encounterId, setPatient,
                systemName, showWidget, widgetType.RX, id);

              // setPatient(patientExternalId, systemName, () => showWidget(widgetType.RX, id));
            // addSubscriber(widgetName, patientExternalId, encounterId);//  add all listeners
            }
          }
        });
    }
    // if (!hasPatientContext) {
    //  setPatient(patientExternalId, systemName, () => showWidget(widgetType.RX, id));
    // }
    if (hasLatestWidgetDetails) {
      onGetLatestWidgetsStatus(patientExternalId);
    }
    if (prescriptionData.IsprescriptionReady === 1) {
      //  This method will be called in case of completed prescription.
      onAddPrescription(prescriptionData.prescription);
    }
    if (prescriptionData.IsprescriptionReady === 2) {
      //  set delay and re hit med after 5 sec
      onCreatePrescriptionRetry(prescriptionData);
    }
    if (prescriptionData.IsprescriptionReady === 3) {
      //  Failed call
      onPrescriptionFailed(prescriptionData);
    }
  } else {
    getSettings();
  }
  return (
    <div className={`container-fluid ${classes.fullHeightOverride}`}>
      <link rel="stylesheet" href="https://web3.staging.drfirst.com/cdn/df-widgets.all.css" />
      <div className="row rxMain" >

        <div className="col-lg-1 col-md-1 col-sm-2 col-xs-2 rxLeftPanel favPadding">
          <RxLeft
            showWidget={showWidget}
            widgetName={widgetName}
            id={id}
            consentStatus={consentStatus}
            hasAllergy={hasAllergy}
            hasPharmacy={hasPharmacy}
            defaultPharmacy={defaultPharmacy}
            allergyList={allergyList}
          />
        </div>
        <div className="col-lg-11 col-md-11 col-sm-10 col-xs-10 rxRightPanel">
          <RxRight />
        </div>
      </div>
    </div>
  );
};


RxApp.propTypes = {
  isAuthenticated: PropTypes.bool,
  hasPatientContext: PropTypes.bool,
  isAuthenticationInitiated: PropTypes.bool,
  hasLatestWidgetDetails: PropTypes.bool,
  hasAllergy: PropTypes.bool,
  hasPharmacy: PropTypes.bool,
  prescriptionData: PropTypes.shape(),
  encounterId: PropTypes.string,
  patientExternalId: PropTypes.string,
  systemName: PropTypes.string,
  userName: PropTypes.string,
  interfaceUsername: PropTypes.string,
  interfacePassword: PropTypes.string,
  appName: PropTypes.string,
  id: PropTypes.string,
  widgetName: PropTypes.string,
  consentStatus: PropTypes.string,
  defaultPharmacy: PropTypes.string,
  allergyList: PropTypes.string,
  getSettings: PropTypes.func,
  setInitialData: PropTypes.func,
  showWidget: PropTypes.func,
  addSubscriber: PropTypes.func,
  setPatient: PropTypes.func,
  onGetLatestWidgetsStatus: PropTypes.func,
  onAddPrescription: PropTypes.func,
  onPrescriptionFailed: PropTypes.func,
  onCreatePrescriptionRetry: PropTypes.func,
  loadScripts: PropTypes.func,
  scriptsStack: PropTypes.string,
};

export default RxApp;
