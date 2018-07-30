// @flow
import React, { Component } from "react";

type Match = RegExp$matchResult;
type PropsObj = { [key: string]: { [key: string]: string } };

type PropsFunc = Match => { [key: string]: string };

type Converter = {
  regex: RegExp,
  component: string | (() => void),
  props?: PropsObj | PropsFunc,
  innerText?: Match => void,
  match?: Match
};

type ComponentifyProps = {
  text: string,
  converters: Array<Converter>
};

class Componentify extends Component<ComponentifyProps, {}> {
  static defaultProps = {
    text: "",
    converters: []
  };

  getPlainTextComponent(text: string, key?: string) {
    return <span key={key}>{text}</span>;
  }

  getCurrentConverter(text: string) {
    const { converters } = this.props;

    return converters.reduce((currtentConverter, converter) => {
      // Clone so mutating doesn't affect client-passed objects
      converter = Object.assign({}, converter);
      const regex = converter.regex;

      if (!regex) {
        throw new Error("Invalid regex");
      }

      const currentMatch = regex.exec(text);

      if (currentMatch !== null) {
        converter.match = currentMatch;
        const lowestIndex = currtentConverter && currtentConverter.match.index;
        const currentIndex = converter.index;

        if (currtentConverter === null || currentIndex < lowestIndex) {
          currtentConverter = converter;
        }
      }

      return currtentConverter;
    }, null);
  }

  generateComponent(converter: Converter, key: string): React$CreateElement {
    const { component, match } = converter;
    let { props } = converter;
    let { innerText } = converter;
    let children = null;

    if (typeof props === "function") {
      props = props(match);
    }

    if (props) {
      props.key = key;
    }

    if (typeof innerText === "function") {
      innerText = innerText(match);
    }

    if (typeof innerText !== "undefined") {
      children = this.generateComponentList(innerText, match[0]);
    }

    return React.createElement(component, props, children);
  }

  generateComponentList(text: string, prevMatch: string) {
    let str = text;
    let components = [];

    while (str !== "") {
      const currtentConverter = this.getCurrentConverter(str);

      if (!currtentConverter || prevMatch === currtentConverter.match[0]) {
        break;
      }

      const matchIndex = currtentConverter.match.index;
      const textBeforeMatch = str.slice(0, matchIndex);
      const textAfterMatch = str.slice(
        matchIndex + currtentConverter.match[0].length
      );
      str = textAfterMatch;

      if (textBeforeMatch !== "") {
        components.push(
          this.getPlainTextComponent(
            textBeforeMatch,
            components.length.toString()
          )
        );
      }

      components.push(
        this.generateComponent(currtentConverter, components.length.toString())
      );
    }

    if (str !== "") {
      if (prevMatch !== "") {
        components.push(str);
      } else {
        components.push(
          this.getPlainTextComponent(str, components.length.toString())
        );
      }
    }

    return components;
  }

  render() {
    const { text, converters } = this.props;

    if (!text) {
      throw new Error('Missing property "text"');
    }

    if (!converters) {
      return this.getPlainTextComponent(text);
    }

    return this.generateComponentList(text, "");
  }
}

export default Componentify;
