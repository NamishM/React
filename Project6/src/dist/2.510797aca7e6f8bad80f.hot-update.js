webpackHotUpdate(2,{

/***/ 264:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return checkCredentials; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return LoginSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginFaied; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return itemsLoadSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return itemsLoadFailed; });
/* unused harmony export setItemAdded */
/* unused harmony export removeItem */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_ActionTypes__ = __webpack_require__(150);


var checkCredentials = function checkCredentials(username, password) {
  return {
    type: __WEBPACK_IMPORTED_MODULE_0__constants_ActionTypes__["a" /* GET_USER_API */],
    username: username,
    password: password
  };
};

var LoginSuccess = function LoginSuccess() {
  return {
    type: __WEBPACK_IMPORTED_MODULE_0__constants_ActionTypes__["f" /* LOGIN_SUCCESS */]
  };
};

var LoginFaied = function LoginFaied() {
  return {
    type: __WEBPACK_IMPORTED_MODULE_0__constants_ActionTypes__["e" /* LOGIN_FAILED */]
  };
};

var itemsLoadSuccess = function itemsLoadSuccess(options) {
  return {
    type: __WEBPACK_IMPORTED_MODULE_0__constants_ActionTypes__["c" /* ITEMS_LOAD_SUCCESS */],
    options: options
  };
};

var itemsLoadFailed = function itemsLoadFailed(message) {
  return {
    type: __WEBPACK_IMPORTED_MODULE_0__constants_ActionTypes__["b" /* ITEMS_LOAD_FAILED */],
    message: message
  };
};

var setItemAdded = function setItemAdded(itemId) {
  return {
    type: __WEBPACK_IMPORTED_MODULE_0__constants_ActionTypes__["g" /* SET_ITEM_ADDED */],
    itemId: itemId
  };
};

var removeItem = function removeItem(itemId) {
  return {
    type: __WEBPACK_IMPORTED_MODULE_0__constants_ActionTypes__["d" /* ITEM_REMOVED */],
    itemId: itemId
  };
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(checkCredentials, 'checkCredentials', 'D:/New React Location/React/Project6/src/redux/actions/ItemsAction.js');

  __REACT_HOT_LOADER__.register(LoginSuccess, 'LoginSuccess', 'D:/New React Location/React/Project6/src/redux/actions/ItemsAction.js');

  __REACT_HOT_LOADER__.register(LoginFaied, 'LoginFaied', 'D:/New React Location/React/Project6/src/redux/actions/ItemsAction.js');

  __REACT_HOT_LOADER__.register(itemsLoadSuccess, 'itemsLoadSuccess', 'D:/New React Location/React/Project6/src/redux/actions/ItemsAction.js');

  __REACT_HOT_LOADER__.register(itemsLoadFailed, 'itemsLoadFailed', 'D:/New React Location/React/Project6/src/redux/actions/ItemsAction.js');

  __REACT_HOT_LOADER__.register(setItemAdded, 'setItemAdded', 'D:/New React Location/React/Project6/src/redux/actions/ItemsAction.js');

  __REACT_HOT_LOADER__.register(removeItem, 'removeItem', 'D:/New React Location/React/Project6/src/redux/actions/ItemsAction.js');
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
//# sourceMappingURL=2.510797aca7e6f8bad80f.hot-update.js.map