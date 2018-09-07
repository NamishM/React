webpackHotUpdate(2,{

/***/ 668:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getCartItems;
/* unused harmony export bindLoginDetails */
/* unused harmony export watchForLoginRequest */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__(669);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api__ = __webpack_require__(672);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__actions_ItemsAction__ = __webpack_require__(264);


var _marked = /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(getCartItems),
    _marked2 = /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(bindLoginDetails),
    _marked3 = /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(watchForLoginRequest);



// import * as types from '../constants/ActionTypes';


function getCartItems() {
  var options;
  return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function getCartItems$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["a" /* call */])(__WEBPACK_IMPORTED_MODULE_1__api__["a" /* getItems */]);

        case 3:
          options = _context.sent;
          _context.next = 6;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["b" /* put */])(__WEBPACK_IMPORTED_MODULE_3__actions_ItemsAction__["e" /* itemsLoadSuccess */](options));

        case 6:
          _context.next = 12;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context['catch'](0);
          _context.next = 12;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["b" /* put */])(__WEBPACK_IMPORTED_MODULE_3__actions_ItemsAction__["d" /* itemsLoadFailed */](_context.t0.message));

        case 12:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this, [[0, 8]]);
}

function bindLoginDetails() {
  var options;
  return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function bindLoginDetails$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["a" /* call */])(__WEBPACK_IMPORTED_MODULE_1__api__["b" /* getLoginDetails */]);

        case 3:
          options = _context2.sent;
          _context2.next = 6;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["b" /* put */])(__WEBPACK_IMPORTED_MODULE_3__actions_ItemsAction__["b" /* LoginSuccess */](options));

        case 6:
          _context2.next = 12;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2['catch'](0);
          _context2.next = 12;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["b" /* put */])(__WEBPACK_IMPORTED_MODULE_3__actions_ItemsAction__["a" /* LoginFaied */](_context2.t0.message));

        case 12:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked2, this, [[0, 8]]);
}

function watchForLoginRequest() {
  return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function watchForLoginRequest$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["c" /* takeEvery */])('GET_USER_API', bindLoginDetails);

        case 2:
        case 'end':
          return _context3.stop();
      }
    }
  }, _marked3, this);
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(getCartItems, 'getCartItems', 'D:/New React Location/React/Project6/src/redux/saga/index.js');

  __REACT_HOT_LOADER__.register(bindLoginDetails, 'bindLoginDetails', 'D:/New React Location/React/Project6/src/redux/saga/index.js');

  __REACT_HOT_LOADER__.register(watchForLoginRequest, 'watchForLoginRequest', 'D:/New React Location/React/Project6/src/redux/saga/index.js');
}();

;
;

var _temp2 = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;

/***/ }),

/***/ 672:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getItems;
/* harmony export (immutable) */ __webpack_exports__["b"] = getLoginDetails;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_superagent__ = __webpack_require__(673);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_superagent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_superagent__);


function getItems() {
  return __WEBPACK_IMPORTED_MODULE_0_superagent___default.a.get('/items').set('Accept', 'application/json').then(function (resp) {
    return JSON.parse(resp.text).catalog;
  });
}

function getLoginDetails() {
  return __WEBPACK_IMPORTED_MODULE_0_superagent___default.a.get('/login').set('Accept', 'application/json').then(function (resp) {
    return JSON.parse(resp.text).catalog;
  });
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(getItems, 'getItems', 'D:/New React Location/React/Project6/src/redux/api/index.js');

  __REACT_HOT_LOADER__.register(getLoginDetails, 'getLoginDetails', 'D:/New React Location/React/Project6/src/redux/api/index.js');
}();

;
;

var _temp2 = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;

/***/ })

})
//# sourceMappingURL=2.feeb4b18730bfc7ec685.hot-update.js.map