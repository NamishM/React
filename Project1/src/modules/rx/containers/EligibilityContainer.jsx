import { connect } from 'react-redux';
import Eligibility from '../components/Eligibility';
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
      },
    });
    widget.open(() => { dispatch(widgetOpened()); });
  },
  onFailure: () => {
    console.log('Problem in loading RcopiaJs'); // eslint-disable-line no-console
  },
});

const EligibilityContainer = connect(mapStateToProps, mapDispatchToProps)(Eligibility);

export default EligibilityContainer;
