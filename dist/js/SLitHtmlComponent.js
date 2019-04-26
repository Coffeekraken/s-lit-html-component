"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.json = exports.fn = exports.default = void 0;

var _SWebComponent2 = _interopRequireDefault(require("coffeekraken-sugar/js/core/SWebComponent"));

var _uniqid = _interopRequireDefault(require("coffeekraken-sugar/js/utils/uniqid"));

var _litHtml = require("lit-html");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

// create the litInstanceFns stack inside the window.sugar namespace
if (!window.sugar) window.sugar = {};
window.sugar._litInstanceFns = {};
/**
 * Base class that allows the creation of [lit-html](https://lit-html.polymer-project.org/) based webcomponent
 * @example    js
 * import SLitHtmlComponent from "coffeekraken-s-template-component"
 * import { html } from 'lit-html'
 *
 * export default class MyCoolWebComponent extends SLitHtmlComponent {
 *   /**
 *    * Default props
 *    * @definition    SWebComponent.defaultProps
 *    * @protected
 *    *\/
 *   static get defaultProps() {
 *     return {
 *       aCoolProp: "Hello Props"
 *     }
 *   }
 * 
 *   /**
 *    * Default prstateops
 *    * @definition    SWebComponent.defaultState
 *    * @protected
 *    *\/
 *   static get defaultState() {
 *     return {
 *       aCoolStateItem: "Hello State"
 *     }
 *   }
 * 
 *   /**
 *    * Render the component
 *    * @definition    SWebComponent.render
 *    *\/
 *   render() {
 *     // feed a JSX template into the super.render function
 *     super.render(html`
 *      <header>
 *        <h1>${this.props.aCoolProp}</h1>
 *        <h2>${this.state.aCoolStateItem}</h2>
 *      </header>
 *    `)
 *  }
 * }
 * 
 * // register the new component
 * MyCoolWebComponent.define("my-cool-web-component")
 * 
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://lit-html.polymer-project.org/
 */

var SLitHtmlComponent =
/*#__PURE__*/
function (_SWebComponent) {
  _inherits(SLitHtmlComponent, _SWebComponent);

  function SLitHtmlComponent() {
    _classCallCheck(this, SLitHtmlComponent);

    return _possibleConstructorReturn(this, _getPrototypeOf(SLitHtmlComponent).apply(this, arguments));
  }

  _createClass(SLitHtmlComponent, [{
    key: "render",

    /**
     * Render the component
     * Here goes the code that reflect the this.props state on the actual html element
     * @definition    SWebComponent.render
     * @protected
     */
    value: function render(renderedTemplate) {
      _get(_getPrototypeOf(SLitHtmlComponent.prototype), "render", this).call(this); // render the template


      (0, _litHtml.render)(renderedTemplate, this, {
        eventContext: this
      });
    }
  }], [{
    key: "defaultCss",

    /**
     * Css
     * @protected
     */
    value: function defaultCss(componentName, componentNameDash) {
      return "\n      ".concat(componentNameDash, " {\n        display : block;\n      }\n    ");
    }
  }]);

  return SLitHtmlComponent;
}(_SWebComponent2.default);
/**
 * @name    fn
 * Directive used to wrap functions when passed inside an attribute.
 * This directive return a window. path reference to the actual function.
 * 
 * @param    {Function}    fn    A function to wrap
 * @return    {String}    A window. path reference to the actual function
 */


exports.default = SLitHtmlComponent;
var clearFnsTimeout;
var fn = (0, _litHtml.directive)(function (fn) {
  return function (part) {
    // clear the window. pathes
    clearTimeout(clearFnsTimeout);
    clearFnsTimeout = setTimeout(function () {
      for (var key in window.sugar._litInstanceFns) {
        var _part = window.sugar._litInstanceFns[key].part;
        var $node = _part.committer.element;

        if (!$node.parentNode) {
          delete window.sugar._litInstanceFns[key];
        }
      }
    }, 200); // if the part has already a function uniq id
    // just set the part value and stop here

    if (part._fnUid) {
      part.setValue("window.sugar._litInstanceFns.".concat(part._fnUid, ".fn"));
      return;
    } // generate a uniq id for the function mapping


    var uid = (0, _uniqid.default)(); // save inside the part object the uid

    part._fnUid = uid; // save inside the window.sugar._litInstanceFns
    // the function reference and the part object

    window.sugar._litInstanceFns[uid] = {
      fn: fn,
      part: part // set the part value to the window. path function reference

    };
    part.setValue("window.sugar._litInstanceFns.".concat(uid, ".fn"));
  };
});
/**
 * @name    json
 * Directive used to wrap a js object/array used inside an attribute
 * and convert it to a string version
 * @param    {Object}    obj    The object/array to convert
 * @return    {String}    The string version of the object/array
 */

exports.fn = fn;
var json = (0, _litHtml.directive)(function (obj) {
  return function (part) {
    part.setValue(JSON.stringify(obj));
  };
});
exports.json = json;