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
    return __webpack_require__.e/* import() */(0).then(__webpack_require__.bind(null, 780));
  },
  loading: Loading
});

var App = function App(_ref) {
  var store = _ref.store;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_2_react_redux__["Provider"],
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

/***/ })

})
//# sourceMappingURL=2.75ae09cfad36290edf45.hot-update.js.map