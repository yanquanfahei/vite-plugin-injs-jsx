# vite-plugin-injs-jsx

convert JSX code in JS file

## Install

```shell
npm i vite-plugin-injs-jsx -D
```

## Usage

```js
import { defineConfig } from 'vite'
import transformJsxInJs from 'vite-plugin-injs-jsx'

export default defineConfig({
  plugins: [transformJsxInJs()]
})

```

## Options

### `include`

Type: `string []`<br>
Default: []<br>
Files that need to be converted to JSX

### `jsxOptions`

Type: `Object`<br>
The options for @vue/babel-preset-jsx.

### `babelrc`

Type: `Object`<br>
Babel converts JSX presets and plug-ins. The default is Vue's JSX preset. JSX plug-in that can be configured as react
