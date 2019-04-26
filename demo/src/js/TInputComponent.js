import SLitHtmlComponent from "../../../dist/js/SLitHtmlComponent"
import { html } from 'lit-html'

export default class TInputComponent extends SLitHtmlComponent {
  static get defaultState() {
    return {
      value: "Plop",
      select: null,
      selectTemplate: "hello",
      selectTemplateOptions: [
        {
          value: "world",
          label: "World"
        },
        {
          value: "hello",
          label: "Hello"
        }
      ],
      checkbox: [true, "World"],
      radio: {
        Hello: "world"
      }
    }
  }

  static get defaultProps() {
    return {
      add: null
    }
  }

  onKeyup(e) {
    if (e.keyCode === 13) {
      this.props.add && this.props.add(this.state.value)
      this.state.value = ''
    }
  }

  handleInput(e) {
    this.setState({
      value: e.target.value
    })
  }

  selectChange(e) {
    this.setState({
      value: e.target.value
    })
  }

  componentMount() {
    super.componentMount()
  }

  render() {
    super.render(html`
      <header class="header">
        <h1>todos</h1>
        <input
          class="new-todo"
          name="new-todo" 
          placeholder="What needs to be done?"
          .value=${this.state.value}
          @keyup=${this.onKeyup}
          @input=${this.handleInput}
        />
        This is something cool
      </header>
    `)
  }
}

TInputComponent.define("t-input")
