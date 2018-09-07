webpackHotUpdate(2,{

/***/ 142:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_router__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__browserHistory__ = __webpack_require__(618);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_router_redux__ = __webpack_require__(623);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_loadable__ = __webpack_require__(627);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_loadable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_loadable__);








var ErrorPage = function ErrorPage() {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'h1',
    null,
    '400.. Bad Error!'
  ) // eslint-disable-line
  ;
};

var Loading = function Loading() {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    null,
    'Loading...'
  );
};

var MainView = __WEBPACK_IMPORTED_MODULE_6_react_loadable___default()({
  loader: function loader() {
    return __webpack_require__.e/* import() */(1).then(__webpack_require__.bind(null, 696));
  },
  loading: Loading
});

var Login = __WEBPACK_IMPORTED_MODULE_6_react_loadable___default()({
  loader: function loader() {
    return __webpack_require__.e/* import() */(0).then(__webpack_require__.bind(null, 697));
  },
  loading: Loading
});

var App = function App(_ref) {
  var store = _ref.store;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_2_react_redux__["a" /* Provider */],
    { store: store },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_5_react_router_redux__["a" /* ConnectedRouter */],
      { history: __WEBPACK_IMPORTED_MODULE_4__browserHistory__["a" /* default */] },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_3_react_router__["d" /* Switch */],
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_router__["b" /* Route */], { path: '/error', component: ErrorPage }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_router__["b" /* Route */], { path: '/', component: Login }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_router__["b" /* Route */], { path: '/main', component: MainView }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_router__["b" /* Route */], { path: '*', render: function render() {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_router__["a" /* Redirect */], { to: '/notfound' });
          } })
      )
    )
  );
};

App.propTypes = {
  store: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape()
};

var _default = App;
var _default2 = _default;
/* harmony default export */ __webpack_exports__["default"] = (_default2);
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(ErrorPage, 'ErrorPage', 'D:/New React Location/React/Project6/src/router/main.router.js');

  __REACT_HOT_LOADER__.register(Loading, 'Loading', 'D:/New React Location/React/Project6/src/router/main.router.js');

  __REACT_HOT_LOADER__.register(MainView, 'MainView', 'D:/New React Location/React/Project6/src/router/main.router.js');

  __REACT_HOT_LOADER__.register(Login, 'Login', 'D:/New React Location/React/Project6/src/router/main.router.js');

  __REACT_HOT_LOADER__.register(App, 'App', 'D:/New React Location/React/Project6/src/router/main.router.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'D:/New React Location/React/Project6/src/router/main.router.js');

  __REACT_HOT_LOADER__.register(_default2, 'default', 'D:/New React Location/React/Project6/src/router/main.router.js');
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

/***/ 239:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CALL_HISTORY_METHOD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return push; });
/* unused harmony export replace */
/* unused harmony export go */
/* unused harmony export goBack */
/* unused harmony export goForward */
/* unused harmony export routerActions */

/**
 * This action type will be dispatched by the history actions below.
 * If you're writing a middleware to watch for navigation events, be sure to
 * look for actions of this type.
 */
var CALL_HISTORY_METHOD = '@@router/CALL_HISTORY_METHOD';

function updateLocation(method) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return {
      type: CALL_HISTORY_METHOD,
      payload: { method: method, args: args }
    };
  };
}

/**
 * These actions correspond to the history API.
 * The associated routerMiddleware will capture these events before they get to
 * your reducer and reissue them as the matching function on your history.
 */
var push = updateLocation('push');
var replace = updateLocation('replace');
var go = updateLocation('go');
var goBack = updateLocation('goBack');
var goForward = updateLocation('goForward');

var routerActions = { push: push, replace: replace, go: go, goBack: goBack, goForward: goForward };

/***/ }),

/***/ 623:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ConnectedRouter__ = __webpack_require__(624);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__ConnectedRouter__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__selectors__ = __webpack_require__(625);
/* unused harmony reexport getLocation */
/* unused harmony reexport createMatchSelector */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__reducer__ = __webpack_require__(238);
/* unused harmony reexport LOCATION_CHANGE */
/* unused harmony reexport routerReducer */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__actions__ = __webpack_require__(239);
/* unused harmony reexport CALL_HISTORY_METHOD */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_3__actions__["b"]; });
/* unused harmony reexport replace */
/* unused harmony reexport go */
/* unused harmony reexport goBack */
/* unused harmony reexport goForward */
/* unused harmony reexport routerActions */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__middleware__ = __webpack_require__(626);
/* unused harmony reexport routerMiddleware */









/***/ }),

