import { connect } from 'react-redux';
import RoomsDropDownUI from '../components/RoomsDropDown';
import {
  taskingGetRoomsList,
} from 'srs/redux/tasking/actions/taskingActions';
import {
  noTaskGetRoomsList,
  noTaskRoomUpdateRequested,
} from 'srs/redux/noTaskGrid/actions';
import { getRooms } from 'srs/redux/common/reducers/taskingRoom';

const mapStateToProps = (state, ownProps) => ({
  rooms: getRooms(state),
  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  onClick: (encounterId, id, isOnTasking) => {
    if (isOnTasking) {
      dispatch(taskingGetRoomsList(encounterId, id, false));
    } else {
      dispatch(noTaskGetRoomsList(encounterId, id, false));
    }
  },
  onRoomUpdate: (encounterId, taskId, existingRoomId, newRoomId) =>
    dispatch(noTaskRoomUpdateRequested(
      encounterId,
      taskId,
      existingRoomId,
      newRoomId,
    )),
});

export default connect(mapStateToProps, mapDispatchToProps)(RoomsDropDownUI);
