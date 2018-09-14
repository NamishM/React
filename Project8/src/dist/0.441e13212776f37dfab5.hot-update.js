webpackHotUpdate(0,{

/***/ 643:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(644);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants_ActionTypes__ = __webpack_require__(260);



var initialState = {
  errorMessage: '',
  employeeData: []
};

var _default = function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_1__constants_ActionTypes__["b" /* EMPLOYEE_SUCCESS */]:
      return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, state, {
        employeeData: action.employeeData
      });
    case __WEBPACK_IMPORTED_MODULE_1__constants_ActionTypes__["a" /* EMPLOYEE_FAILED */]:
      return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, state, {
        errorMessage: action.errorMessage
      });
    default:
      return state;
  }
};

var _default2 = _default;
/* harmony default export */ __webpack_exports__["a"] = (_default2);
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(initialState, 'initialState', 'D:/New React Location/React/Project8/src/redux/reducer/index.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'D:/New React Location/React/Project8/src/redux/reducer/index.js');

  __REACT_HOT_LOADER__.register(_default2, 'default', 'D:/New React Location/React/Project8/src/redux/reducer/index.js');
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

/***/ 656:
false

})
//# sourceMappingURL=0.441e13212776f37dfab5.hot-update.js.map