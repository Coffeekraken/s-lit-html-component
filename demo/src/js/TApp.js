import { html } from 'lit-html'
import SHtmlLitComponent from "../../../dist/js/SLitHtmlComponent"
import "./TInputComponent"
// import "./TFooterComponent"
import "./TListComponent"
// import "./TListFooterComponent"
import store from "./store"

import { FILTER_ALL, FILTER_ACTIVE, FILTER_DONE } from "./reducer"

export default class TApp extends SHtmlLitComponent {
  static get defaultState() {
    return {
    }
  }

  static get defaultProps() {
    return {
      coolProp: "hello"
    }
  }

  componentMount() {
    super.componentMount()

    console.log(store);

    store.subscribe(() => {
      this.render()
    })
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
        <span>${this.props.coolProp}</span>
        <section class="todoapp">  
          <t-input add=${this.onAdd.bind(this)}></t-input>
          <t-list todos=${todos}></t-list>
        </section>
        <t-footer />
      </div>
    `)
  }
}

TApp.define("t-app")
