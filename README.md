### Componentify

## Table of Contents

- [NPM package](www.npmjs.com/package/react-componentify)
- [Installation](#installation)
- [Usage](#usage)
- [Converters](#converters)
- [Expamples without component nesting](#expamples-without-component-nesting)
- [Expamples with component nesting](#expamples-with-component-nesting)

## NPM package

www.npmjs.com/package/react-componentify

## Installation

`$ npm install react-componentify`

## Usage

With this module you can match parts of plain text and convert them to React components.

Example use cases:

1.  Bold/italics/underline etc. text formatting
2.  Clickable links
3.  Replacing \n with <br/>
4.  Anything else you can think of - just create your own `Converter`!

## Converters

`Componentify` comes with some `Converter`s built-in, which you can use out of the box. Additionally, you may create a `Converter` yourself, suiting your particular use-case.

First, let's look at the built-in `Converter`s:

- bold text:

```js
const boldConverter = {
  regex: /\*([\w\d\s\:\/\.\[\]]+)\*/,
  component: "span",
  props: {
    style: { fontWeight: "900" }
  },
  innerText: matches => matches[1]
};
```

- italic text:

```js
const italicConverter = {
  regex: /\_([\w\d\s\:\/\.\[\]]+)\_/,
  component: "span",
  props: {
    style: { fontStyle: "italic" }
  },
  innerText: matches => matches[1]
};
```

- link with href as a inner text or custom inner text

```js
const linkConverter = {
  regex: /(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?(?:\[(.+)\])?/,
  component: "a",
  props: ([_, url]) => {
    return { href: url, targer: "_blank" };
  },
  innerText: matches => matches[2] || matches[1]
};
```

- `<br/>` tag

```js
const brTagConverter = {
  regex: /<br\/>/,
  component: "br"
};
```

Componentify renders tree of components:

#### Prop Types

| Property     | Type   | Required? | Description                                                   |
| ------------ | ------ | :-------: | ------------------------------------------------------------- |
| `text`       | string |     ✓     | text you want to format                                       |
| `converters` | array  |           | Converters define how to match and componentify parts of text |

```js
ComponentifyProps = {
  // required
  text: string,
  // optional
  converters: [
    {
      // required
      regex: RegExp,
      // required
      component: string | Class<React.Component<Props, any>>,
      // optional
      props: object | RegExp$matchResult => void,
      // optional
      innerText: Array<matchingGroup1, matchingGroup2> | RegExp$matchResult => matchingGroup1 | matchingGroup2
    }
  ]
}
```

## Expamples without component nesting

- Style parts of text in bold

```js
import Componentify, { boldConverter } from "componentify-react";

<Componentify
  text={"Тhis is bold *text* and *more* text"}
  converters={[boldConverter]}
/>;
```

- Style parts of text in italic

```js
import Componentify, { italicConverter } from "componentify-react";

<Componentify text={"Тhis is italic _text_"} converters={[italicConverter]} />;
```

- Have clickable links

```js
import Componentify, { linkConverter } from "componentify-react";

<Componentify
  text={"Тhis is https://google.com link"}
  converters={[linkConverter]}
/>;
```

- Have clickable links with custom inner text

```js
import Componentify, { linkConverter } from "componentify-react";

<Componentify
  text={"Тhis is https://google.com[Google] link"}
  converters={[linkConverter]}
/>;
```

- Replace \n with <br/>

```js
import Componentify, { brTagConverter } from "componentify-react";

<Componentify
  text={"Тhis is line one<br/>This is line two"}
  converters={[brTagConverter]}
/>;
```

- Replace words

```js
import Componentify from "componentify-react";

<Componentify
  text="Hi, my name is John"
  converters={[
    {
      regex: /John/,
      component: "span",
      innerText: "Snow"
    }
  ]}
/>;
```

## Expamples with component nesting

- Style parts of bold text in italic

```js
import Componentify, {
  boldConverter,
  italicConverter
} from "componentify-react";

<Componentify
  text="Тhis is my *bold and _italic_* text"
  converters={[boldConverter, italicConverter]}
/>;
```

- Style liks in bold

```js
import Componentify, { boldConverter, linkConverter } from "componentify-react";

<Componentify
  text="Тhis is my bold *https://google.com* link"
  converters={[boldConverter, linkConverter]}
/>;
```

You can make your custom converters
