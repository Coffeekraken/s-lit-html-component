module.exports = {
  // server port
  port: 3000,

  // title
  title: "s-{component-name}-component",

  // layout
  layout: "right",

  // compile server
  compileServer: {
    // compile server port
    port: 4000
  },

  // editors
  editors: {
    html: {
      language: "html",
      data: `
        <s-sample my-prop-variable="World"></s-sample>
      `
    },
    css: {
      language: "scss",
      data: `
        @import 'node_modules/coffeekraken-sugar/index';
        @import 'node_modules/coffeekraken-s-typography-component/index';
        @include s-init();
        @include s-classes();
        @include s-typography-classes();
        body {
          padding: s-space(bigger);
        }
      `
    },
    js: {
      language: "js",
      data: `
        import { html } from 'lit-html'
        import SLitHtmlComponent from './dist/index'
        class SSampleComponent extends SLitHtmlComponent {
          static get defaultState() {
            return {
              myStateVariable: 'Hello'
            }
          }
          static get defaultProps() {
            return {
              myPropVariable: ''
            }
          }
          componentMount() {
            super.componentMount()
            setTimeout(() => {
              this.state.myStateVariable = 'Hey!'
            }, 5000)            
          }
          render() {
            super.render(html\`
              <div>
                <h1 class="h1">\${this.state.myStateVariable}</h1>
                <h2 class="h2">\${this.props.myPropVariable}</h2>
              </div>
            \`)
          }
        }
        SSampleComponent.define('s-sample')
      `
    }
  }
}
