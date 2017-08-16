import { connect } from 'react-redux';
import RoomsSliderUI from '../components/RoomsSliderUI';
import { patientToggleSelected } from 'srs/redux/tasking/actions/roomSliderAction';
import { getLoadedRooms } from 'srs/redux/tasking/reducers/taskingDetails';

const mapStateToProps = state => ({
  rooms: getLoadedRooms(state),
});
const mapDispatchToProps = dispatch => ({
  onPatientSelected: patientId => dispatch(patientToggleSelected(patientId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RoomsSliderUI);
