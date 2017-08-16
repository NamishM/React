import PropTypes from 'prop-types';
import React from 'react';
import Carousel from 'nuka-carousel';
import RoomBox from './RoomBox';

const RoomsSliderUI = ({
  rooms = [],
}) => (
  <div>
    {(rooms.length === 0) ?
      <div className="rooms">
        <h4 className="text-info">
          <br />
          No Rooms Available
        </h4>
      </div> :
      <Carousel slidesToScroll={1} slideWidth="40px">
        {
          rooms.map(room => (
            <div
              key={room.value}
              className="rooms"
            >
              <div key={room.label} className="roomContainer">
                <RoomBox
                  room={room}
                />
              </div>
            </div>),
          )
        }
      </Carousel>
    }
  </div>
);


RoomsSliderUI.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
  }).isRequired),
};

export default RoomsSliderUI;
