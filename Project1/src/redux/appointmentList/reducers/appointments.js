import { filterJoin } from '../../../common/utilities';
import { createSelector } from 'reselect';

export const getRoomDescription = (rooms = [], roomId = 0) => {
  if (rooms.length > 0 && roomId > 0) {
    return rooms.find(room => room.value === roomId).label;
  }
  return null;
};

const getEncounterId = state => state.selectedChart.encounterId;
const getAppointmentIds = state => state.appointments.results;
const getDemographics = state => state.entities.demographics;
const getAppointments = state => state.entities.appointments;
const getRooms = state => state.entities.rooms;
const getSort = state => state.appointments.sort;

export const getDenormalizedAppointments = createSelector(
  [
    getEncounterId,
    getAppointmentIds,
    getDemographics,
    getAppointments,
    getRooms,
  ],
  (
    encounterId,
    ids,
    demographics,
    appointments,
    rooms,
  ) => ids.map(id => ({
    name: filterJoin(', ',
      demographics[
        appointments[id].patientDemographics
      ].lastName,
      demographics[
        appointments[id].patientDemographics
      ].firstName,
    ),
    id,
    visitType: appointments[id].reasonCode,
    time: appointments[id].personDeskDate,
    personId: appointments[id].personId,
    dob: demographics[
      appointments[id].patientDemographics
    ].birthDate,
    isSelected: encounterId === id,
    colorCode: appointments[id].color,
    roomDescription: rooms[appointments[id].roomId] ?
      rooms[appointments[id].roomId].description : null,
    doctorName: appointments[id].doctorName,
  })),
);

export const getSortOrder = createSelector(
  [getSort],
  ({ ids = [], columns = {} }) => ids.map(id =>
    ({ id, ...columns[id] }),
  ),
);
