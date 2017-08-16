import PropTypes from 'prop-types';
import React from 'react';
import format from 'date-fns/format';
import classes from '../css/encounter.css';
import Label from './Label';
import Value from './Value';
import RoomsDropDown from '../../../common/containers/RoomsDropDown';
import RoomButton from '../../tasking/containers/actionButtons/RoomButton';

const Encounter = ({
  name,
  dob,
  doctorname,
  encounterDate,
  roomDescription,
  index,
  onClickCheckOutButton,
  id,
  locationId,
  currentRoomId,
  isRoomsClicked,
  screenLayout,
  isNoTaskGridVisible,
}) => (
  <div
    className={`${classes.ptRow} row ${index % 2 ? classes.odd : classes.even}`}
  >
    <Label>Room</Label>
    <Value type="room">{roomDescription}</Value>
    <Label>Patient Name</Label>
    <Value type="patient">{name}</Value>
    <Label>Patient DOB</Label>
    <Value type="dob">{dob ? format(dob, 'MM/DD/YYYY') : 'No dob'}</Value>
    <Label>Encounter Provider</Label>
    <Value type="provider">{doctorname}</Value>
    <Label>Check-In Time</Label>
    <Value type="date">{!encounterDate ? 'No time' : format(encounterDate, 'hh:mm A')}</Value>
    <Label>Actions</Label>
    { isRoomsClicked ?
      <RoomsDropDown
        id={id}
        selectedEncounter={id}
        selectedRoomId={currentRoomId}
        isNoTaskGridVisible={isNoTaskGridVisible}
        screenLayout={screenLayout}
      />
      :
      <Value type="action">
        <div>
          <RoomButton
            id={id}
            encounterId={id}
            className={''}
          />
          <button
            className="btn btn-xs btn-default"
            onClick={() => {
              onClickCheckOutButton(id, locationId, currentRoomId);
            }}
          >
                Check-Out
          </button>
        </div>
      </Value>
    }
  </div>
);

Encounter.propTypes = {
  name: PropTypes.string.isRequired,
  doctorname: PropTypes.string.isRequired,
  encounterDate: PropTypes.string.isRequired,
  roomDescription: PropTypes.string,
  duration: PropTypes.string,
  color: PropTypes.string,
  index: PropTypes.number.isRequired,
  dob: PropTypes.string,
  isTaskAvailable: PropTypes.bool,
  id: PropTypes.string,
  locationId: PropTypes.number,
  currentRoomId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onClickCheckOutButton: PropTypes.func.isRequired,
  isRoomsClicked: PropTypes.bool,
  isNoTaskGridVisible: PropTypes.bool,
  screenLayout: PropTypes.string,
};

export default Encounter;
