import { connect } from 'react-redux';
import Prescription from '../components/Prescription';
import { widgetOpened, scriptLoaderFailed } from 'srs/redux/rx/actions';

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
      },
    });
    widget.open(() => { dispatch(widgetOpened()); });
  },
  onFailure: (widgetName, id) => {
    dispatch(scriptLoaderFailed(widgetName, id));
  },
});

const PrescriptionContainer = connect(mapStateToProps, mapDispatchToProps)(Prescription);

export default PrescriptionContainer;
