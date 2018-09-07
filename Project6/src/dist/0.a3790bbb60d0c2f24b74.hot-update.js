webpackHotUpdate(0,{

/***/ 744:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
var _this = this;




var Login = function Login(_ref) {
  var onCheckCredentials = _ref.onCheckCredentials,
      loginSuccess = _ref.loginSuccess,
      setLoginfailed = _ref.setLoginfailed;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: 'content ' + (loginSuccess ? 'loading' : null) },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'form',
      { className: 'loginForm' },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'text', placeholder: 'username', ref: function ref(input) {
          _this.username = input;
        } }),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'password', placeholder: 'password', ref: function ref(input) {
          _this.password = input;
        } }),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', {
        type: 'button',
        className: 'loginBtn',
        onClick: function onClick() {
          if (_this.username.value !== '' && _this.password.value !== '') {
            onCheckCredentials(_this.username.value, _this.password.value);
          } else {
            setLoginfailed();
          }
        },
        value: 'login'
      }),
      !loginSuccess && loginSuccess !== null ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'span',
        { className: 'message' },
        'Please fill valid Username/Password'
      ) : null
    )
  );
};

Login.propTypes = {
  loginSuccess: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  onCheckCredentials: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  setLoginfailed: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};

var _default = Login;
var _default2 = _default;
/* harmony default export */ __webpack_exports__["a"] = (_default2);
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Login, 'Login', 'D:/New React Location/React/Project6/src/modules/login/components/LoginUI.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'D:/New React Location/React/Project6/src/modules/login/components/LoginUI.jsx');

  __REACT_HOT_LOADER__.register(_default2, 'default', 'D:/New React Location/React/Project6/src/modules/login/components/LoginUI.jsx');
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
//# sourceMappingURL=0.a3790bbb60d0c2f24b74.hot-update.js.map