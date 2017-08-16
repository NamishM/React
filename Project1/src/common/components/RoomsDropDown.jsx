import PropTypes from 'prop-types';
import React from 'react';
import classes from '../css/roomsDropDown.css';
import TaskButton from 'srs/modules/tasking/components/TaskButton';

const getStatusColor = (room) => {
  let color = 'rgb(0,255,0)';
  if (room.maxPatients) {
    if (room.noOfPatientInRoom > 0 && room.noOfPatientInRoom < room.maxPatients) {
      color = 'rgb(255,255,0)';
    } else if (room.maxPatients === room.noOfPatientInRoom) {
      color = 'rgb(255,0,0)';
    }
  }
  return color;
};

const RoomsDropDown = ({
  rooms = [],
  id,
  selectedEncounter,
  selectedRoomId,
  onRoomUpdate,
  onClick = () => {},
  isOnTasking = false,
  screenLayout,
  isNoTaskGridVisible,
}) => (
  <div
    className={
      (screenLayout === 'desktop' && isNoTaskGridVisible) || screenLayout === 'device' ?
        'btn-group col-xs-6 col-sm-6 col-md-3 col-lg-3' :
        'btn-group'
    }
  >
    <select
      className={`${classes.selectBox} rooms-dropdown`}
      ref={(input) => { this.roomSelect = input; }}
      defaultValue={selectedRoomId || ''}
    >
      {rooms.length === 0 ?
        <option disabled>No Room</option>
        :
        rooms.map(room =>
          (
            <option
              key={room.roomId}
              value={room.roomId}
              disabled={room.noOfPatientInRoom > 0}
            >
              <span className={classes.statusIndicator}>
                <i
                  className="fa fa-circle"
                  style={{
                    color: getStatusColor(room),
                  }}
                  aria-hidden="true"
                />
              </span>
              {room.description} {`(${room.noOfPatientInRoom}/${room.maxPatients ? room.maxPatients : 'No Max'})`}
            </option>
          ),
        )
      }
    </select>
    <TaskButton
      onClick={() => {
        const val = parseInt(this.roomSelect.value, 10);
        if (val === selectedRoomId) {
          onClick(selectedEncounter, id, isOnTasking);
        } else {
          onRoomUpdate(
            selectedEncounter,
            id,
            selectedRoomId,
            val,
          );
        }
      }}
      label="OK"
      disabled={
        rooms.length === 0 ||
        rooms.filter(rm => rm.noOfPatientInRoom > 0).length === rooms.length
      }
    />
    <TaskButton
      onClick={() => onClick(selectedEncounter, id, isOnTasking)}
      label="Cancel"
    />
  </div>
);

RoomsDropDown.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.shape({
    roomId: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    locationId: PropTypes.number,
  }).isRequired),
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  currentTask: PropTypes.oneOfType([PropTypes.object]),
  selectedEncounter: PropTypes.string.isRequired,
  selectedRoomId: PropTypes.number,
  onRoomUpdate: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  isOnTasking: PropTypes.bool,
  isFullyOccupied: PropTypes.bool,
  screenLayout: PropTypes.string,
  isNoTaskGridVisible: PropTypes.bool,
};

export default RoomsDropDown;
