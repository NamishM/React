import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import TaskButton from '../../components/TaskButton';
import {
  taskingGetRoomsList,
} from 'srs/redux/tasking/actions/taskingActions';
import {
  noTaskGetRoomsList,
} from 'srs/redux/noTaskGrid/actions';

const TaskButtonRoom = ({
  onClick = () => {},
  className = null,
  disabled = false,
  id,
  isOnTasking = false,
  encounterId,
  unAuthorizeText = '',
}) => (
  <TaskButton
    label="Room"
    unAuthorizeText={unAuthorizeText}
    onClick={() => onClick(encounterId, id, isOnTasking)}
    className={className}
    disabled={disabled}
  />
);

TaskButtonRoom.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  encounterId: PropTypes.string.isRequired,
  isOnTasking: PropTypes.bool,
  unAuthorizeText: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  onClick: (encounterId, id, isOnTasking) => {
    if (isOnTasking) {
      dispatch(taskingGetRoomsList(encounterId, id, true));
    } else {
      dispatch(noTaskGetRoomsList(encounterId, id, true));
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskButtonRoom);
