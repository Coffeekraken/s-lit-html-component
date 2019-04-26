import SWebComponent from "coffeekraken-sugar/js/core/SWebComponent"
import uniqid from 'coffeekraken-sugar/js/utils/uniqid'
import { render, directive } from 'lit-html'

// create the litInstanceFns stack inside the window.sugar namespace
if (!window.sugar) window.sugar = {}
window.sugar._litInstanceFns = {}

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
export default class SLitHtmlComponent extends SWebComponent {
  
  /**
   * Css
   * @protected
   */
  static defaultCss(componentName, componentNameDash) {
    return `
      ${componentNameDash} {
        display : block;
      }
    `
  }

  /**
   * Render the component
   * Here goes the code that reflect the this.props state on the actual html element
   * @definition    SWebComponent.render
   * @protected
   */
  render(renderedTemplate) {
    super.render()

    // render the template
    render(renderedTemplate, this, {
      eventContext: this
    })
  }
}

/**
 * @name    fn
 * Directive used to wrap functions when passed inside an attribute.
 * This directive return a window. path reference to the actual function.
 * 
 * @param    {Function}    fn    A function to wrap
 * @return    {String}    A window. path reference to the actual function
 */
let clearFnsTimeout
export const fn = directive((fn) => (part) => {
  // clear the window. pathes
  clearTimeout(clearFnsTimeout)
  clearFnsTimeout = setTimeout(() => {
    for (let key in window.sugar._litInstanceFns) {
      const part = window.sugar._litInstanceFns[key].part
      const $node = part.committer.element
      if (!$node.parentNode) {
        delete window.sugar._litInstanceFns[key]
      }
    }
  }, 200)
  // if the part has already a function uniq id
  // just set the part value and stop here
  if (part._fnUid) {
    part.setValue(`window.sugar._litInstanceFns.${part._fnUid}.fn`)
    return
  }
  // generate a uniq id for the function mapping
  const uid = uniqid()
  // save inside the part object the uid
  part._fnUid = uid
  // save inside the window.sugar._litInstanceFns
  // the function reference and the part object
  window.sugar._litInstanceFns[uid] = {
    fn,
    part
  }
  // set the part value to the window. path function reference
  part.setValue(`window.sugar._litInstanceFns.${uid}.fn`)
});

/**
 * @name    json
 * Directive used to wrap a js object/array used inside an attribute
 * and convert it to a string version
 * @param    {Object}    obj    The object/array to convert
 * @return    {String}    The string version of the object/array
 */
export const json = directive((obj) => (part) => {
  part.setValue(JSON.stringify(obj))
});