webpackHotUpdate(1,{

/***/ 536:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_redux__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_src_redux_actions_ItemsAction__ = __webpack_require__(517);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_LoginUI__ = __webpack_require__(538);




var mapStateToProps = function mapStateToProps(state) {
  return {
    loginSuccess: state.auth.loginSuccess
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onCheckCredentials: function onCheckCredentials(_ref) {
      var credentials = _ref.credentials;
      return dispatch(Object(__WEBPACK_IMPORTED_MODULE_1_src_redux_actions_ItemsAction__["a" /* checkCredentials */])(credentials));
    }
  };
};

var _default = Object(__WEBPACK_IMPORTED_MODULE_0_react_redux__["b" /* connect */])(mapStateToProps, mapDispatchToProps)(LoginUI);

var _default2 = _default;
/* harmony default export */ __webpack_exports__["default"] = (_default2);
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(mapStateToProps, 'mapStateToProps', 'D:/New React Location/React/Project6/src/modules/login/containers/Login.jsx');

  __REACT_HOT_LOADER__.register(mapDispatchToProps, 'mapDispatchToProps', 'D:/New React Location/React/Project6/src/modules/login/containers/Login.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'D:/New React Location/React/Project6/src/modules/login/containers/Login.jsx');

  __REACT_HOT_LOADER__.register(_default2, 'default', 'D:/New React Location/React/Project6/src/modules/login/containers/Login.jsx');
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
//# sourceMappingURL=1.bf18399b89948b300290.hot-update.js.map