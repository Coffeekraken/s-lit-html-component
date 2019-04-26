# SLitHtmlComponent

Base class that allows the creation of [lit-html](https://lit-html.polymer-project.org/) based webcomponent

### Example
```js
	import SLitHtmlComponent from "coffeekraken-s-template-component"
import { html } from 'lit-html'

export default class MyCoolWebComponent extends SLitHtmlComponent {
  /**
   * Default props
   * @definition    SWebComponent.defaultProps
   * @protected
   */
  static get defaultProps() {
    return {
      aCoolProp: "Hello Props"
    }
  }

  /**
   * Default prstateops
   * @definition    SWebComponent.defaultState
   * @protected
   */
  static get defaultState() {
    return {
      aCoolStateItem: "Hello State"
    }
  }

  /**
   * Render the component
   * @definition    SWebComponent.render
   */
  render() {
    // feed a JSX template into the super.render function
    super.render(html`
     <header>
       <h1>${this.props.aCoolProp}</h1>
       <h2>${this.state.aCoolStateItem}</h2>
     </header>
   `)
 }
}

// register the new component
MyCoolWebComponent.define("my-cool-web-component")
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)

See : **See more** : [https://lit-html.polymer-project.org/](https://lit-html.polymer-project.org/)

Extends **SWebComponent**







## Methods


### fn

Directive used to wrap functions when passed inside an attribute.
This directive return a window. path reference to the actual function.



#### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
fn  |  **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**  |  A function to wrap  |  required  |

Return **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }** A window. path reference to the actual function


### json

Directive used to wrap a js object/array used inside an attribute
and convert it to a string version


#### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
obj  |  **{ [Object](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object) }**  |  The object/array to convert  |  required  |

Return **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }** The string version of the object/array

Default : **directive((obj) => (part) => {**