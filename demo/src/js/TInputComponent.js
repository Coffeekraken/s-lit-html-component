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
    console.log("key", this.state.value)
    if (e.keyCode === 13) {
      this.props.add && this.props.add(this.state.value)
      this.state.value = ""
    }
  }

  handleInput(e) {
    console.log(e.target.value)
    this.setState({
      value: e.target.value
    })
  }

  componentMount() {
    super.componentMount()
    console.log(this.props)
    // setTimeout(() => {
    //   this.state.selectTemplateOptions = [
    //     {
    //       value: "item-1",
    //       label: "Item #1"
    //     },
    //     {
    //       value: "item-2",
    //       label: "Item #2"
    //     }
    //   ]
    //   this.state.selectTemplate = "item-2"
    // }, 3000)
  }

  render() {
    super.render(html`
      <header className="header">
        <h1>todos</h1>
        <input
          class="new-todo"
          name="new-todo"
          placeholder="What needs to be done?"
          @keyup=${this.onKeyup}
        />
      </header>
    `)
  }
}

TInputComponent.define("t-input")
