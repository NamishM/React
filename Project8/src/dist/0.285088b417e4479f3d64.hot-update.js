webpackHotUpdate(0,{

/***/ 634:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_redux__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_MainViewUI__ = __webpack_require__(635);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_src_redux_actions_EmpAction__ = __webpack_require__(713);




var mapStateToProps = function mapStateToProps(state) {
  return {
    employeeData: state.employeeData
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onNewEmployeeCreation: function onNewEmployeeCreation() {
      dispatch(__WEBPACK_IMPORTED_MODULE_2_src_redux_actions_EmpAction__["d" /* onNewEmployeeCreation */]());
    },
    onEmployeeDeletion: function onEmployeeDeletion(id) {
      dispatch(__WEBPACK_IMPORTED_MODULE_2_src_redux_actions_EmpAction__["c" /* onEmployeeDeletion */](id));
    }
  };
};

var _default = Object(__WEBPACK_IMPORTED_MODULE_0_react_redux__["b" /* connect */])(mapStateToProps, mapDispatchToProps)(__WEBPACK_IMPORTED_MODULE_1__components_MainViewUI__["a" /* default */]);

var _default2 = _default;
/* harmony default export */ __webpack_exports__["a"] = (_default2);
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(mapStateToProps, 'mapStateToProps', 'D:/New React Location/React/Project8/src/modules/containers/MainView.jsx');

  __REACT_HOT_LOADER__.register(mapDispatchToProps, 'mapDispatchToProps', 'D:/New React Location/React/Project8/src/modules/containers/MainView.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'D:/New React Location/React/Project8/src/modules/containers/MainView.jsx');

  __REACT_HOT_LOADER__.register(_default2, 'default', 'D:/New React Location/React/Project8/src/modules/containers/MainView.jsx');
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

/***/ 657:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export delay */
/* unused harmony export bindEmployeeDetails */
/* harmony export (immutable) */ __webpack_exports__["a"] = rootSaga;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__(658);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise__ = __webpack_require__(661);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api__ = __webpack_require__(689);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux_saga_effects__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__actions_EmpAction__ = __webpack_require__(713);



var _marked = /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(bindEmployeeDetails),
    _marked2 = /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(rootSaga);




// import * as types from '../constants/ActionTypes';

var delay = function delay(ms) {
  return new __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a(function (res) {
    return setTimeout(res, ms);
  });
};

function bindEmployeeDetails() {
  var options;
  return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function bindEmployeeDetails$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return Object(__WEBPACK_IMPORTED_MODULE_3_redux_saga_effects__["a" /* call */])(__WEBPACK_IMPORTED_MODULE_2__api__["a" /* getEmpDetails */]);

        case 3:
          options = _context.sent;
          _context.next = 6;
          return Object(__WEBPACK_IMPORTED_MODULE_3_redux_saga_effects__["b" /* put */])(__WEBPACK_IMPORTED_MODULE_4__actions_EmpAction__["b" /* EmployeeSuccess */](options));

        case 6:
          _context.next = 12;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context['catch'](0);
          _context.next = 12;
          return Object(__WEBPACK_IMPORTED_MODULE_3_redux_saga_effects__["b" /* put */])(__WEBPACK_IMPORTED_MODULE_4__actions_EmpAction__["a" /* EmployeeFailed */](_context.t0.message));

        case 12:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this, [[0, 8]]);
}

/*
export function* employeeCreation() {
  try {
    // const options = yield call(getItems);
    // yield put(actions.itemsLoadSuccess(options));
  } catch (e) {
    // yield put(actions.itemsLoadFailed(e.message));
  }
}

export function* watchForEmployeeCreation() {
  yield takeEvery(types.ON_EMP_CREATION, employeeCreation);
}

export function* deleteEmployee(request) {
  try {
    // const options = yield call(getPlanetsItem, request.url);
    // yield put(actions.planetsLoadSuccess(options));
  } catch (e) {
    // yield put(actions.planetsLoadFailed(e.message));
  }
}

export function* watchForEmployeeDeletion() {
  yield takeEvery(types.ON_EMP_DELETION, deleteEmployee);
} */

function rootSaga() {
  return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function rootSaga$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return [bindEmployeeDetails()];

        case 2:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked2, this);
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(delay, 'delay', 'D:/New React Location/React/Project8/src/redux/saga/index.js');

  __REACT_HOT_LOADER__.register(bindEmployeeDetails, 'bindEmployeeDetails', 'D:/New React Location/React/Project8/src/redux/saga/index.js');

  __REACT_HOT_LOADER__.register(rootSaga, 'rootSaga', 'D:/New React Location/React/Project8/src/redux/saga/index.js');
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

/***/ 713:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return EmployeeSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmployeeFailed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return onNewEmployeeCreation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return onEmployeeDeletion; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_ActionTypes__ = __webpack_require__(260);


var EmployeeSuccess = function EmployeeSuccess() {
  return {
    type: __WEBPACK_IMPORTED_MODULE_0__constants_ActionTypes__["b" /* EMPLOYEE_SUCCESS */]
  };
};

var EmployeeFailed = function EmployeeFailed() {
  return {
    type: __WEBPACK_IMPORTED_MODULE_0__constants_ActionTypes__["a" /* EMPLOYEE_FAILED */]
  };
};

var onNewEmployeeCreation = function onNewEmployeeCreation(options) {
  return {
    type: __WEBPACK_IMPORTED_MODULE_0__constants_ActionTypes__["c" /* ON_EMP_CREATION */],
    options: options
  };
};

var onEmployeeDeletion = function onEmployeeDeletion(id) {
  return {
    type: __WEBPACK_IMPORTED_MODULE_0__constants_ActionTypes__["d" /* ON_EMP_DELETION */],
    id: id
  };
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(EmployeeSuccess, 'EmployeeSuccess', 'D:/New React Location/React/Project8/src/redux/actions/EmpAction.js');

  __REACT_HOT_LOADER__.register(EmployeeFailed, 'EmployeeFailed', 'D:/New React Location/React/Project8/src/redux/actions/EmpAction.js');

  __REACT_HOT_LOADER__.register(onNewEmployeeCreation, 'onNewEmployeeCreation', 'D:/New React Location/React/Project8/src/redux/actions/EmpAction.js');

  __REACT_HOT_LOADER__.register(onEmployeeDeletion, 'onEmployeeDeletion', 'D:/New React Location/React/Project8/src/redux/actions/EmpAction.js');
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
//# sourceMappingURL=0.285088b417e4479f3d64.hot-update.js.map