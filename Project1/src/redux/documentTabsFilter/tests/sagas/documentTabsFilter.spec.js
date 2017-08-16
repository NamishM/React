
import * as actions from '../../actions';
import { call, put, take } from 'redux-saga/effects';
import { getDrawers } from '../../api';
import { bindDrawers, watchResetRequested } from '../../sagas';
import * as types from '../../constants/ActionTypes';

const describe = global.describe;
const it = global.test;

const expect = global.expect;

const drawers = [
  {
    drawerId: '32',
    drawerName: 'Chart Notes',
  },
  {
    drawerId: '11',
    drawerName: 'Nurse Notes',
  },
  {
    drawerId: '89',
    drawerName: 'Tests',
  },
];

describe('documentTabsFilter sagas', () => {
  describe('bindDrawers', () => {
    it(`should call our getDrawers API.
      When successful, it should then call the success action`, () => {
        const generator = bindDrawers();

        // move to the first yield statement
        let next = generator.next();

        // First we should get all drawers
        expect(next.value).toEqual(call(getDrawers));

        // Mock setting the value to skip the API call
        next = generator.next(drawers);

        // Second we should be calling getDrawersSucceeded
        expect(next.value).toEqual(put(actions.getDrawersSucceeded(drawers)));
      });

    it(`should call our getDrawers API.
      When it fails, it should call the failure action`, () => {
        const generator = bindDrawers();
        const msg = 'Not Found';

        // move to the first yield statement
        let next = generator.next();

        // First we should get all Providers
        expect(next.value).toEqual(call(getDrawers));

        // raise the exception manually
        next = generator.throw(new Error(msg));

        // Second, we should be calling our failure action
        expect(next.value).toEqual(put(actions.getDrawersFailed(msg)));
      });
  });
});

describe('documentTabsFilter sagas', () => {
  describe('watchResetRequested', () => {
    it(`should call our getDrawers API.
      When successful, it should then call the success action`, () => {
        const generator = watchResetRequested();

        // move to the first yield statement
        let next = generator.next();

        // wait for an action to raise
        expect(next.value).toEqual(take([types.DOCUMENTTABS_FILTER_RESET_DEFAULT]));

        // Mock setting the select criteria.
        next = generator.next({
          type: types.DOCUMENTTABS_FILTER_RESET_DEFAULT,
        });

        // First we should bind all drawers
        expect(next.value).toEqual(call(bindDrawers));

        // move to the first yield statement
        next = generator.next();

        // Second we should be calling resetGridsData
        expect(next.value).toEqual(put(actions.resetGridsData()));
      });
  });
});
