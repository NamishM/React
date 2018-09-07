webpackHotUpdate(0,{

/***/ 697:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_redux__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_src_redux_actions_ItemsAction__ = __webpack_require__(264);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_LoginUI__ = __webpack_require__(744);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_LoginUI___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_LoginUI__);




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
    },
    LoginFaied: function LoginFaied() {
      return dispatch(setLoginfailed());
    }
  };
};

var _default = Object(__WEBPACK_IMPORTED_MODULE_0_react_redux__["b" /* connect */])(mapStateToProps, mapDispatchToProps)(__WEBPACK_IMPORTED_MODULE_2__components_LoginUI__["default"]);

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

/***/ 698:
false,

/***/ 699:
false,

/***/ 700:
false,

/***/ 701:
false,

/***/ 702:
false,

/***/ 703:
false,

/***/ 704:
false,

/***/ 705:
false,

/***/ 706:
false,

/***/ 707:
false,

/***/ 708:
false,

/***/ 709:
false,

/***/ 710:
false,

/***/ 711:
false,

/***/ 712:
false,

/***/ 713:
false,

/***/ 714:
false,

/***/ 715:
false,

/***/ 716:
false,

/***/ 717:
false,

/***/ 718:
false,

/***/ 719:
false,

/***/ 720:
false,

/***/ 721:
false,

/***/ 722:
false,

/***/ 723:
false,

/***/ 724:
false,

/***/ 725:
false,

/***/ 726:
false,

/***/ 727:
false,

/***/ 728:
false,

/***/ 729:
false,

/***/ 730:
false,

/***/ 731:
false,

/***/ 732:
false,

/***/ 733:
false,

/***/ 734:
false,

/***/ 735:
false,

/***/ 736:
false,

/***/ 737:
false,

/***/ 738:
false,

/***/ 739:
false,

/***/ 740:
false,

/***/ 741:
false,

/***/ 742:
false,

/***/ 744:
/***/ (function(module, exports) {

throw new Error("Module build failed: SyntaxError: D:/New React Location/React/Project6/src/modules/login/components/LoginUI.jsx: Unexpected token (13:16)\n\n\u001b[0m \u001b[90m 11 | \u001b[39m        className\u001b[33m=\u001b[39m\u001b[32m\"loginBtn\"\u001b[39m\n \u001b[90m 12 | \u001b[39m        onClick\u001b[33m=\u001b[39m{\n\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 13 | \u001b[39m          () \u001b[33m=>\u001b[39m \u001b[36mif\u001b[39m (\u001b[36mthis\u001b[39m\u001b[33m.\u001b[39musername\u001b[33m.\u001b[39mvalue \u001b[33m!==\u001b[39m \u001b[32m''\u001b[39m \u001b[33m&&\u001b[39m \u001b[36mthis\u001b[39m\u001b[33m.\u001b[39mpassword\u001b[33m.\u001b[39mvalue \u001b[33m!==\u001b[39m \u001b[32m''\u001b[39m) {\n \u001b[90m    | \u001b[39m                \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\n \u001b[90m 14 | \u001b[39m            onCheckCredentials({ username\u001b[33m:\u001b[39m \u001b[36mthis\u001b[39m\u001b[33m.\u001b[39musername\u001b[33m.\u001b[39mvalue\u001b[33m,\u001b[39m password\u001b[33m:\u001b[39m \u001b[36mthis\u001b[39m\u001b[33m.\u001b[39mpassword\u001b[33m.\u001b[39mvalue })\u001b[33m;\u001b[39m\n \u001b[90m 15 | \u001b[39m          } \u001b[36melse\u001b[39m {\n \u001b[90m 16 | \u001b[39m            setLoginfailed()\u001b[33m;\u001b[39m\u001b[0m\n");

/***/ }),

/***/ 745:
false,

/***/ 746:
false,

/***/ 747:
false,

/***/ 748:
false,

/***/ 749:
false,

/***/ 750:
false,

/***/ 751:
false,

/***/ 752:
false,

/***/ 753:
false,

/***/ 754:
false,

/***/ 755:
false,

/***/ 756:
false,

/***/ 757:
false,

/***/ 758:
false,

/***/ 759:
false,

/***/ 760:
false,

/***/ 761:
false,

/***/ 762:
false,

/***/ 763:
false,

/***/ 764:
false,

/***/ 765:
false,

/***/ 766:
false,

/***/ 767:
false,

/***/ 768:
false,

/***/ 769:
false,

/***/ 770:
false,

/***/ 771:
false,

/***/ 772:
false,

/***/ 773:
false,

/***/ 774:
false,

/***/ 775:
false,

/***/ 776:
false,

/***/ 777:
false,

/***/ 778:
false,

/***/ 779:
false,

/***/ 780:
false

})
//# sourceMappingURL=0.a42def45901f19e80653.hot-update.js.map