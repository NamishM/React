import App from './containers/App';
// import { loadProviders } from 'srs/redux/tasking/actions/providerActions';
// import { loadPatients } from 'srs/redux/tasking/actions/patientActions';
// import { loadRooms } from 'srs/redux/tasking/actions/roomActions';
// import { initializeMockData } from 'srs/redux/tasking/reducers/helpers/mockedDataRepo.js';

// initializeMockData();

const composite = Object.assign({ App });

// const composite = Object.assign({ App }, {
//  init: (store) => {
//    store.dispatch(loadProviders());
//    store.dispatch(loadPatients());
//    store.dispatch(loadRooms());
//  },
// });

export default composite;

// TODO extra calling loadProviders,loadPatients, loadRooms will be removed.
