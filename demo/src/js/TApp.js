import { html } from 'lit-html'
import SHtmlLitComponent, {fn, json} from "../../../dist/js/SLitHtmlComponent"
import "./TInputComponent"
// import "./TFooterComponent"
import "./TListComponent"
// import "./TListFooterComponent"
import store from "./store"

import { FILTER_ALL, FILTER_ACTIVE, FILTER_DONE } from "./reducer"

export default class TApp extends SHtmlLitComponent {
  static get defaultState() {
    return {
      hello: 'Hello'
    }
  }

  static get defaultProps() {
    return {
      coolProp: "hello"
    }
  }

  componentMount() {
    super.componentMount()
    store.subscribe(() => {
      this.render()
    })

    setTimeout(() => {
      this.state.hello = 'World'
    }, 3000)

  }

  onRemove(todo) {
    store.dispatch({
      type: "REMOVE",
      todo
    })
  }

  onAdd(value) {
    store.dispatch({
      type: "ADD",
      title: value
    })
  }

  render() {
    const state = store.getState()

    const todos = state.todos.filter(todo => {
      switch (state.filter) {
        case FILTER_ACTIVE:
          return !todo.done
        case FILTER_DONE:
          return todo.done
        default:
          return true
      }
    })

    super.render(html`
      <div>
        <span>${this.state.hello}</span>
        <section class="todoapp">  
          <t-input add=${fn(this.onAdd.bind(this))}></t-input>
          <t-list todos=${json(todos)} remove-fn=${fn(this.onRemove.bind(this))}></t-list>
        </section>
        <t-footer />
      </div>
    `)
  }
}

TApp.define("t-app")
