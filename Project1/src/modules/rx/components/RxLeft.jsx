import PropTypes from 'prop-types';
import React from 'react';
import classes from '../css/rx.css';
import * as types from 'srs/redux/rx/constants/ActionTypes';
import * as widgetType from 'srs/redux/rx/constants/WidgetType';

const RxLeft = ({ showWidget, widgetName, id, consentStatus, hasAllergy, hasPharmacy,
  defaultPharmacy, allergyList,
}) => {
  let consentClass = '';
  let state = '0';
  switch (consentStatus) {
    case types.CONSENT_NOT_SET:
      consentClass = classes.consentNotSet;
      state = '0';
      break;
    case types.CONSENT_SET_TRUE:
      consentClass = classes.consentSetTrue;
      state = '1';
      break;
    case types.CONSENT_SET_FALSE:
      consentClass = classes.consentSetFalse;
      state = '2';
      break;
    default:consentClass = classes.consentNotSet;
  }

  return (
    <div className="rxLeftPanel fullWidth">
      <div disabled="disabled" title="Consent" data-status={state} data-auto="ico_consent" className={`${classes.Icon}  ${widgetName === widgetType.CONSENT ? classes.Active : ''} ${consentClass}`} onClick={() => showWidget(widgetType.CONSENT, id)} />
      <div title="Eligibility" data-status="0" data-auto="ico_eligibility" className={`${classes.Icon} ${classes.eligibility} ${widgetName === widgetType.ELIGIBILITY ? classes.Active : ''}`} onClick={() => showWidget(widgetType.ELIGIBILITY, id)} />
      <div
        title={`${defaultPharmacy === undefined || defaultPharmacy === '' ? 'No Default Pharmacy' : defaultPharmacy}`}
        data-status={hasPharmacy ? '1' : '0'}
        data-auto="ico_pharmacy"
        className={`${classes.Icon} ${widgetName === widgetType.PHARMACY ? classes.Active : ''} ${hasPharmacy ? classes.haspatientPharmacy : classes.noPatientPharmacy}`}
        onClick={() => showWidget(widgetType.PHARMACY, id)}
      />
      <div title={hasAllergy ? allergyList : 'No Allergy'} data-status={hasAllergy ? '2' : '0'} data-auto="ico_allergy" className={`${classes.Icon} ${widgetName === widgetType.ALLERGY ? classes.Active : ''} ${hasAllergy ? classes.allergyOrNKDA : classes.noAllergy}`} onClick={() => showWidget(widgetType.ALLERGY, id)} />
      <div title="PendingRx" data-auto="ico_pendingRx" data-status="0" className={`${classes.Icon} ${widgetName === widgetType.PENDINGRX ? classes.Active : ''}  ${classes.pendingRx}`} onClick={() => showWidget(widgetType.PENDINGRX, id)} />
      <div title="Messages" data-auto="ico_messages" data-status="0" className={`${classes.Icon} ${widgetName === widgetType.MESSAGES ? classes.Active : ''}  ${classes.message}`} onClick={() => showWidget(widgetType.MESSAGES, id)} />
      <div title="Medication" data-auto="ico_medication" data-status="0" className={`${classes.Icon} ${classes.medication} ${widgetName === widgetType.RX ? classes.Active : ''}`} onClick={() => showWidget(widgetType.RX, id)} />
      <div title="NewRx" data-auto="ico_newRx" data-status="0" className={`${classes.Icon} ${classes.newRx}  ${widgetName === widgetType.NEWRX ? classes.Active : ''}`} onClick={() => showWidget(widgetType.NEWRX, id)} />
    </div>
  );
};

RxLeft.propTypes = {
  showWidget: PropTypes.func,
  widgetName: PropTypes.string,
  id: PropTypes.string,
  consentStatus: PropTypes.string,
  hasAllergy: PropTypes.bool,
  hasPharmacy: PropTypes.bool,
  defaultPharmacy: PropTypes.string,
  allergyList: PropTypes.string,
};

export default RxLeft;
