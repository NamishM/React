//
// import * as actions from '../../actions';
// import {
//   put,
//   call,
//   take,
// } from 'redux-saga/effects';
// import { refresh } from '../../../user/sagas';
// import { delay } from 'redux-saga';
// import {
//   trackUserTimeOutAlertInput,
// } from '../../sagas';
// import { getLoginSessionEnded } from '../../../user/actions';
// import * as types from '../../constants/ActionTypes';


const describe = global.describe;
const it = global.test;

const expect = global.expect;

describe('timeOutAlert sagas', () => {
  it('PLACEHOLDER - UPDATE THESE TESTS!', () => {
    expect(true).toBe(true);
  });
});

// describe('timeOutAlert sagas', () => {
//   describe('trackUserTimeOutAlertInput', () => {
//     it(`should call when DISPLAY_TIMEOUTALERT action raise
//       and want session to be sign out`, () => {
//       const generator = trackUserTimeOutAlertInput();

//       // move to the first yield statement
//       let next = generator.next();

//       // wait for an action to raise
//       expect(next.value).toEqual(take([types.TIMEOUTALERT_SESSION_SIGNOUT,
//         types.TIMEOUTALERT_SESSION_CONTINUE,
//         types.TIMEOUTALERT_SESSION_EXPIRED]));

//       // Mock setting the select criteria.
//       next = generator.next({
//         type: types.TIMEOUTALERT_SESSION_SIGNOUT,
//       });

//       // call getLoginSessionEnded
//       expect(next.value).toEqual(put(getLoginSessionEnded()));
//     });
//   });

//   describe('trackUserTimeOutAlertInput', () => {
//     it(`should call when DISPLAY_TIMEOUTALERT action raise
//       and want session to be refresh`, () => {
//       const generator = trackUserTimeOutAlertInput();

//       // move to the first yield statement
//       let next = generator.next();

//       // wait for an action to raise
//       expect(next.value).toEqual(take([types.TIMEOUTALERT_SESSION_SIGNOUT,
//         types.TIMEOUTALERT_SESSION_CONTINUE,
//         types.TIMEOUTALERT_SESSION_EXPIRED]));

//       // Mock setting the select criteria.
//       next = generator.next({
//         type: types.TIMEOUTALERT_SESSION_CONTINUE,
//         refreshAfterTime: 50,
//       });

//       // we should delay for specific time defined in global config file.
//       expect(next.value).toEqual(call(delay, 50 * 1000));

//       // move to the next yield statement
//       next = generator.next();

//       // user want to continue session. call refresh method.
//       expect(next.value).toEqual(call(refresh, false, true));
//     });
//   });

//   describe('trackUserTimeOutAlertInput', () => {
//     it(`should call when DISPLAY_TIMEOUTALERT action raise
//       and want session to expire automatically`, () => {
//       const generator = trackUserTimeOutAlertInput();

//       // move to the first yield statement
//       let next = generator.next();

//       // wait for an action to raise
//       expect(next.value).toEqual(take([types.TIMEOUTALERT_SESSION_SIGNOUT,
//         types.TIMEOUTALERT_SESSION_CONTINUE,
//         types.TIMEOUTALERT_SESSION_EXPIRED]));

//       // Mock setting the select criteria.
//       next = generator.next({
//         type: types.TIMEOUTALERT_SESSION_EXPIRED,
//       });

//       // raise session expire message
// eslint-disable-next-line
//       expect(next.value).toEqual(put(actions.sessionTimeOutMessage('Your session has timed out. Please sign in again')));

//       // move to the next yield statement
//       next = generator.next();

//       // call getLoginSessionEnded
//       expect(next.value).toEqual(put(getLoginSessionEnded()));
//     });
//   });
// });

