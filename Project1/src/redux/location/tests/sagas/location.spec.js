
import format from 'date-fns/format';
import {
  _navigateToContext,
  _handleSelectedPatientAndEncounter,
  _handleSelectedDocument,
  _handleSelectedFilters,
  _handleInitialData,
} from '../../sagas';
import {
  setFullScreenMode,
} from '../../actions';
import {
  put,
  call,
  select,
} from 'redux-saga/effects';
import { push } from 'react-router-redux';
import {
  viewTasking,
  viewPatientTracking,
} from '../../../../redux/user/actions';
import {
  clearSelectedChart,
} from '../../../../redux/selectedChart/actions';
import {
  bindInitialDataRequired,
} from '../../../../redux/chartBinFilter/sagas';
import {
  getCurrentLocation,
} from '../../reducers';
import {
  getChartBinFilterUrl,
  getFilters,
} from '../../../../redux/chartBinFilter/reducers/chartBinFilter';
import {
  filterAppointments,
} from '../../../../redux/chartBinFilter/actions';
import {
  getDocumentSelection,
} from '../../../../redux/documentTabs/reducers/documentTabs';
import {
  bindDrawers,
} from '../../../../redux/documentTabsFilter/sagas';
import {
  onSelection,
} from '../../../../redux/documentTabs/actions';
import {
  onSelection as onDocumentSelection,
} from '../../../../redux/documentList/actions';
import {
  getSelectedChartInfo,
} from '../../../../redux/selectedChart/reducers/selectedChart';
import {
  getChart,
  getEncounter,
} from '../../../../redux/selectedChart/sagas';
import {
  startPollingForTasks,
  stopPollingForTasks,
} from '../../../../redux/tasking/actions/taskingActions';

const describe = global.describe;
const it = global.test;

const expect = global.expect;

