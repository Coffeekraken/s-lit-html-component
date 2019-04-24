import SLitHtmlComponent from "../../../dist/js/SLitHtmlComponent"
import "./TListItemComponent"
import store from "./store"
import { html } from 'lit-html'

export default class TListComponent extends SLitHtmlComponent {
  static get defaultState() {
    return {
      toggleAll: false
    }
  }

  static get defaultProps() {
    return {
      todos: [],
      removeFn: null
    }
  }

  toggleAll(e) {
    this.state.toggleAll = !this.state.toggleAll
    this.props.todos.map(todo => {
      if (
        (!todo.done && this.state.toggleAll) ||
        (!this.state.toggleAll && todo.done)
      ) {
        store.dispatch({
          type: "TOGGLE_DONE",
          todo
        })
      }
    })
  }

  allDone() {
    const doneTodos = this.props.todos.filter(todo => todo.done)
    return doneTodos.length === this.props.todos.length
  }

  render() {
    if (this.allDone()) {
      this.state.toggleAll = true
    } else {
      this.state.toggleAll = false
    }

    super.render(html`
      <section class="main">
        <input
          @onChange=${this.toggleAll}
          id="toggle-all"
          class="toggle-all"
          type="checkbox"
        />
        <label for="toggle-all"></label>
        <ul class="todo-list">
          ${this.props.todos.map(todo => html`
              <t-list-item
                todo=${todo}
                removeFn=${this.props.removeFn}
              ></t-list-item>
            `)}
        </ul>
      </section>
    `)
  }
}

TListComponent.define("t-list")
