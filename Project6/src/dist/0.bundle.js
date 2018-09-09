webpackJsonp([0],{

/***/ 713:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_redux__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_src_redux_actions_ItemsAction__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_MainViewUI__ = __webpack_require__(715);




var mapStateToProps = function mapStateToProps(state) {
  return {
    loginSuccess: state.auth.loginSuccess,
    items: state.results,
    planetsItem: state.planetsItem
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onCheckCredentials: function onCheckCredentials(_ref) {
      var credentials = _ref.credentials;
      return dispatch(Object(__WEBPACK_IMPORTED_MODULE_1_src_redux_actions_ItemsAction__["c" /* checkCredentials */])(credentials));
    },
    getPlanetsData: function getPlanetsData(url) {
      return dispatch(Object(__WEBPACK_IMPORTED_MODULE_1_src_redux_actions_ItemsAction__["d" /* getPlanetsData */])(url));
    }
  };
};

var _default = Object(__WEBPACK_IMPORTED_MODULE_0_react_redux__["b" /* connect */])(mapStateToProps, mapDispatchToProps)(__WEBPACK_IMPORTED_MODULE_2__components_MainViewUI__["a" /* default */]);

var _default2 = _default;
/* harmony default export */ __webpack_exports__["default"] = (_default2);
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(mapStateToProps, 'mapStateToProps', '/Users/ruchikasharma/Documents/GitHub/React/Project6/src/modules/landing/containers/MainView.jsx');

  __REACT_HOT_LOADER__.register(mapDispatchToProps, 'mapDispatchToProps', '/Users/ruchikasharma/Documents/GitHub/React/Project6/src/modules/landing/containers/MainView.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/ruchikasharma/Documents/GitHub/React/Project6/src/modules/landing/containers/MainView.jsx');

  __REACT_HOT_LOADER__.register(_default2, 'default', '/Users/ruchikasharma/Documents/GitHub/React/Project6/src/modules/landing/containers/MainView.jsx');
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

/***/ 715:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Header__ = __webpack_require__(716);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Footer__ = __webpack_require__(717);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ItemViewUI__ = __webpack_require__(718);






var MainViewUI = function MainViewUI(_ref) {
  var loginSuccess = _ref.loginSuccess,
      items = _ref.items,
      getPlanetsData = _ref.getPlanetsData,
      planetsItem = _ref.planetsItem;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: 'mainContainer' },
    loginSuccess ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'mainView' },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__Header__["a" /* default */], null),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__ItemViewUI__["a" /* default */], {
        items: items,
        getPlanetsData: getPlanetsData,
        planetsItem: planetsItem
      }),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__Footer__["a" /* default */], null)
    ) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      null,
      'You are not authorized! Please do a valid login.'
    )
  );
};

MainViewUI.propTypes = {
  loginSuccess: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  items: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    name: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired
  }).isRequired).isRequired,
  planetsItem: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    name: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired
  }).isRequired).isRequired,
  getPlanetsData: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};

var _default = MainViewUI;
var _default2 = _default;
/* harmony default export */ __webpack_exports__["a"] = (_default2);
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(MainViewUI, 'MainViewUI', '/Users/ruchikasharma/Documents/GitHub/React/Project6/src/modules/landing/components/MainViewUI.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/ruchikasharma/Documents/GitHub/React/Project6/src/modules/landing/components/MainViewUI.jsx');

  __REACT_HOT_LOADER__.register(_default2, 'default', '/Users/ruchikasharma/Documents/GitHub/React/Project6/src/modules/landing/components/MainViewUI.jsx');
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

/***/ 716:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


var Header = function Header() {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    "div",
    { className: "Header" },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      "h1",
      null,
      "The Star Wars API"
    )
  );
};

var _default = Header;
var _default2 = _default;
/* harmony default export */ __webpack_exports__["a"] = (_default2);
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Header, "Header", "/Users/ruchikasharma/Documents/GitHub/React/Project6/src/modules/landing/components/Header.jsx");

  __REACT_HOT_LOADER__.register(_default, "default", "/Users/ruchikasharma/Documents/GitHub/React/Project6/src/modules/landing/components/Header.jsx");

  __REACT_HOT_LOADER__.register(_default2, "default", "/Users/ruchikasharma/Documents/GitHub/React/Project6/src/modules/landing/components/Header.jsx");
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

/***/ 717:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


var Footer = function Footer() {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    "div",
    { className: "Footer" },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      "p",
      null,
      "Copyright @2018"
    )
  );
};

var _default = Footer;
var _default2 = _default;
/* harmony default export */ __webpack_exports__["a"] = (_default2);
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Footer, "Footer", "/Users/ruchikasharma/Documents/GitHub/React/Project6/src/modules/landing/components/Footer.jsx");

  __REACT_HOT_LOADER__.register(_default, "default", "/Users/ruchikasharma/Documents/GitHub/React/Project6/src/modules/landing/components/Footer.jsx");

  __REACT_HOT_LOADER__.register(_default2, "default", "/Users/ruchikasharma/Documents/GitHub/React/Project6/src/modules/landing/components/Footer.jsx");
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

/***/ 718:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);



var ItemViewUI = function ItemViewUI(_ref) {
  var items = _ref.items,
      getPlanetsData = _ref.getPlanetsData,
      planetsItem = _ref.planetsItem;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: 'itemContainer' },
    'Galaxy Name:',
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'ul',
      null,
      items && items.length > 0 ? items.map(function (item, index) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'li',
          { key: index },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'button',
            {
              onClick: function onClick(e) {
                e.preventDefault();
                getPlanetsData(item.homeworld);
              }
            },
            item.name
          )
        );
      }) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'li',
        null,
        'Please wait or see console for API error...'
      )
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('hr', null),
    planetsItem ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'ul',
      { style: { color: '#b9b6b6' } },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'li',
        null,
        'Planet Name: ',
        planetsItem.name
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'li',
        null,
        'Planet Population: ',
        planetsItem.population
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'li',
        null,
        'Planet Terrain: ',
        planetsItem.terrain
      )
    ) : 'No Valid Data present, Click on ablove options to see data and be patient while data loads'
  );
};

ItemViewUI.propTypes = {
  items: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    name: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
    homeworld: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired
  }).isRequired).isRequired,
  planetsItem: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    name: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
    poplulation: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
    terrain: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired
  }).isRequired).isRequired,
  getPlanetsData: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};

var _default = ItemViewUI;
var _default2 = _default;
/* harmony default export */ __webpack_exports__["a"] = (_default2);
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(ItemViewUI, 'ItemViewUI', '/Users/ruchikasharma/Documents/GitHub/React/Project6/src/modules/landing/components/ItemViewUI.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/ruchikasharma/Documents/GitHub/React/Project6/src/modules/landing/components/ItemViewUI.jsx');

  __REACT_HOT_LOADER__.register(_default2, 'default', '/Users/ruchikasharma/Documents/GitHub/React/Project6/src/modules/landing/components/ItemViewUI.jsx');
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