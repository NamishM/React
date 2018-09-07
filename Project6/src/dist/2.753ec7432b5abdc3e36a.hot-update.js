webpackHotUpdate(2,{

/***/ 643:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getCartProducts */
/* unused harmony export getPrices */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(644);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__ = __webpack_require__(669);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants_ActionTypes__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reselect__ = __webpack_require__(676);
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
    case __WEBPACK_IMPORTED_MODULE_2__constants_ActionTypes__["f" /* LOGIN_SUCCESS */]:
      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({}, initialState, {
        auth: __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({}, state.auth, {
          loginSuccess: true
        })
      });
    case __WEBPACK_IMPORTED_MODULE_2__constants_ActionTypes__["e" /* LOGIN_FAILED */]:
      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({}, initialState, {
        auth: __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({}, state.auth, {
          loginSuccess: false
        })
      });
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
//# sourceMappingURL=2.753ec7432b5abdc3e36a.hot-update.js.map