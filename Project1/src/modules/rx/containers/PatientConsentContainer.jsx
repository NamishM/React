import { connect } from 'react-redux';
import PatientConsent from '../components/PatientConsent';
import { widgetOpened } from 'srs/redux/rx/actions';

const mapStateToProps = state => ({
  isMedWidgetOpenedSuccessfully: state.Rx.isMedWidgetOpened,
});

const mapDispatchToProps = dispatch => ({
  showWidget: (widgetName, targetDiv) => {
    const widget = global.Rcopia.embedWidget({
      widgetName,
      targetDiv,
      properties: {
        patientKey: 'default',
        viewMode: 'full',
      },
    });
    widget.open(() => { dispatch(widgetOpened()); });
  },
  onFailure: () => {
    console.log('Problem in loading RcopiaJs'); // eslint-disable-line no-console
  },
});

const PatientConsentContainer = connect(mapStateToProps, mapDispatchToProps)(PatientConsent);

export default PatientConsentContainer;
