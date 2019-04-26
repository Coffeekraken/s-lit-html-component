import SLitHtmlComponent from "../../../dist/js/SLitHtmlComponent"
import classnames from "classnames"
import store from "./store"
import { html } from 'lit-html'

export default class TListItemComponent extends SLitHtmlComponent {
  static get defaultState() {
    return {
      editing: false
    }
  }

  static get defaultProps() {
    return {
      todo: {},
      removeFn: null
    }
  }

  onToggle(e) {
    store.dispatch({
      type: "TOGGLE_DONE",
      todo: this.props.todo
    })
  }

  edit(e) {
    this.state.editing = true
  }

  onEditKeyUp(e) {
    if (e.keyCode === 27) {
      this.state.editing = false
    } else if (e.keyCode === 13) {
      this.state.editing = false
    }
  }

  onEditBlur(e) {
    this.state.editing = false
    store.dispatch({
      type: "EDIT",
      todo: this.props.todo
    })
  }

  render() {

    console.log('todo', this.props.todo)

    const classNames = classnames({
      editing: this.state.editing,
      completed: this.props.todo.done
    })

    super.render(html`
      <li class=${classNames}>
        <div class="view">
          <input
            class="toggle"
            type="checkbox"
            @change=${this.onToggle}
            ?checked=${this.props.todo.done}
          />
          <label @dblclick=${this.edit}>
            ${this.props.todo.title}
          </label>
          <button
            class="destroy"
            @click=${() => { this.props.removeFn(this.props.todo); }}
          />
        </div>
        <input
          class="edit"
          @keyup=${this.onEditKeyUp}
          @blur=${this.onEditBlur}
        />
      </li>
    `)
  }
}

TListItemComponent.define("t-list-item")
