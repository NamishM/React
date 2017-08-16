import PropTypes from 'prop-types';
import React from 'react';

const getRoomInitials = (name) => {
  name = name.replace(/ /g, '').substring(0, 2).toUpperCase();
  return name;
};

const RoomBox = ({
  room,
}) => (
  <div
    className="room"
    style={{
      backgroundColor: room.color,
      cursor: 'default',
    }}
    title={room.label}
  >
    {getRoomInitials(room.label)}
  </div>
);


RoomBox.propTypes = {
  room: PropTypes.shape({
    name: PropTypes.string,
  }),
};

export default RoomBox;
