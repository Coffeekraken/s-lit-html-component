import SWebComponent from "coffeekraken-sugar/js/core/SWebComponent"
import onchange from 'on-change'
import fastdom from 'fastdom'
import uniqid from 'coffeekraken-sugar/js/utils/uniqid'
import { TemplateResult, render } from 'lit-html'

if (!window.sugar) window.sugar = {}
window.sugar._litInstanceFns = {}

export default class SLitHtmlComponent extends SWebComponent {
  
  /**
   * Get the default state for this particular instance
   * @type  		{Object}
   * @protected
   */
  get defaultState() {
    // check if default state in cache to avoid multiple time
    // computing
    if (this._defaultStateCache) return this._defaultStateCache

    // compute
    let state =
      window.sugar._webComponentsClasses[this.componentName].defaultState
    let comp = window.sugar._webComponentsClasses[this.componentName]
    while (comp) {
      if (comp.defaultState) {
        state = {
          ...comp.defaultState,
          ...state
        }
      }
      comp = Object.getPrototypeOf(comp)
    }
    // save in cache
    this._defaultStateCache = Object.assign({}, state)
    // return state
    return state
  }

  /**
   * Default state
   * Specify the default state object to start with. The state can be updated using the setState function and passing a new state object
   * that will be merged inside the actual one
   * @protected
   */
  static get defaultState() {
    return {}
  }
  
  /**
   * Default props
   * @definition    SWebComponent.defaultProps
   * @protected
   */
  static get defaultProps() {
    return {}
  }

  /**
   * Physical props
   * @definition    SWebComponent.physicalProps
   * @protected
   */
  static get physicalProps() {
    return []
  }

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
   * Component will mount
   * @definition    SWebComponent.componentWillMount
   * @protected
   */
  componentWillMount() {
    super.componentWillMount()
    // set the state
    this.state = Object.assign({}, this.defaultState)
    // listen for changes in state
    this.state = onchange(this.state, this._onPropsStateChange.bind(this))
    // store the litInstanceFns ids used by this instance
    this._litInstanceFnsIds = []
  }

  /**
   * Mount component
   * @definition    SWebComponent.componentMount
   * @protected
   */
  componentMount() {
    super.componentMount()
  }

  /**
   * Component unmount
   * @definition    SWebComponent.componentUnmount
   * @protected
   */
  componentUnmount() {
    super.componentUnmount()
  }

  /**
   * Component will receive prop
   * @definition    SWebComponent.componentWillReceiveProp
   * @protected
   */
  componentWillReceiveProp(name, newVal, oldVal) {
    super.componentWillReceiveProp(name, newVal, oldVal)
  }

  /**
   * Render the component on props and state update
   */
  _onPropsStateChange() {
    if (
      this.shouldComponentUpdate &&
      !this.shouldComponentUpdate(
        this.getNextPropsStack(),
        this.getPreviousPropsStack()
      )
    ) {
      return
    }

    // render the component
    fastdom.clear(this._renderMutateTimeout)
    this._renderMutateTimeout = this.mutate(() => {
      this.render()
    })
  }

  _processTemplateResult(templateResult) {
    // process the values to find the functions that
    // are actualy instance methods to bind them correctly using
    // the window. sugar webcomponent feature in attributes
    templateResult.values = templateResult.values.map((v, idx) => {
      // if the value is an array, check if it's not a TemplateResult
      // and stringify it to be injected inside an attribute
      if (typeof v === 'object' && v instanceof Array) {
        const firstItem = v[0]
        if (firstItem instanceof TemplateResult) {
          v = v.map(val => this._processTemplateResult(val))
          return v
        }
        return JSON.stringify(v)
      }
      // if the value is a plain object, stringify it
      if (typeof v === 'object') {
        return JSON.stringify(v)
      }
      // if the value is a function, check if it's a call to an instance
      // method and if so, map the function to a window. reference and return
      // the window. string to be injected in the attribute
      if (typeof v === 'function') {
        const name = v.name.replace('bound ', '')
        const string = templateResult.strings[idx]
        const stringSplits = string.split(/\s/)
        const attribute = stringSplits[stringSplits.length - 1].trim() 
        // do not process attribute that are event binding
        const isEventBinding = attribute.match(/^@[a-zA-Z-]+/) !== null
        if (!isEventBinding && this[name] && typeof this[name] === 'function') {
          // generate a uniqid to store the fn
          const id = uniqid()
          // add the id in the litInstanceFnsIds stack
          this._litInstanceFnsIds.push(id)
          // store the function in the window.sugar._litInstanceFns
          window.sugar._litInstanceFns[id] = v
          // return the newly path string to the function
          return `window.sugar._litInstanceFns.${id}`
        }
      }
      // return the unmodified value
      return v
    })
    // return the processed template result
    return templateResult
  }

  /**
   * Render the component
   * Here goes the code that reflect the this.props state on the actual html element
   * @definition    SWebComponent.render
   * @protected
   */
  render(template) {
    super.render()

    // remove all the references from the previous render
    // to the litInstanceFns using the this._litInstanceFnsIds stack
    this._litInstanceFnsIds.forEach(id => {
      // delete the reference
      delete window.sugar._litInstanceFns[id]
    })
    // reset the litInstanceFns stack
    this._litInstanceFns = []

    // render the template
    let renderedTemplate = template

    renderedTemplate = this._processTemplateResult(renderedTemplate)
    

    // render the template
    render(renderedTemplate, this, {
      eventContext: this
    })
  }
}
