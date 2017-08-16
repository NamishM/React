import * as eventType from 'srs/redux/rx/constants/EventType';
import * as widgetType from 'srs/redux/rx/constants/WidgetType';

const SubscribeEventList = [
  { eventName: eventType.MEDICATION_CHANGE, widgetName: widgetType.RX, apiName: 'RxMedication' },
  { eventName: eventType.ALLERGY_CHANGE, widgetName: widgetType.ALLERGY, apiName: 'Allergy' },
  { eventName: eventType.PATIENTCONSENT_CHANGE, widgetName: widgetType.CONSENT, apiName: 'PatientConsent' },
  { eventName: eventType.PATIENTPHARMACY_CHANGE, widgetName: widgetType.PHARMACY, apiName: 'RxPharmacy' },
  { eventName: eventType.PATIENTPHARMACY_SETDEFAULT, widgetName: widgetType.PHARMACY, apiName: 'RxPatientPharmacy' },
  { eventName: eventType.PRESCRIPTION_CHANGE, widgetName: widgetType.PENDINGRX, apiName: 'RxPrescription' },
  { eventName: eventType.PRESCRIPTION_ACTION, widgetName: widgetType.NEWRX, apiName: 'RxPrescription' },
];
export default SubscribeEventList;