/***/ 626:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions__ = __webpack_require__(239);


/**
 * This middleware captures CALL_HISTORY_METHOD actions to redirect to the
 * provided history object. This will prevent these actions from reaching your
 * reducer or any middleware that comes after this one.
 */
function routerMiddleware(history) {
  return function () {
    return function (next) {
      return function (action) {
        if (action.type !== __WEBPACK_IMPORTED_MODULE_0__actions__["a" /* CALL_HISTORY_METHOD */]) {
          return next(action);
        }

        var _action$payload = action.payload,
            method = _action$payload.method,
            args = _action$payload.args;

        history[method].apply(history, args);
      };
    };
  };
}

/***/ }),

/***/ 677:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getCartItems */
/* unused harmony export bindLoginDetails */
/* unused harmony export watchForLoginRequest */
/* harmony export (immutable) */ __webpack_exports__["a"] = rootSaga;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__(678);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api__ = __webpack_require__(681);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__ = __webpack_require__(248);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_router_redux__ = __webpack_require__(623);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__actions_ItemsAction__ = __webpack_require__(264);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__constants_ActionTypes__ = __webpack_require__(150);


var _marked = /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(getCartItems),
    _marked2 = /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(bindLoginDetails),
    _marked3 = /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(watchForLoginRequest),
    _marked4 = /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(rootSaga);







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
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["b" /* put */])(__WEBPACK_IMPORTED_MODULE_4__actions_ItemsAction__["e" /* itemsLoadSuccess */](options));

        case 6:
          _context.next = 12;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context['catch'](0);
          _context.next = 12;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["b" /* put */])(__WEBPACK_IMPORTED_MODULE_4__actions_ItemsAction__["d" /* itemsLoadFailed */](_context.t0.message));

        case 12:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this, [[0, 8]]);
}

function bindLoginDetails(request) {
  var options, bool, pathname;
  return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function bindLoginDetails$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["a" /* call */])(__WEBPACK_IMPORTED_MODULE_1__api__["b" /* getLoginDetails */]);

        case 3:
          options = _context2.sent;
          bool = options.some(function (obj) {
            return obj.name.toLowerCase() === request.username.toLowerCase() && obj.password === request.password;
          });

          if (!bool) {
            _context2.next = 13;
            break;
          }

          _context2.next = 8;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["b" /* put */])(__WEBPACK_IMPORTED_MODULE_4__actions_ItemsAction__["b" /* LoginSuccess */](options));

        case 8:
          pathname = '\main';
          _context2.next = 11;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["b" /* put */])(Object(__WEBPACK_IMPORTED_MODULE_3_react_router_redux__["b" /* push */])({
            pathname: pathname
          }));

        case 11:
          _context2.next = 15;
          break;

        case 13:
          _context2.next = 15;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["b" /* put */])(__WEBPACK_IMPORTED_MODULE_4__actions_ItemsAction__["a" /* LoginFaied */]('credentials missmatch'));

        case 15:
          _context2.next = 21;
          break;

        case 17:
          _context2.prev = 17;
          _context2.t0 = _context2['catch'](0);
          _context2.next = 21;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["b" /* put */])(__WEBPACK_IMPORTED_MODULE_4__actions_ItemsAction__["a" /* LoginFaied */](_context2.t0.message));

        case 21:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked2, this, [[0, 17]]);
}

function watchForLoginRequest() {
  return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function watchForLoginRequest$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["c" /* takeEvery */])(__WEBPACK_IMPORTED_MODULE_5__constants_ActionTypes__["a" /* GET_USER_API */], bindLoginDetails);

        case 2:
        case 'end':
          return _context3.stop();
      }
    }
  }, _marked3, this);
}

function rootSaga() {
  return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function rootSaga$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return [watchForLoginRequest(), getCartItems()];

        case 2:
        case 'end':
          return _context4.stop();
      }
    }
  }, _marked4, this);
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(getCartItems, 'getCartItems', 'D:/New React Location/React/Project6/src/redux/saga/index.js');

  __REACT_HOT_LOADER__.register(bindLoginDetails, 'bindLoginDetails', 'D:/New React Location/React/Project6/src/redux/saga/index.js');

  __REACT_HOT_LOADER__.register(watchForLoginRequest, 'watchForLoginRequest', 'D:/New React Location/React/Project6/src/redux/saga/index.js');

  __REACT_HOT_LOADER__.register(rootSaga, 'rootSaga', 'D:/New React Location/React/Project6/src/redux/saga/index.js');
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
//# sourceMappingURL=2.ea6e4333f27776e89c6f.hot-update.js.map