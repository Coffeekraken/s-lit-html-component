# Coffeekraken s-lit-html-component <img src=".resources/coffeekraken-logo.jpg" height="25px" />

<p>
	<!-- <a href="https://travis-ci.org/coffeekraken/s-lit-html-component">
		<img src="https://img.shields.io/travis/coffeekraken/s-lit-html-component.svg?style=flat-square" />
	</a> -->
	<a href="https://www.npmjs.com/package/coffeekraken-s-lit-html-component">
		<img src="https://img.shields.io/npm/v/coffeekraken-s-lit-html-component.svg?style=flat-square" />
	</a>
	<a href="https://github.com/coffeekraken/s-lit-html-component/blob/master/LICENSE.txt">
		<img src="https://img.shields.io/npm/l/coffeekraken-s-lit-html-component.svg?style=flat-square" />
	</a>
	<!-- <a href="https://github.com/coffeekraken/s-lit-html-component">
		<img src="https://img.shields.io/npm/dt/coffeekraken-s-lit-html-component.svg?style=flat-square" />
	</a>
	<a href="https://github.com/coffeekraken/s-lit-html-component">
		<img src="https://img.shields.io/github/forks/coffeekraken/s-lit-html-component.svg?style=social&label=Fork&style=flat-square" />
	</a>
	<a href="https://github.com/coffeekraken/s-lit-html-component">
		<img src="https://img.shields.io/github/stars/coffeekraken/s-lit-html-component.svg?style=social&label=Star&style=flat-square" />
	</a> -->
	<a href="https://twitter.com/coffeekrakenio">
		<img src="https://img.shields.io/twitter/url/http/coffeekrakenio.svg?style=social&style=flat-square" />
	</a>
	<a href="http://coffeekraken.io">
		<img src="https://img.shields.io/twitter/url/http/shields.io.svg?style=flat-square&label=coffeekraken.io&colorB=f2bc2b&style=flat-square" />
	</a>
</p>

<p class="lead">Base class that allows the creation of [lit-html](https://lit-html.polymer-project.org/) based webcomponent.</p>

[![View demo](http://components.coffeekraken.io/assets/img/view-demo.png)](http://components.coffeekraken.io/app/s-lit-html-component)

## Table of content

1. **[Demo](http://components.coffeekraken.io/app/s-lit-html-component)**
2. [Install](#readme-install)
3. [Get Started](#readme-get-started)
4. [State](#readme-state)
5. [Directives](#readme-directives)
6. [Javascript API](doc/js)
7. [Sugar Web Components Documentation](https://github.com/coffeekraken/sugar/blob/master/doc/webcomponent.md)
8. [Browsers support](#readme-browsers-support)
9. [Code linting](#readme-code-linting)
10. [Contribute](#readme-contribute)
11. [Who are Coffeekraken?](#readme-who-are-coffeekraken)
12. [Licence](#readme-license)

<a name="readme-install"></a>

## Install

```
npm install coffeekraken-s-lit-html-component --save
```

<a name="readme-get-started"></a>

## Get Started

First, create a new webcomponent based on the STemplateComponent class like so:

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

Then simply use it inside your html like so:

```html
<my-cool-web-component a-cool-prop="Hello World"></my-cool-web-component>
```

<a id="readme-state"></a>
## State

State is pretty much like `props`, with the difference that `state` is for storing **internal** state. In the other hand, `props` are used to store **external** component state.

Here's how to use `state`:

```js
class MyCoolComponent extends SLitHtmlComponent {
  // define your state variables
  static get defaultState() {
    return {
      myCoolStateVariable: "Hello"
    }
  }

  componentMount() {
    // access your state variables
    console.log(this.state.myCoolStateVariable) // Hello
    // set your state variables
    this.setState({
      myCoolStateVariable: "World"
    })
    // or directly by seeting the variable
    this.state.myCoolStateVariable = "World"
  }
}
```

<a id="readme-directives"></a>

## Directives

As lit-html provide some directives, this component provide his own.
Here's the list:

#### `fn`

The `fn` directive has to be used when you want to pass a function to a `SWebComponent` through his attributes. Here's how:

```js
import { html } from 'lit-html'
import SLitHtmlComponent, {fn} from 'coffeekraken-s-lit-html-component'
class MyCoolComponent extends SLitHtmlComponent {
  myCoolFunction() {
    console.log('hello world')
  }
  render() {
    super.render(html`
      <my-other-component pass-a-function=${fn(this.myCoolFunction.bind(this))}>/my-other-component>
    `)
  }
}
MyCoolComponent.define('my-cool-component')
```

#### `json`

The `json` directive is a shortcut for `JSON.stringify`. Nothing more, nothing less.
It has to be used when you want to pass a plain object/array to a component through his attributes. Here's how:

```js
import { html } from 'lit-html'
import SLitHtmlComponent, {json} from 'coffeekraken-s-lit-html-component'
class MyCoolComponent extends SLitHtmlComponent {
  render() {
    const myPlainObject = {
      hello: 'World'
    }
    super.render(html`
      <my-other-component pass-an-object=${json(myPlainObject)}>/my-other-component>
    `)
  }
}
MyCoolComponent.define('my-cool-component')
```

<a id="readme-browsers-support"></a>

## Browsers support

| <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/edge.png" alt="IE / Edge" width="16px" height="16px" /></br>IE / Edge | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/firefox.png" alt="Firefox" width="16px" height="16px" /></br>Firefox | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/chrome.png" alt="Chrome" width="16px" height="16px" /></br>Chrome | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/safari.png" alt="Safari" width="16px" height="16px" /></br>Safari |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE11+                                                                                                                                                              | last 2 versions                                                                                                                                                   | last 2 versions                                                                                                                                                | last 2 versions                                                                                                                                                |

> As browsers are automatically updated, we will keep as reference the last two versions of each but this component can work on older ones as well.

> The webcomponent API (custom elements, shadowDOM, etc...) is not supported in some older browsers like IE10, etc... In order to make them work, you will need to integrate the [corresponding polyfill](https://www.webcomponents.org/polyfills).

<a id="readme-code-linting"></a>

## Code linting

This package uses some code linting rules. Here's the list:

1. [ESLint](https://eslint.org/) with [airbnb](https://www.npmjs.com/package/eslint-config-airbnb) and [prettier](https://github.com/prettier/eslint-config-prettier) rules for javascript files
2. [Stylelint](https://github.com/stylelint/stylelint) with [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard) for `scss` files

> Your commits will not been accepted if the code style is not respected!

<a id="readme-contribute"></a>

## Contribute

This is an open source project and will ever be! You are more that welcomed to contribute to his development and make it more awesome every day.
To do so, you have several possibilities:

1. [Share the love ❤️](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-share-the-love)
2. [Declare issues](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-declare-issues)
3. [Fix issues](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-fix-issues)
4. [Add features](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-add-features)
5. [Build web component](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-build-web-component)

<a id="readme-who-are-coffeekraken"></a>

## Who are Coffeekraken

We try to be **some cool guys** that build **some cool tools** to make our (and yours hopefully) **every day life better**.

#### [More on who we are](https://github.com/Coffeekraken/coffeekraken/blob/master/who-are-we.md)

<a id="readme-license"></a>

## License

The code is available under the [MIT license](LICENSE). This mean that you can use, modify, or do whatever you want with it. This mean also that it is shipped to you for free, so don't be a hater and if you find some issues, etc... feel free to [contribute](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md) instead of sharing your frustrations on social networks like an asshole...
