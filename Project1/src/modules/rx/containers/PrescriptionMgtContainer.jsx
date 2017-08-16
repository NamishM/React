import { connect } from 'react-redux';
import PrescriptionMgt from '../components/PrescriptionMgt';
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

const PrescriptionMgtContainer = connect(mapStateToProps, mapDispatchToProps)(PrescriptionMgt);

export default PrescriptionMgtContainer;
