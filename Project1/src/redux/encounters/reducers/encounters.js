import { filterJoin } from '../../../common/utilities';
import { createSelector } from 'reselect';

const getEncounterId = state => state.selectedChart.encounterId;
const getEncounterIds = state => state.encounters.results;
const getDemographics = state => state.entities.demographics;
const getAppointments = state => state.entities.appointments;
const getRooms = state => state.entities.rooms;
const getSort = state => state.encounters.sort;

export const getDenormalizedAppointments = createSelector(
  [
    getEncounterId,
    getEncounterIds,
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
