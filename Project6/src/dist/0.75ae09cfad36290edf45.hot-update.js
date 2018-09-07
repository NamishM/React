webpackHotUpdate(0,{

/***/ 697:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux_form__ = __webpack_require__(744);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux_form___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_redux_form__);
var _this = this;





var Login = function Login(_ref) {
  var onCheckCredentials = _ref.onCheckCredentials,
      loginSuccess = _ref.loginSuccess;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: 'content' },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_2_react_redux_form__["Form"],
      { className: 'loginForm' },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_redux_form__["Control"].text, {
        model: 'user.username',
        validators: {
          required: function required(val) {
            return val && val.length;
          }
        },
        validateOn: 'blur',
        ref: function ref(input) {
          _this.username = input;
        },
        placeholder: 'username'
      }),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_redux_form__["Control"].text, {
        model: 'user.password',
        validators: {
          required: function required(val) {
            return val && val.length;
          }
        },
        validateOn: 'blur',
        ref: function ref(input) {
          _this.password = input;
        },
        placeholder: 'password'
      }),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', {
        type: 'button',
        className: 'loginBtn',
        onClick: function onClick() {
          return onCheckCredentials({ username: _this.username.value, password: _this.password.value });
        },
        value: 'login'
      }),
      !loginSuccess && loginSuccess !== null ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'span',
        { className: 'message' },
        'Please fill valid Username/Password'
      ) : null,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_redux_form__["Errors"], { messages: { required: 'Required' } })
    )
  );
};

Login.propTypes = {
  loginSuccess: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool.isRequired,
  onCheckCredentials: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
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

/***/ }),

/***/ 780:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_redux__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_src_redux_actions_ItemsAction__ = __webpack_require__(264);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_LoginUI__ = __webpack_require__(697);




var mapStateToProps = function mapStateToProps(state) {
  return {
    loginSuccess: state.auth.loginSuccess
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onCheckCredentials: function onCheckCredentials(_ref) {
      var credentials = _ref.credentials;
      return dispatch(Object(__WEBPACK_IMPORTED_MODULE_1_src_redux_actions_ItemsAction__["c" /* checkCredentials */])(credentials));
    }
  };
};

var _default = Object(__WEBPACK_IMPORTED_MODULE_0_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(__WEBPACK_IMPORTED_MODULE_2__components_LoginUI__["a" /* default */]);

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
//# sourceMappingURL=0.75ae09cfad36290edf45.hot-update.js.map