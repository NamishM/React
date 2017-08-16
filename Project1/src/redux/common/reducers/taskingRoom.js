import { createSelector } from 'reselect';

const getEntityRooms = state => state.entities.rooms;
const getChartBinFilterRooms = state => state.chartBinFilter.rooms;

export const getRooms = createSelector(
  [getChartBinFilterRooms, getEntityRooms],
  (chartBinRooms, rooms) => chartBinRooms
    .filter(room =>
      room.selected && room.value !== -1 && room.visible,
    ).map(room => rooms[room.value]),
);
