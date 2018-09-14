webpackHotUpdate(0,{

/***/ 635:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);



var MainViewUI = function MainViewUI(_ref) {
  var onNewEmployeeCreation = _ref.onNewEmployeeCreation,
      onEmployeeDeletion = _ref.onEmployeeDeletion,
      employeeData = _ref.employeeData;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    {
      className: 'main_view'
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'table',
      null,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'thead',
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'tr',
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'th',
            null,
            'EmpID'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'th',
            null,
            'Name'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'th',
            null,
            'Age'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'th',
            null,
            'Salary'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('th', null)
        )
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'tbody',
        null,
        employeeData && employeeData.length > 0 ? employeeData.map(function (emp) {
          return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'tr',
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'td',
              null,
              'emp.empId'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'td',
              null,
              'emp.name'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'td',
              null,
              'emp.age'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'td',
              null,
              'emp.salary'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'td',
              null,
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'button',
                {
                  onClick: onEmployeeDeletion(emp.empId)
                },
                '-Remove'
              )
            )
          );
        }) : null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'tr',
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'td',
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'text' })
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'td',
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'text' })
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'td',
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'text' })
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'td',
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'text' })
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'td',
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'button',
              {
                onClick: onNewEmployeeCreation()
              },
              '+Add'
            )
          )
        )
      )
    )
  );
};

MainViewUI.propTypes = {
  onNewEmployeeCreation: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  onEmployeeDeletion: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  employeeData: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired
};

var _default = MainViewUI;
var _default2 = _default;
/* harmony default export */ __webpack_exports__["a"] = (_default2);
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(MainViewUI, 'MainViewUI', 'D:/New React Location/React/Project8/src/modules/components/MainViewUI.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'D:/New React Location/React/Project8/src/modules/components/MainViewUI.jsx');

  __REACT_HOT_LOADER__.register(_default2, 'default', 'D:/New React Location/React/Project8/src/modules/components/MainViewUI.jsx');
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
//# sourceMappingURL=0.812d073207ed28572e87.hot-update.js.map