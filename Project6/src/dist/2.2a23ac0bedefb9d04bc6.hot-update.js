webpackHotUpdate(2,{

/***/ 681:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getItems;
/* harmony export (immutable) */ __webpack_exports__["b"] = getLoginDetails;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_superagent__ = __webpack_require__(682);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_superagent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_superagent__);


function getItems() {
  return __WEBPACK_IMPORTED_MODULE_0_superagent___default.a.get('/items').set('Accept', 'application/json').then(function (resp) {
    return JSON.parse(resp.text).catalog;
  });
}

function getLoginDetails() {
  return __WEBPACK_IMPORTED_MODULE_0_superagent___default.a.get('/login').set('Accept', 'application/json').then(function (resp) {
    return JSON.parse(resp.text).login;
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
//# sourceMappingURL=2.2a23ac0bedefb9d04bc6.hot-update.js.map