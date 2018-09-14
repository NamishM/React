webpackHotUpdate(0,{

/***/ 689:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = getEmpDetails;
/* harmony export (immutable) */ __webpack_exports__["a"] = createEmpDetails;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_superagent__ = __webpack_require__(690);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_superagent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_superagent__);


function getEmpDetails() {
  return __WEBPACK_IMPORTED_MODULE_0_superagent___default.a.get('/graphql').query({ query: '{empName, empAge, empSalary}' }).set('Accept', 'application/json').then(function (resp) {
    return JSON.parse(resp.text).data.login;
  });
}

function createEmpDetails() {
  // const empName = 'request.empName';
  // const empAge = 12;
  // const empSalary = 100;
  var query = 'query SetData($empName: String, $empAge: Int, $empSalary: Int) {\n    setData(empName: $empName, empAge: $empAge, empSalary: $empSalary)\n  }';
  return __WEBPACK_IMPORTED_MODULE_0_superagent___default.a.post('/graphql').set({
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }).query({ query: query
  }).set('Accept', 'application/json').then(function (resp) {
    return JSON.parse(resp.text).data.login;
  });
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(getEmpDetails, 'getEmpDetails', 'D:/New React Location/React/Project8/src/redux/api/index.js');

  __REACT_HOT_LOADER__.register(createEmpDetails, 'createEmpDetails', 'D:/New React Location/React/Project8/src/redux/api/index.js');
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
//# sourceMappingURL=0.bc11269c70b9dd5c8af1.hot-update.js.map