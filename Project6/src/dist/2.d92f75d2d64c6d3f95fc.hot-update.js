webpackHotUpdate(2,{

/***/ 239:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ITEMS_LOAD_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ITEMS_LOAD_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return SET_ITEM_ADDED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return ITEM_REMOVED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GET_USER_API; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return LOGIN_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return LOGIN_FAILED; });
var ITEMS_LOAD_SUCCESS = 'ITEMS_LOAD_SUCCESS';
var ITEMS_LOAD_FAILED = 'ITEMS_LOAD_FAILED';
var SET_ITEM_ADDED = 'SET_ITEM_ADDED';
var ITEM_REMOVED = 'ITEM_REMOVED';

var GET_USER_API = 'GET_USER_API';
var LOGIN_SUCCESS = 'LOGIN_SUCCESS';
var LOGIN_FAILED = 'LOGIN_FAILED';
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(ITEMS_LOAD_SUCCESS, 'ITEMS_LOAD_SUCCESS', 'D:/New React Location/React/Project6/src/redux/constants/ActionTypes.js');

  __REACT_HOT_LOADER__.register(ITEMS_LOAD_FAILED, 'ITEMS_LOAD_FAILED', 'D:/New React Location/React/Project6/src/redux/constants/ActionTypes.js');

  __REACT_HOT_LOADER__.register(SET_ITEM_ADDED, 'SET_ITEM_ADDED', 'D:/New React Location/React/Project6/src/redux/constants/ActionTypes.js');

  __REACT_HOT_LOADER__.register(ITEM_REMOVED, 'ITEM_REMOVED', 'D:/New React Location/React/Project6/src/redux/constants/ActionTypes.js');

  __REACT_HOT_LOADER__.register(GET_USER_API, 'GET_USER_API', 'D:/New React Location/React/Project6/src/redux/constants/ActionTypes.js');

  __REACT_HOT_LOADER__.register(LOGIN_SUCCESS, 'LOGIN_SUCCESS', 'D:/New React Location/React/Project6/src/redux/constants/ActionTypes.js');

  __REACT_HOT_LOADER__.register(LOGIN_FAILED, 'LOGIN_FAILED', 'D:/New React Location/React/Project6/src/redux/constants/ActionTypes.js');
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

/***/ 264:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return checkCredentials; });
/* unused harmony export LoginSuccess */
/* unused harmony export LoginFaied */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return itemsLoadSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return itemsLoadFailed; });
/* unused harmony export setItemAdded */
/* unused harmony export removeItem */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_ActionTypes__ = __webpack_require__(239);


var checkCredentials = function checkCredentials() {
  return {
    type: __WEBPACK_IMPORTED_MODULE_0__constants_ActionTypes__["a" /* GET_USER_API */]
  };
};

var LoginSuccess = function LoginSuccess(options) {
  return {
    type: __WEBPACK_IMPORTED_MODULE_0__constants_ActionTypes__["f" /* LOGIN_SUCCESS */]
  };
};

var LoginFaied = function LoginFaied(options) {
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

/***/ }),

/***/ 634:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getCartProducts */
/* unused harmony export getPrices */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(635);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__ = __webpack_require__(660);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants_ActionTypes__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reselect__ = __webpack_require__(667);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reselect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_reselect__);





var initialState = {
  auth: {
    loginSuccess: null
  },
  errorMessage: '',
  results: [],
  addedItemIds: []
};

var reduceItemsId = function reduceItemsId(arr, id) {
  var newArray = arr.slice();
  var index = newArray.indexOf(id);
  if (index >= 0) {
    newArray.splice(index, 1);
  }
  return newArray;
};

var _default = function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_2__constants_ActionTypes__["c" /* ITEMS_LOAD_SUCCESS */]:
      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({}, state, {
        results: action.options
      });
    case __WEBPACK_IMPORTED_MODULE_2__constants_ActionTypes__["b" /* ITEMS_LOAD_FAILED */]:
      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({}, initialState, {
        errorMessage: action.errorMessage
      });
    case __WEBPACK_IMPORTED_MODULE_2__constants_ActionTypes__["g" /* SET_ITEM_ADDED */]:
      {
        var itemId = action.itemId;

        return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({}, state, {
          addedItemIds: [].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(state.addedItemIds), [itemId])
        });
      }
    case __WEBPACK_IMPORTED_MODULE_2__constants_ActionTypes__["d" /* ITEM_REMOVED */]:
      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({}, state, {
        removedItemId: action.itemId,
        addedItemIds: reduceItemsId(state.addedItemIds, action.itemId)
      });
    default:
      return state;
  }
};

var _default2 = _default;
/* harmony default export */ __webpack_exports__["a"] = (_default2);

var getItemsList = function getItemsList(state) {
  return state.results || [];
};

var getCartProducts = Object(__WEBPACK_IMPORTED_MODULE_3_reselect__["createSelector"])([getItemsList], function (itemsList) {
  var cartItems = [itemsList];
  return cartItems;
});

var getPrices = function getPrices(cartItems) {
  var priceList = [];
  cartItems.map(function (item) {
    return priceList.push(item.price);
  });
  return priceList;
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(initialState, 'initialState', 'D:/New React Location/React/Project6/src/redux/reducer/index.js');

  __REACT_HOT_LOADER__.register(reduceItemsId, 'reduceItemsId', 'D:/New React Location/React/Project6/src/redux/reducer/index.js');

  __REACT_HOT_LOADER__.register(getItemsList, 'getItemsList', 'D:/New React Location/React/Project6/src/redux/reducer/index.js');

  __REACT_HOT_LOADER__.register(getCartProducts, 'getCartProducts', 'D:/New React Location/React/Project6/src/redux/reducer/index.js');

  __REACT_HOT_LOADER__.register(getPrices, 'getPrices', 'D:/New React Location/React/Project6/src/redux/reducer/index.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'D:/New React Location/React/Project6/src/redux/reducer/index.js');

  __REACT_HOT_LOADER__.register(_default2, 'default', 'D:/New React Location/React/Project6/src/redux/reducer/index.js');
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
//# sourceMappingURL=2.d92f75d2d64c6d3f95fc.hot-update.js.map