describe('location sagas', () => {
  describe('_handleSelectedPatientAndEncounter', () => {
    describe('new patient and encounter', () => {
      const payload = {
        pathname: 'patientEncounter',
        query: {
          fullscreen: 'false',
          personId: '3',
          encounterId: 'f8a231b4-bfdb-4323-ba43-7ecf7c391065',
        },
      };
      const gen = _handleSelectedPatientAndEncounter({
        query: payload.query,
      });

      it('should get the currently selected chart and encounter', () => {
        expect(gen.next().value).toEqual(select(getSelectedChartInfo));
      });

      it('should call the getChart saga using the new personId and the getEncounter saga using the new encounter id', () => {
        expect(gen.next({
          currentPersonId: '4',
          currentEncounterId: 'aaaa1b4-bfdb-4323-ba43-7ecf7c391bbb',
        }).value).toEqual([
          call(getChart, { personId: '3' }),
          call(getEncounter, {
            personId: '3',
            encounterId: 'f8a231b4-bfdb-4323-ba43-7ecf7c391065',
          }),
        ]);
      });

      it('should be done', () => {
        expect(gen.next().done).toEqual(true);
      });
    });

    describe('new patient', () => {
      const payload = {
        pathname: 'patientEncounter',
        query: {
          fullscreen: 'false',
          personId: '3',
          encounterId: '',
        },
      };
      const gen = _handleSelectedPatientAndEncounter({
        query: payload.query,
      });

      it('should get the currently selected chart and encounter', () => {
        expect(gen.next().value).toEqual(select(getSelectedChartInfo));
      });

      it('should call the getChart saga using the new personId and the getEncounter saga using the new person id', () => {
        expect(gen.next({
          currentPersonId: '4',
          currentEncounterId: 'aaaa1b4-bfdb-4323-ba43-7ecf7c391bbb',
        }).value).toEqual([
          call(getChart, { personId: '3' }),
          call(getEncounter, { personId: '3' }),
        ]);
      });

      it('should be done', () => {
        expect(gen.next().done).toEqual(true);
      });
    });

    describe('nothing on the URL', () => {
      const payload = {
        pathname: 'patientEncounter',
        query: {
          fullscreen: 'false',
          personId: '',
          encounterId: '',
        },
      };
      const gen = _handleSelectedPatientAndEncounter({
        query: payload.query,
      });

      it('should get the currently selected chart and encounter', () => {
        expect(gen.next().value).toEqual(select(getSelectedChartInfo));
      });

      it('should be done', () => {
        expect(gen.next({
          currentPersonId: '4',
          currentEncounterId: 'aaaa1b4-bfdb-4323-ba43-7ecf7c391bbb',
        }).done).toEqual(true);
      });
    });
  });

  describe('_handleSelectedDocument', () => {
    describe('open new tab and new document', () => {
      const payload = {
        pathname: 'document',
        query: {
          fullscreen: 'false',
          documentGroupId: '3',
          documentId: '4',
        },
      };
      const gen = _handleSelectedDocument({
        query: payload.query,
      });

      it('should get the current document and document group selection', () => {
        expect(gen.next().value).toEqual(select(getDocumentSelection));
      });

      it('should fetch the drawers', () => {
        expect(gen.next({
          selectedTabId: '1',
          selectedDocumentId: '2',
          drawers: [],
        }).value).toEqual(call(bindDrawers));
      });

      it('should select the new documentGroup', () => {
        expect(gen.next().value).toEqual(put(onSelection(3)));
      });

      it('should select the new document', () => {
        expect(gen.next().value).toEqual(put(onDocumentSelection(4)));
      });

      it('should be done', () => {
        expect(gen.next().done).toEqual(true);
      });
    });

    describe('open same tab and document and drawers are loaded', () => {
      const payload = {
        pathname: 'document',
        query: {
          fullscreen: 'false',
          documentGroupId: '3',
          documentId: '4',
        },
      };
      const gen = _handleSelectedDocument({
        query: payload.query,
      });

      it('should get the current document and document group selection', () => {
        expect(gen.next().value).toEqual(select(getDocumentSelection));
      });

      it('should be done', () => {
        expect(gen.next({
          selectedTabId: '3',
          selectedDocumentId: '4',
          drawers: [1, 2, 3],
        }).done).toEqual(true);
      });
    });
  });

  describe('_handleInitialData', () => {
    describe('using defaults', () => {
      const payload = {
        pathname: 'tasking',
        query: {
          fullscreen: 'false',
        },
      };
      const gen = _handleInitialData({ queryFromSession: payload.query });

      it('should get the initial data for filtering where nothing was passed on the URL', () => {
        expect(gen.next().value).toEqual(call(bindInitialDataRequired, {
          providerId: undefined,
          locationId: undefined,
        }));
      });

      it('should be done', () => {
        expect(gen.next().done).toEqual(true);
      });
    });

    describe('using query string filters', () => {
      const payload = {
        pathname: 'tasking',
        query: {
          fullscreen: 'false',
          providerId: '1,3',
          locationId: '4,5',
          encounterDate: '2007-01-01',
        },
      };
      const gen = _handleInitialData({ queryFromSession: payload.query });

      it('should get the initial data for filtering where nothing was passed on the URL', () => {
        expect(gen.next().value).toEqual(call(bindInitialDataRequired, {
          providerId: '1,3',
          locationId: '4,5',
        }));
      });

      it('should be done', () => {
        expect(gen.next().done).toEqual(true);
      });
    });
  });

  describe('_handleSelectedFilters', () => {
    describe('navigate using user\'s defaults', () => {
      const payload = {
        pathname: 'tasking',
        query: {
          fullscreen: 'false',
        },
      };
      const gen = _handleSelectedFilters({
        queryFromSession: payload.query,
      });

      it('should get current URL path from the store', () => {
        expect(gen.next().value).toEqual(select(getCurrentLocation));
      });

      it('should get the current chartbin filter URL', () => {
        expect(gen.next('tasking').value).toEqual(select(getChartBinFilterUrl));
      });

      it('should navigate to the new filter URL', () => {
        expect(gen.next(
          '?encounterDate=&roomId=&locationId=&providerId=&fullscreen=',
        ).value).toEqual(put(push({
          pathname: 'tasking',
          search: '?encounterDate=&roomId=&locationId=&providerId=&fullscreen=',
        })));
      });

      it('should be done', () => {
        const next = gen.next();
        expect(next.done).toEqual(true);
        expect(next.value).toEqual(false);
      });
    });

    describe('filter based on URL values', () => {
      const payload = {
        pathname: 'tasking',
        query: {
          fullscreen: 'false',
          providerId: '1,3',
          locationId: '4,5',
          encounterDate: '2007-01-01',
        },
      };

      const gen = _handleSelectedFilters({
        queryFromSession: payload.query,
      });

      it('should get the available filters', () => {
        expect(gen.next().value).toEqual(select(getFilters));
      });

      it('should set the filters based on the URL parameters', () => {
        expect(gen.next({
          providers: [
            { value: '1' },
            { value: '2' },
            { value: '3' },
          ],
          locations: [
            { value: '4' },
            { value: '5' },
            { value: '6' },
          ],
          rooms: [],
          patientStatusTypes: [],
          selectedDate: [],
        }).value).toEqual(put(filterAppointments(
          [
            { value: '1', selected: true },
            { value: '3', selected: true },
          ],
          [
            { value: '4', selected: true },
            { value: '5', selected: true },
          ],
          [],
          [],
          format('2007-01-01', 'YYYY-MM-DD'),
        )));
      });

      it('should be done', () => {
        const next = gen.next();
        expect(next.done).toEqual(true);
        expect(next.value).toEqual(true);
      });
    });
  });

  describe('_navigateToContext', () => {
    describe('document path', () => {
      const payload = {
        pathname: 'document',
        query: {
          fullscreen: 'false',
        },
      };
      const gen = _navigateToContext({
        payload,
      });

      it('should set the value for fullscreen mode in state', () => {
        expect(gen.next().value).toEqual(put(setFullScreenMode({ isFullScreenMode: 'false' })));
      });

      it('should get the universal data for the app', () => {
        expect(gen.next().value).toEqual(call(_handleInitialData,
          { queryFromSession: payload.query }));
      });

      it('should stop polling for tasks', () => {
        expect(gen.next().value).toEqual(put(stopPollingForTasks()));
      });

      it('should handle the requested patient & encounter', () => {
        expect(gen.next().value).toEqual(
          call(_handleSelectedPatientAndEncounter, { query: payload.query }),
        );
      });

      it('should handle the requested document', () => {
        const lastIteration = gen.next();
        expect(lastIteration.value).toEqual(
          call(_handleSelectedDocument, { query: payload.query }),
        );
      });

      it('should be done', () => {
        expect(gen.next().done).toEqual(true);
      });
    });

    describe('patientEncounter path', () => {
      const payload = {
        pathname: 'patientEncounter',
        query: {
          fullscreen: 'false',
        },
      };
      const gen = _navigateToContext({
        payload,
      });

      it('should set the value for fullscreen mode in state', () => {
        expect(gen.next().value).toEqual(put(setFullScreenMode({ isFullScreenMode: 'false' })));
      });

      it('should get the universal data for the app', () => {
        expect(gen.next().value).toEqual(call(_handleInitialData,
          { queryFromSession: payload.query }));
      });

      it('should stop polling for tasks', () => {
        expect(gen.next().value).toEqual(put(stopPollingForTasks()));
      });

      it('should handle the requested patient & encounter', () => {
        expect(gen.next().value).toEqual(
          call(_handleSelectedPatientAndEncounter, { query: payload.query }),
        );
      });

      it('should be done', () => {
        expect(gen.next().done).toEqual(true);
      });
    });

    describe('tasking path', () => {
      const payload = {
        pathname: 'tasking',
        query: {
          fullscreen: 'false',
        },
      };
      const gen = _navigateToContext({
        payload,
      });

      it('should set the value for fullscreen mode in state', () => {
        expect(gen.next().value).toEqual(put(setFullScreenMode({ isFullScreenMode: 'false' })));
      });

      it('should get the universal data for the app', () => {
        expect(gen.next().value).toEqual(call(_handleInitialData,
          { queryFromSession: payload.query }));
      });

      it('should stop polling for tasks', () => {
        expect(gen.next().value).toEqual(put(stopPollingForTasks()));
      });

      it('should clear the chart', () => {
        expect(gen.next().value).toEqual(
          put(clearSelectedChart()),
        );
      });

      it('should handle the requested filters', () => {
        expect(gen.next().value).toEqual(
          call(_handleSelectedFilters, { queryFromSession: payload.query }),
        );
      });

      it('should call view tasking', () => {
        expect(gen.next(true).value).toEqual(
          put(viewTasking()),
        );
      });

      it('should start polling for tasks', () => {
        expect(gen.next().value).toEqual(put(startPollingForTasks()));
      });

      it('should be done', () => {
        expect(gen.next().done).toEqual(true);
      });
    });

    describe('desktop path', () => {
      const payload = {
        pathname: 'desktop',
        query: {
          fullscreen: 'false',
        },
      };
      const gen = _navigateToContext({
        payload,
      });

      it('should set the value for fullscreen mode in state', () => {
        expect(gen.next().value).toEqual(put(setFullScreenMode({ isFullScreenMode: 'false' })));
      });

      it('should get the universal data for the app', () => {
        expect(gen.next().value).toEqual(call(_handleInitialData,
          { queryFromSession: payload.query }));
      });

      it('should stop polling for tasks', () => {
        expect(gen.next().value).toEqual(put(stopPollingForTasks()));
      });

      it('should clear the chart', () => {
        expect(gen.next().value).toEqual(
          put(clearSelectedChart()),
        );
      });

      it('should handle the requested filters', () => {
        expect(gen.next().value).toEqual(
          call(_handleSelectedFilters, { queryFromSession: payload.query }),
        );
      });

      it('should call view tasking', () => {
        expect(gen.next(true).value).toEqual(
          put(viewPatientTracking()),
        );
      });

      it('should be done', () => {
        expect(gen.next().done).toEqual(true);
      });
    });
  });
});
