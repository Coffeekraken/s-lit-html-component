import SLitHtmlComponent, { fn, json } from "../../../dist/js/SLitHtmlComponent"
import "./TListItemComponent"
import store from "./store"
import { html } from 'lit-html'
import { repeat } from 'lit-html/directives/repeat'

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
          @change=${this.toggleAll}
          id="toggle-all"
          class="toggle-all"
          type="checkbox"
        />
        <label for="toggle-all"></label>
        <ul class="todo-list">
          ${repeat(this.props.todos, (todo) => todo.id, (todo, index) => html`
              <t-list-item
                todo=${json(todo)}
                remove-fn=${fn(this.props.removeFn)}
              ></t-list-item>
            `)}
        </ul>
      </section>
    `)
  }
}

TListComponent.define("t-list")
