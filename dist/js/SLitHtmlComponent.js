"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SWebComponent2 = _interopRequireDefault(require("coffeekraken-sugar/js/core/SWebComponent"));

var _onChange = _interopRequireDefault(require("on-change"));

var _fastdom = _interopRequireDefault(require("fastdom"));

var _uniqid = _interopRequireDefault(require("coffeekraken-sugar/js/utils/uniqid"));

var _litHtml = require("lit-html");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

if (!window.sugar) window.sugar = {};
window.sugar._litInstanceFns = {};

var SLitHtmlComponent =
/*#__PURE__*/
function (_SWebComponent) {
  _inherits(SLitHtmlComponent, _SWebComponent);

  function SLitHtmlComponent() {
    _classCallCheck(this, SLitHtmlComponent);

    return _possibleConstructorReturn(this, _getPrototypeOf(SLitHtmlComponent).apply(this, arguments));
  }

  _createClass(SLitHtmlComponent, [{
    key: "componentWillMount",

    /**
     * Component will mount
     * @definition    SWebComponent.componentWillMount
     * @protected
     */
    value: function componentWillMount() {
      _get(_getPrototypeOf(SLitHtmlComponent.prototype), "componentWillMount", this).call(this); // set the state


      this.state = Object.assign({}, this.defaultState); // listen for changes in state

      this.state = (0, _onChange.default)(this.state, this._onPropsStateChange.bind(this)); // store the litInstanceFns ids used by this instance

      this._litInstanceFnsIds = [];
    }
    /**
     * Mount component
     * @definition    SWebComponent.componentMount
     * @protected
     */

  }, {
    key: "componentMount",
    value: function componentMount() {
      _get(_getPrototypeOf(SLitHtmlComponent.prototype), "componentMount", this).call(this);
    }
    /**
     * Component unmount
     * @definition    SWebComponent.componentUnmount
     * @protected
     */

  }, {
    key: "componentUnmount",
    value: function componentUnmount() {
      _get(_getPrototypeOf(SLitHtmlComponent.prototype), "componentUnmount", this).call(this);
    }
    /**
     * Component will receive prop
     * @definition    SWebComponent.componentWillReceiveProp
     * @protected
     */

  }, {
    key: "componentWillReceiveProp",
    value: function componentWillReceiveProp(name, newVal, oldVal) {
      _get(_getPrototypeOf(SLitHtmlComponent.prototype), "componentWillReceiveProp", this).call(this, name, newVal, oldVal);
    }
    /**
     * Render the component on props and state update
     */

  }, {
    key: "_onPropsStateChange",
    value: function _onPropsStateChange() {
      var _this = this;

      if (this.shouldComponentUpdate && !this.shouldComponentUpdate(this.getNextPropsStack(), this.getPreviousPropsStack())) {
        return;
      } // render the component


      _fastdom.default.clear(this._renderMutateTimeout);

      this._renderMutateTimeout = this.mutate(function () {
        _this.render();
      });
    }
  }, {
    key: "_processTemplateResult",
    value: function _processTemplateResult(templateResult) {
      var _this2 = this;

      // process the values to find the functions that
      // are actualy instance methods to bind them correctly using
      // the window. sugar webcomponent feature in attributes
      templateResult.values = templateResult.values.map(function (v, idx) {
        // if the value is an array, check if it's not a TemplateResult
        // and stringify it to be injected inside an attribute
        if (_typeof(v) === 'object' && v instanceof Array) {
          var firstItem = v[0];

          if (firstItem instanceof _litHtml.TemplateResult) {
            v = v.map(function (val) {
              return _this2._processTemplateResult(val);
            });
            return v;
          }

          return JSON.stringify(v); // if the value is a plain object, stringify it
        } else if (_typeof(v) === 'object') {
          console.log('v', v);
          return JSON.stringify(v); // if the value is a function, check if it's a call to an instance
          // method and if so, map the function to a window. reference and return
          // the window. string to be injected in the attribute
        } else if (typeof v === 'function') {
          var name = v.name.replace('bound ', '');
          var string = templateResult.strings[idx];
          var stringSplits = string.split(/\s/);
          var attribute = stringSplits[stringSplits.length - 1].trim(); // do not process attribute that are event binding

          var isEventBinding = attribute.match(/^@[a-zA-Z-]+/) !== null;

          if (!isEventBinding && _this2[name] && typeof _this2[name] === 'function') {
            // generate a uniqid to store the fn
            var id = (0, _uniqid.default)(); // add the id in the litInstanceFnsIds stack

            _this2._litInstanceFnsIds.push(id); // store the function in the window.sugar._litInstanceFns


            window.sugar._litInstanceFns[id] = v; // return the newly path string to the function

            return "window.sugar._litInstanceFns.".concat(id);
          }
        } // return the unmodified value


        return v;
      }); // return the processed template result

      return templateResult;
    }
    /**
     * Render the component
     * Here goes the code that reflect the this.props state on the actual html element
     * @definition    SWebComponent.render
     * @protected
     */

  }, {
    key: "render",
    value: function render(template) {
      _get(_getPrototypeOf(SLitHtmlComponent.prototype), "render", this).call(this); // remove all the references from the previous render
      // to the litInstanceFns using the this._litInstanceFnsIds stack


      this._litInstanceFnsIds.forEach(function (id) {
        // delete the reference
        delete window.sugar._litInstanceFns[id];
      }); // reset the litInstanceFns stack


      this._litInstanceFns = []; // render the template

      var renderedTemplate = template;
      renderedTemplate = this._processTemplateResult(renderedTemplate); // render the template

      (0, _litHtml.render)(renderedTemplate, this, {
        eventContext: this
      });
    }
  }, {
    key: "defaultState",

    /**
     * Get the default state for this particular instance
     * @type  		{Object}
     * @protected
     */
    get: function get() {
      // check if default state in cache to avoid multiple time
      // computing
      if (this._defaultStateCache) return this._defaultStateCache; // compute

      var state = window.sugar._webComponentsClasses[this.componentName].defaultState;
      var comp = window.sugar._webComponentsClasses[this.componentName];

      while (comp) {
        if (comp.defaultState) {
          state = _objectSpread({}, comp.defaultState, state);
        }

        comp = Object.getPrototypeOf(comp);
      } // save in cache


      this._defaultStateCache = Object.assign({}, state); // return state

      return state;
    }
    /**
     * Default state
     * Specify the default state object to start with. The state can be updated using the setState function and passing a new state object
     * that will be merged inside the actual one
     * @protected
     */

  }], [{
    key: "defaultCss",

    /**
     * Css
     * @protected
     */
    value: function defaultCss(componentName, componentNameDash) {
      return "\n      ".concat(componentNameDash, " {\n        display : block;\n      }\n    ");
    }
  }, {
    key: "defaultState",
    get: function get() {
      return {};
    }
    /**
     * Default props
     * @definition    SWebComponent.defaultProps
     * @protected
     */

  }, {
    key: "defaultProps",
    get: function get() {
      return {};
    }
    /**
     * Physical props
     * @definition    SWebComponent.physicalProps
     * @protected
     */

  }, {
    key: "physicalProps",
    get: function get() {
      return [];
    }
  }]);

  return SLitHtmlComponent;
}(_SWebComponent2.default);

exports.default = SLitHtmlComponent;