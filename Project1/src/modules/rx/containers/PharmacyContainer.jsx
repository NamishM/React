import { connect } from 'react-redux';
import Pharmacy from '../components/Pharmacy';
import { showWidget } from 'srs/redux/rx/actions';

const mapDispatchToProps = dispatch => ({
  showWidget: (widgetName, targetDiv) => {
    const properties = {
      patientKey: 'default',
    };
    dispatch(showWidget(widgetName, targetDiv, properties));
  },
  onFailure: () => {
    console.log('Problem in loading RcopiaJs'); // eslint-disable-line no-console
  },
});

const PharmacyContainer = connect(undefined, mapDispatchToProps)(Pharmacy);

export default PharmacyContainer;
