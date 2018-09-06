webpackHotUpdate(0,{

/***/ 535:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_src_redux_actions_ItemsAction__ = __webpack_require__(517);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_MainViewUI__ = __webpack_require__(537);





var mapStateToProps = function mapStateToProps(state) {
  return {
    loginSuccess: state.auth.loginSuccess
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onCheckCredentials: function onCheckCredentials(_ref) {
      var credentials = _ref.credentials;
      return dispatch(Object(__WEBPACK_IMPORTED_MODULE_2_src_redux_actions_ItemsAction__["a" /* checkCredentials */])(credentials));
    }
  };
};

var _default = Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["b" /* connect */])(mapStateToProps, mapDispatchToProps)(__WEBPACK_IMPORTED_MODULE_3__components_MainViewUI__["a" /* default */]);

var _default2 = _default;
/* harmony default export */ __webpack_exports__["default"] = (_default2);
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(mapStateToProps, 'mapStateToProps', 'D:/New React Location/React/Project6/src/modules/landing/containers/MainView.jsx');

  __REACT_HOT_LOADER__.register(mapDispatchToProps, 'mapDispatchToProps', 'D:/New React Location/React/Project6/src/modules/landing/containers/MainView.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'D:/New React Location/React/Project6/src/modules/landing/containers/MainView.jsx');

  __REACT_HOT_LOADER__.register(_default2, 'default', 'D:/New React Location/React/Project6/src/modules/landing/containers/MainView.jsx');
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
//# sourceMappingURL=0.2bfb28758f32b47a4bcb.hot-update.js.map