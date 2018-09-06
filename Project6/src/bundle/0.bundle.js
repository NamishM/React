webpackJsonp([0],{

/***/ 536:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_redux__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_src_redux_actions_ItemsAction__ = __webpack_require__(214);
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

/***/ }),

/***/ 538:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var _this = this;



var Login = function Login(_ref) {
  var onCheckCredentials = _ref.onCheckCredentials,
      loginSuccess = _ref.loginSuccess;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    "div",
    { className: "content" },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      "form",
      { className: "loginForm" },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "text", placeholder: "username", ref: function ref(input) {
          _this.username = input;
        } }),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "password", placeholder: "password", ref: function ref(input) {
          _this.password = input;
        } }),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "button", className: "loginBtn", onClick: function onClick() {
          return onCheckCredentials({ username: _this.username.value, password: _this.password.value });
        }, value: "login" }),
      !loginSuccess ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "span",
        { className: "message" },
        "Please fill valid Username/Password"
      ) : null
    )
  );
};

var _default = Login;
var _default2 = _default;
/* unused harmony default export */ var _unused_webpack_default_export = (_default2);
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Login, "Login", "D:/New React Location/React/Project6/src/modules/login/components/LoginUI.jsx");

  __REACT_HOT_LOADER__.register(_default, "default", "D:/New React Location/React/Project6/src/modules/login/components/LoginUI.jsx");

  __REACT_HOT_LOADER__.register(_default2, "default", "D:/New React Location/React/Project6/src/modules/login/components/LoginUI.jsx");
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

});
//# sourceMappingURL=0.bundle.js.map