webpackHotUpdate(0,{

/***/ 744:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux_form__ = __webpack_require__(745);
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

/***/ 745:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValid = exports.track = exports.getModel = exports.getField = exports.form = exports.batched = exports.modeled = exports.createFieldClass = exports.Fieldset = exports.Errors = exports.LocalForm = exports.Form = exports.Control = exports.Field = exports.controls = exports.actionTypes = exports.actions = exports.initialFieldState = exports.createForms = exports.combineForms = exports.modelReducer = exports.formReducer = undefined;

var _actions = __webpack_require__(704);

var _actions2 = _interopRequireDefault(_actions);

var _actionTypes = __webpack_require__(701);

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _fieldComponent = __webpack_require__(751);

var _fieldComponent2 = _interopRequireDefault(_fieldComponent);

var _fieldsetComponent = __webpack_require__(762);

var _fieldsetComponent2 = _interopRequireDefault(_fieldsetComponent);

var _controlComponent = __webpack_require__(733);

var _controlComponent2 = _interopRequireDefault(_controlComponent);

var _formComponent = __webpack_require__(736);

var _formComponent2 = _interopRequireDefault(_formComponent);

var _localFormComponent = __webpack_require__(765);

var _localFormComponent2 = _interopRequireDefault(_localFormComponent);

var _errorsComponent = __webpack_require__(776);

var _errorsComponent2 = _interopRequireDefault(_errorsComponent);

var _controlPropsMap = __webpack_require__(727);

var _controlPropsMap2 = _interopRequireDefault(_controlPropsMap);

var _modeledEnhancer = __webpack_require__(739);

var _modeledEnhancer2 = _interopRequireDefault(_modeledEnhancer);

var _batchedEnhancer = __webpack_require__(729);

var _batchedEnhancer2 = _interopRequireDefault(_batchedEnhancer);

var _formReducer = __webpack_require__(719);

var _formReducer2 = _interopRequireDefault(_formReducer);

var _initialFieldState = __webpack_require__(703);

var _initialFieldState2 = _interopRequireDefault(_initialFieldState);

var _formsReducer = __webpack_require__(738);

var _formsReducer2 = _interopRequireDefault(_formsReducer);

var _modelReducer = __webpack_require__(728);

var _modelReducer2 = _interopRequireDefault(_modelReducer);

var _track = __webpack_require__(712);

var _track2 = _interopRequireDefault(_track);

var _isValid = __webpack_require__(710);

var _isValid2 = _interopRequireDefault(_isValid);

var _getFieldFromState = __webpack_require__(708);

var _getFieldFromState2 = _interopRequireDefault(_getFieldFromState);

var _get = __webpack_require__(698);

var _get2 = _interopRequireDefault(_get);

var _form = __webpack_require__(777);

var _form2 = _interopRequireDefault(_form);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.formReducer = _formReducer2.default;
exports.modelReducer = _modelReducer2.default;
exports.combineForms = _formsReducer2.default;
exports.createForms = _formsReducer.createForms;
exports.initialFieldState = _initialFieldState2.default;
exports.actions = _actions2.default;
exports.actionTypes = _actionTypes2.default;
exports.controls = _controlPropsMap2.default;
exports.Field = _fieldComponent2.default;
exports.Control = _controlComponent2.default;
exports.Form = _formComponent2.default;
exports.LocalForm = _localFormComponent2.default;
exports.Errors = _errorsComponent2.default;
exports.Fieldset = _fieldsetComponent2.default;
exports.createFieldClass = _fieldComponent.createFieldClass;
exports.modeled = _modeledEnhancer2.default;
exports.batched = _batchedEnhancer2.default;
exports.form = _form2.default;
exports.getField = _getFieldFromState2.default;
exports.getModel = _get2.default;
exports.track = _track2.default;
exports.isValid = _isValid2.default;

/***/ })

})
//# sourceMappingURL=0.7092a9960f8d98b4b294.hot-update.js.map